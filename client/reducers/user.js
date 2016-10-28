export default function user (state = {
    isFetching: false, item: {}, edit: false
}, action) {
    switch (action.type) {
        case 'REQUEST_USER':
            return Object.assign({}, state, {
                isFetching: true
            })
        case 'RECEIVE_USER':
            return Object.assign({}, state, {
                isFetching: false,
                item: action.user
            })
        default:
            return state
    }
}
