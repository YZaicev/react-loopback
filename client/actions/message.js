import fetch from 'isomorphic-fetch'

export const MESSAGE = 'MESSAGE'

export function close() {
    return (dispatch) => {
        return dispatch(() => {
            return {
                type: MESSAGE,
                show: false
            }
        }());
    }
}

export function showMessage(text) {
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
