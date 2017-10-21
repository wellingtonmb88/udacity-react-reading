
import * as PostAPI from '../utils/PostAPI';

export const LOAD_COMMENTS = 'LOAD_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';
export const UP_VOTE_COMMENT = 'UP_VOTE_COMMENT';
export const DOWN_VOTE_COMMENT = 'DOWN_VOTE_COMMENT';

export function loadComments(comments) {
    return {
        type: LOAD_COMMENTS,
        comments
    }
};

export function addComment({ comment }) {
    return {
        type: ADD_COMMENT,
        comment
    }
};

export function updateComment({ comment }) {
    return {
        type: UPDATE_COMMENT,
        comment
    }
};

export function removeComment({ commentId }) {
    return {
        type: REMOVE_COMMENT,
        commentId
    }
};

export function upVoteComment({ commentId }) {
    return {
        type: UP_VOTE_COMMENT,
        commentId
    }
};

export function downVoteComment({ commentId }) {
    return {
        type: DOWN_VOTE_COMMENT,
        commentId
    }
};

export const fetchCommentsByPost = (post) => dispatch => (
    PostAPI.getAllCommentsFromPost(post)
        .then(comments => dispatch(loadComments(comments)))
);
