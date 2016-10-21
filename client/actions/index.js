import fetch from 'isomorphic-fetch'

export const REQUEST_POSTS = 'REQUEST_POSTS'
function requestPosts(path) {
    return {
        type: REQUEST_POSTS,
        path
    }
}

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
function receivePosts(path, json) {
    return {
        type: RECEIVE_POSTS,
        path,
        posts: json,
        receivedAt: Date.now()
    }
}

export function fetchPosts(path) {
    return function (dispatch) {
        dispatch(requestPosts(path))
        return fetch(`${"http://localhost:3000/api/"}${path}`)
            .then(response => response.json())
            .then(json =>
                dispatch(receivePosts(path, json))
            )
    }
}
