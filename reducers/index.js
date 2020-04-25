const initialState = {
    token: "",
    user: null,
    gurtok: [],
    child_id: null,
    checklist_id: null
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
        case 'SET_CHILD':
            return Object.assign({}, state, {
                child_id: action.child_id
            })
        case 'SET_CHECKLIST':
            return Object.assign({}, state, {
                checklist_id: action.checklist_id
            })
        default:
            return state
    }
}

export default reducer