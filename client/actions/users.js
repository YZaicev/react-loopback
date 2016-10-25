import fetch from 'isomorphic-fetch'
import { request } from '../utils.js'

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
