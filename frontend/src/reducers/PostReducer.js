import {
    LOAD_POSTS,
    LOAD_POSTS_BY_CATEGORY,
    ADD_POST,
    UPDATE_POST,
    REMOVE_POST,
    UP_VOTE_POST,
    DOWN_VOTE_POST,
    SORT_POSTS_BY_DATE,
    SORT_POSTS_BY_VOTE,
    COMMENTS_BY_POST_ID
} from '../actions/PostActions';

import {
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
    const { posts, post, postId, comments } = action;
    const { comment } = action;

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

        case COMMENTS_BY_POST_ID:
            const indexComments = getArrayIndexByItemId(state.items, postId);
            let newArrayComments = [...state.items];
            newArrayComments[indexComments].comments = { items: comments };
            return {
                ...state,
                items: newArrayComments
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

        case ADD_COMMENT:
            const indexParentIdAddComment = getArrayIndexByItemId(state.items, comment.parentId);
            return {
                ...state,
                items: [
                    ...state.items,
                    ...state.items[indexParentIdAddComment].comments = {
                        items: [
                            ...state.items[indexParentIdAddComment].comments.items,
                            comment
                        ]
                    }
                ]
            }

        case UPDATE_COMMENT:
            const indexParentIdUpdateComment = getArrayIndexByItemId(state.items, comment.parentId);
            let commentListUpdate = [...state.items[indexParentIdUpdateComment].comments.items];
            const indexUpdateComment = getArrayIndexByItemId(commentListUpdate, comment.id);

            let commentUpdate = commentListUpdate[indexUpdateComment];
            commentUpdate.author = comment.author;
            commentUpdate.body = comment.body;
            commentUpdate.timestamp = comment.timestam;
            return {
                ...state,
                items: [
                    ...state.items,
                    ...state.items[indexParentIdUpdateComment].comments.items = commentListUpdate
                ]
            }

        case REMOVE_COMMENT:
            const indexParentIdCommentRemove = getArrayIndexByItemId(state.items, comment.parentId);
            let commentListRemove = [...state.items[indexParentIdCommentRemove].comments.items];
            const indexCommentRemove = getArrayIndexByItemId(commentListRemove, comment.id);
            return {
                ...state,
                items: [
                    ...state.items,
                    ...state.items[indexParentIdCommentRemove].comments.items[indexCommentRemove].deleted = true
                ]
            }

        case UP_VOTE_COMMENT:
            const indexParentIdUpVoteComment = getArrayIndexByItemId(state.items, comment.parentId);
            let commentListUpVoteComment = [...state.items[indexParentIdUpVoteComment].comments.items];
            const indexUpVoteComment = getArrayIndexByItemId(commentListUpVoteComment, comment.id);
            return {
                ...state,
                items: [
                    ...state.items,
                    ...state.items[indexParentIdUpVoteComment].comments.items[indexUpVoteComment].voteScore =
                    state.items[indexParentIdUpVoteComment].comments.items[indexUpVoteComment].voteScore + 1
                ]
            }

        case DOWN_VOTE_COMMENT:
            const indexParentIdDownVoteComment = getArrayIndexByItemId(state.items, comment.parentId);
            let commentListDownVoteComment = [...state.items[indexParentIdDownVoteComment].comments.items];
            const indexDownVoteComment = getArrayIndexByItemId(commentListDownVoteComment, comment.id);
            return {
                ...state,
                items: [
                    ...state.items,
                    ...state.items[indexParentIdDownVoteComment].comments.items[indexDownVoteComment].voteScore =
                    state.items[indexParentIdDownVoteComment].comments.items[indexDownVoteComment].voteScore - 1
                ]
            }

        default:
            return state
    }
};
