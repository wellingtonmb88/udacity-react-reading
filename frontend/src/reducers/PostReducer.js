import {
    ADD_POST,
    UPDATE_POST,
    REMOVE_POST,
    UP_VOTE_POST,
    DOWN_VOTE_POST
} from '../actions/PostActions'


export function reducer(state = {}, action) {
    const { post, postId } = action
    switch (action.type) {

        case ADD_POST:
        case UPDATE_POST:
            return {
                ...state,
                [post.id]: post
            }

        case REMOVE_POST:
            return state[postId] ? {
                ...state,
                [postId]: {
                    ...state[postId],
                    deleted: true
                }
            } : state

        case UP_VOTE_POST:
            return state[postId] ? {
                ...state,
                [postId]: {
                    ...state[postId],
                    voteScore: state[postId].voteScore + 1
                }
            } : state

        case DOWN_VOTE_POST:
            return state[postId] ? {
                ...state,
                [postId]: {
                    ...state[postId],
                    voteScore: state[postId].voteScore - 1
                }
            } : state

        default:
            return state
    }
};
