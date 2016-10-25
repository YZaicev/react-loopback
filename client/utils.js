import fetch from 'isomorphic-fetch'

export function request(params, dispatch, responceCb) {
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
            return responceCb({});
        });
}