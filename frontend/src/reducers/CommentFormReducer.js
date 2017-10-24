import { OPEN_COMMENT_FORM, CLOSE_COMMENT_FORM } from '../actions/CommentFormActions'

export function reducer(state = {}, action) {
    const { commentId } = action
    switch (action.type) {
        case OPEN_COMMENT_FORM:
            return {
                ...state,
                open: true,
                commentId: commentId
            }

        case CLOSE_COMMENT_FORM:
            return {
                ...state,
                open: false
            }
        default:
            return state
    }
};
