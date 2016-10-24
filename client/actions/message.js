import fetch from 'isomorphic-fetch'

export const MESSAGE = 'MESSAGE'

export function isOpen(state) {
    return (dispatch) => {
        return dispatch(() => {
            return {
                type: MESSAGE,
                show: state
            }
        }());
    }
}

export function showErrorMessage(text) {
    return (dispatch) => {
        return dispatch(() => {
            return {
                type: MESSAGE,
                show: true,
                text
            }
        }());
    }
}
