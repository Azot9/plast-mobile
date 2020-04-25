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
        case 'SAVE_GURTOK':
            return Object.assign({}, state, {
                gurtok: action.gurtok
            })
        default:
            return state
    }
}

export default reducer