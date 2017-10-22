
import * as PostAPI from '../utils/PostAPI';
import * as CommentAPI from '../utils/CommentAPI';

export const LOAD_COMMENTS = 'LOAD_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';
export const UP_VOTE_COMMENT = 'UP_VOTE_COMMENT';
export const DOWN_VOTE_COMMENT = 'DOWN_VOTE_COMMENT';

function loadComments(comments) {
    return {
        type: LOAD_COMMENTS,
        comments
    }
};

function addComment(comment) {
    return {
        type: ADD_COMMENT,
        comment
    }
};

 function updateComment(comment) {
    return {
        type: UPDATE_COMMENT,
        comment
    }
};

 function removeComment(commentId) {
    return {
        type: REMOVE_COMMENT,
        commentId
    }
};

 function upVoteComment(commentId) {
    return {
        type: UP_VOTE_COMMENT,
        commentId
    }
};

 function downVoteComment(commentId) {
    return {
        type: DOWN_VOTE_COMMENT,
        commentId
    }
};

export const fetchCommentsByPostId = (postId) => dispatch => (
    PostAPI.getAllCommentsFromPostId(postId)
        .then(comments => dispatch(loadComments(comments)))
);

export const addNewComment = (comment) => dispatch => (
    CommentAPI.addComment(comment)
        .then(dispatch(addComment(comment)))
);

export const editComment = (comment) => dispatch => (
    CommentAPI.updateComment(comment)
        .then(dispatch(updateComment(comment)))
);

export const deleteComment = (commentId) => dispatch => (
    CommentAPI.deleteComment(commentId)
        .then(dispatch(removeComment(commentId)))
);

export const upVotingComment = (commentId) => dispatch => (
    CommentAPI.upVoteComment(commentId)
        .then(dispatch(upVoteComment(commentId)))
);

export const downVotingComment = (commentId) => dispatch => (
    CommentAPI.downVoteComment(commentId)
        .then(dispatch(downVoteComment(commentId)))
);
