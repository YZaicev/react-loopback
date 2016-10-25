import { showMessage } from './message'
import { request } from '../utils.js'

export const FETCH_ACCOUNT = 'FETCH_ACCOUNT'

const TWO_WEEKS = 60 * 60 * 24 * 7 * 2;

export function getAccount() {
    return (dispatch) => {
        const accessToken = localStorage.getItem('accessToken');
        const userId = localStorage.getItem('userId');

        dispatch(() => {
            return {
                type: FETCH_ACCOUNT,
                isLogin: !!accessToken,
                isRegistered: false,
            }
        }());

        if (accessToken && userId) {
            const path = 'users/' + userId;
            return request({
                path,
                method: 'GET',
            }, dispatch, account => 
                dispatch(() => {
                    return {
                        type: FETCH_ACCOUNT,
                        path,
                        isLogin: true,
                        isRegistered: true,
                        account
                    }
                }()));
        }
    }
}

export function logoutAccount() {
    return (dispatch) => {
        return request({
            path: 'users/logout',
            method: 'POST',
        }, dispatch, response => 
            dispatch(() => {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('userId');
                return {
                    type: FETCH_ACCOUNT,
                    path: 'users/logout',
                    isLogin: false
                }
            }()));
    };
}

export function registerAccount(params) {
    const path = 'users';
    return (dispatch) => {
        return request({
            params,
            path,
            method: 'POST',
        }, dispatch, response => 
            dispatch(() => {
                const error = response.error;
                const result = {
                    type: FETCH_ACCOUNT,
                    path,
                    isRegistered: true
                };

                if (error) {
                    dispatch(showMessage(error.message));
                    result.isRegistered = false;
                }
                
                return result;
            }())
        );
    }
}

export function loginAccount(params) {
    return (dispatch) => {
        const path = 'users/login';
        params.ttl = TWO_WEEKS;
        return request({
            params,
            path,
            method: 'POST'
        }, dispatch, response =>
            dispatch(() => {
                const error = response.error;
                if (error) {
                    dispatch(showMessage(error.message))
                }
                const accessToken = response.id;
                const result = {
                    type: FETCH_ACCOUNT,
                    path
                };
                if (accessToken) {
                    const userId = response.userId;
                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('userId', userId);
                    result.isLogin = true;
                    result.userId = userId;
                }
                return result;
            }()));
    }
}
