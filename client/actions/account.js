import fetch from 'isomorphic-fetch'
import { showErrorMessage } from './message'

export const FETCH_ACCOUNT = 'FETCH_ACCOUNT'

const TWO_WEEKS = 60 * 60 * 24 * 7 * 2;

function request(params, dispatch, responceCb) {
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    const token = localStorage.getItem('accessToken');

    if (token) {
        headers['Authorization'] = token;
    }

    const method = params.method || 'GET';

    const requestParams = {
        method,
        headers: new Headers(headers)
    };
    
    if (method == 'POST') {
        requestParams.body = JSON.stringify(params.params || {});
    }

    return fetch('http://localhost:3000/api/' + params.path || '', requestParams)
        .then((response) => {
            return response.json();
        })
        .then(responceCb)
        .catch((ex) => {
            console.log('!!!!!! parsing failed', ex);
            return responceCb();
        });
}

export function getAccount() {
    return (dispatch) => {
        return dispatch(() => {
            const accessToken = localStorage.getItem('accessToken');
            return {
                type: FETCH_ACCOUNT,
                isLogin: !!accessToken
            }
        }());
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
                    dispatch(showErrorMessage(error.message));
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
                    dispatch(showErrorMessage(error.message))
                }
                const accessToken = response.id;
                const result = {
                    type: FETCH_ACCOUNT,
                    path
                };
                if (accessToken) {
                    localStorage.setItem('accessToken', accessToken);
                    result.isLogin = true;
                    result.userId = response.userId;
                }
                return result;
            }()));
    }
}
