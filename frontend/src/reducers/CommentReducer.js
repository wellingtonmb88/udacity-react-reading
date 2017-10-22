import {
    LOAD_COMMENTS,
    ADD_COMMENT,
    UPDATE_COMMENT,
    REMOVE_COMMENT,
    UP_VOTE_COMMENT,
    DOWN_VOTE_COMMENT
} from '../actions/CommentActions';

const getArrayIndexByItemId = (array, itemId) => {
    let index = 0;
    for (let item of array) {
        if (item.id === itemId) {
            break;
        }
        index++;
    }
    return index;
};

export function reducer(state = {}, action) {
    const { comments, comment, commentId } = action
    switch (action.type) {

        case LOAD_COMMENTS:
            return {
                ...state,
                items: comments
            }

        case ADD_COMMENT:
            return {
                ...state,
                items: [
                    ...state.items,
                    comment
                ]
            }

        case UPDATE_COMMENT:
            const indexUpdate = getArrayIndexByItemId(state.items, comment.id);
            return {
                ...state,
                items: [
                    ...state.items,
                    state.items[indexUpdate].author = comment.author,
                    state.items[indexUpdate].body = comment.body,
                    state.items[indexUpdate].timestamp = comment.timestamp
                ]
            }

        case REMOVE_COMMENT:
            const indexRemove = getArrayIndexByItemId(state.items, commentId);
            return {
                ...state,
                items: [
                    ...state.items,
                    state.items[indexRemove].deleted = true
                ]
            }

        case UP_VOTE_COMMENT:
            const indexUpVote = getArrayIndexByItemId(state.items, commentId);
            return {
                ...state,
                items: [
                    ...state.items,
                    state.items[indexUpVote].voteScore = state.items[indexUpVote].voteScore + 1
                ]
            }

        case DOWN_VOTE_COMMENT:
            const indexDownVote = getArrayIndexByItemId(state.items, commentId);
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
