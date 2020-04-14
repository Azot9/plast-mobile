const initialState = {
    token: 123
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SAVE_TOKEN':
            return {
                token: action.token
            }
        default:
            return state
    }
}

export default reducer