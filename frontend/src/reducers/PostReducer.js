import {
    LOAD_POSTS,
    LOAD_POSTS_BY_CATEGORY,
    ADD_POST,
    UPDATE_POST,
    REMOVE_POST,
    UP_VOTE_POST,
    DOWN_VOTE_POST
} from '../actions/PostActions'

const getArrayIndexByItemId = (array, itemId) => {
    let index = 0;
    for (let item of array) {
        if (item.id === itemId) {
            break;
        }
        index++;
    }
    return index;
}

export function reducer(state = {}, action) {
    const { posts, post, postId } = action
    switch (action.type) {

        case LOAD_POSTS:
        case LOAD_POSTS_BY_CATEGORY:
            return {
                ...state,
                items: posts
            }

        case ADD_POST:
        case UPDATE_POST:
            return {
                ...state,
                items: [
                    ...state.items,
                    post
                ]
            }

        case REMOVE_POST:
            const indexRemove = getArrayIndexByItemId(state.items, postId);
            return {
                ...state,
                items: [
                    ...state.items,
                    state.items[indexRemove].deleted = true
                ]
            }

        case UP_VOTE_POST:
            const indexUpVote = getArrayIndexByItemId(state.items, postId);
            return {
                ...state,
                items: [
                    ...state.items,
                    state.items[indexUpVote].voteScore = state.items[indexUpVote].voteScore + 1
                ]
            }

        case DOWN_VOTE_POST:
            const indexDownVote = getArrayIndexByItemId(state.items, postId);
            return {
                ...state,
                items: [
                    ...state.items,
                    state.items[indexDownVote].voteScore = state.items[indexDownVote].voteScore - 1
                ]
            }

        default:
            return state
    }
};
