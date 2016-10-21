import fetch from 'isomorphic-fetch'

export const FETCH_ACCOUNT = 'FETCH_ACCOUNT'

function request(params, responceCb) {
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
        .then(response => response.json())
        .then(responceCb)
        .catch(function (ex) {
            console.log('parsing failed', ex);
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
            method: 'POST'
        }, response => 
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
        }, response => 
            dispatch(() => {
                return {
                    type: FETCH_ACCOUNT,
                    path,
                    isRegistered: true
                };
            }())
        );
    }
}

export function loginAccount(params) {
    return (dispatch) => {
        const path = 'users/login';
        return request({
            params,
            path,
            method: 'POST'
        }, response =>
            dispatch(() => {
                const accessToken = response.accessToken;
                const result = {
                    type: FETCH_ACCOUNT,
                    path,
                    user: response,
                    receivedAt: Date.now()
                };
                if (accessToken) {
                    localStorage.setItem('accessToken', accessToken);
                    result.isLogin = true;
                }
                return result;
            }()));
    }
}
