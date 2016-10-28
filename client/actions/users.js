import fetch from 'isomorphic-fetch'
import { request } from '../utils.js'
import { showMessage } from './message'
export const REQUEST_USERS = 'REQUEST_USERS'
function requestUsers(path) {
    return {
        type: REQUEST_USERS,
        path
    }
}

export const RECEIVE_USERS = 'RECEIVE_USERS'
function receiveUsers(path, json) {
    return {
        type: RECEIVE_USERS,
        path,
        users: json,
        receivedAt: Date.now()
    }
}

export function fetchUsers(path) {
    return function (dispatch) {
        dispatch(requestUsers(path))
        return request({
            path,
            method: 'GET'
        }, dispatch, users => {
            dispatch(receiveUsers(path, users))
        });
    }
}

export const RECEIVE_USER = 'RECEIVE_USER'

function receiveUser(path, json) {
    return {
        type: RECEIVE_USER,
        path,
        user: json,
        receivedAt: Date.now()
    }
}

export function fetchUser(id) {
    const path = 'users/' + id;
    return function (dispatch) {
        dispatch(requestUsers(path))
        return request({
            path,
            method: 'GET'
        }, dispatch, user => {
            dispatch(receiveUser(path, user))
        });
    }
}

export function updateUser(id, params, callback) {
    const path = 'users/' + id;
    return function (dispatch) {
        return request({
            path,
            method: 'PUT',
            params
        }, dispatch, responce => {
            const error = responce.error;
            if (error) {
                dispatch(showMessage(error.message))
            }
            callback();
            dispatch(receiveUser(path, responce))
        });
    }
}
