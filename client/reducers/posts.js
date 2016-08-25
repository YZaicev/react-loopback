export default function list (state = {
    isFetching: false, items: []
}, action) {
    switch (action.type) {
        case 'REQUEST_POSTS':
            return Object.assign({}, state, {
                isFetching: true
            })
        case 'RECEIVE_POSTS':
            return Object.assign({}, state, {
                isFetching: false,
                items: action.posts
            })
        default:
            return state
    }
}
