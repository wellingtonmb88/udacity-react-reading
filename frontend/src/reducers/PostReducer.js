import {
    LOAD_POSTS,
    LOAD_POSTS_BY_CATEGORY,
    ADD_POST,
    UPDATE_POST,
    REMOVE_POST,
    UP_VOTE_POST,
    DOWN_VOTE_POST,
    SORT_POSTS_BY_DATE,
    SORT_POSTS_BY_VOTE
} from '../actions/PostActions';

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

function sortOn(arr, prop) {
    arr.sort(
        function (a, b) {
            if (a[prop] < b[prop]) {
                return -1;
            } else if (a[prop] > b[prop]) {
                return 1;
            } else {
                return 0;
            }
        }
    );
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
            return {
                ...state,
                items: [
                    ...state.items,
                    post
                ]
            }

        case UPDATE_POST:
            const indexUpdate = getArrayIndexByItemId(state.items, post.id);
            let newArray = [...state.items];
            newArray[indexUpdate] = post;
            return {
                ...state,
                items: newArray
            }

        case REMOVE_POST:
            const indexRemove = getArrayIndexByItemId(state.items, postId);
            return {
                ...state,
                items: [
                    ...state.items,
                    ...state.items[indexRemove].deleted = true
                ]
            }

        case UP_VOTE_POST:
            const indexUpVote = getArrayIndexByItemId(state.items, postId);
            return {
                ...state,
                items: [
                    ...state.items,
                    ...state.items[indexUpVote].voteScore = state.items[indexUpVote].voteScore + 1
                ]
            }

        case DOWN_VOTE_POST:
            const indexDownVote = getArrayIndexByItemId(state.items, postId);
            return {
                ...state,
                items: [
                    ...state.items,
                    ...state.items[indexDownVote].voteScore = state.items[indexDownVote].voteScore - 1
                ]
            }

        case SORT_POSTS_BY_DATE:
            if (state.items) {
                let arrayByDate = [...state.items];
                sortOn(arrayByDate, "timestamp");
                arrayByDate.reverse();
                return {
                    ...state,
                    items: arrayByDate
                }
            } else {
                return state
            }

        case SORT_POSTS_BY_VOTE:
            if (state.items) {
                let arrayByVote = [...state.items];
                sortOn(arrayByVote, "voteScore");
                arrayByVote.reverse();
                return {
                    ...state,
                    items: arrayByVote
                }
            } else {
                return state
            }

        default:
            return state
    }
};
