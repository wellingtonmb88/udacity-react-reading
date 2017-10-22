import { OPEN_FORM, CLOSE_FORM } from '../actions/PostFormActions'

export function reducer(state = {}, action) {
    const { postId } = action
    switch (action.type) {
        case OPEN_FORM:
            return {
                ...state,
                open: true,
                postId: postId
            }

        case CLOSE_FORM:
            return {
                ...state,
                open: false
            }
        default:
            return state
    }
};
