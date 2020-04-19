const initialState = {
    token: "",
    user: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SAVE_TOKEN':
            return Object.assign({}, state, {
                token: action.token
            })
        case 'SAVE_USER':
            return Object.assign({}, state, {
                user: action.user
            })
        default:
            return state
    }
}

export default reducer