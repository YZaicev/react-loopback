export default (state = {
        open: false,
        text: ''
    }, action) => {
        switch (action.type) {
            case 'MESSAGE':
                return Object.assign({}, state, {
                    show: action.show,
                    text: action.text || ''
                })
            default:
                return state
    }
}
