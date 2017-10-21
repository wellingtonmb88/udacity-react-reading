import {
    LOAD_COMMENTS,
    ADD_COMMENT,
    UPDATE_COMMENT,
    REMOVE_COMMENT,
    UP_VOTE_COMMENT,
    DOWN_VOTE_COMMENT
} from '../actions/CommentActions'

export function reducer(state = {}, action) {
    const { comments, comment, commentId } = action
    switch (action.type) {

        case LOAD_COMMENTS:
            return {
                ...state,
                items: comments
            }

        case ADD_COMMENT:
        case UPDATE_COMMENT:
            return {
                ...state,
                [comment.id]: comment
            }

        case REMOVE_COMMENT:
            return state[commentId] ? {
                ...state,
                [commentId]: {
                    ...state[commentId],
                    deleted: true
                }
            } : state

        case UP_VOTE_COMMENT:
            return state[commentId] ? {
                ...state,
                [commentId]: {
                    ...state[commentId],
                    voteScore: state[commentId].voteScore + 1
                }
            } : state

        case DOWN_VOTE_COMMENT:
            return state[commentId] ? {
                ...state,
                [commentId]: {
                    ...state[commentId],
                    voteScore: state[commentId].voteScore - 1
                }
            } : state

        default:
            return state
    }
};
