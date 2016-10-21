export default (state = {
        email: '',
        isLogin: false,
        isRegistered: false
    }, action) => {
        switch (action.type) {
            case 'FETCH_ACCOUNT':
                return Object.assign({}, state, {
                    isLogin: action.isLogin,
                    email: action.email,
                    accessToken: action.accessToken,
                    isRegistered: action.isRegistered
                })
            default:
                return state
    }
}
