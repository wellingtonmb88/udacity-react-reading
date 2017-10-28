
import * as PostAPI from '../utils/PostAPI';
import * as ServerErrorActions from '../actions/ServerErrorActions';

export const LOAD_POSTS = 'LOAD_POSTS';
export const LOAD_POSTS_BY_CATEGORY = 'LOAD_POSTS_BY_CATEGORY';
export const ADD_POST = 'ADD_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const REMOVE_POST = 'REMOVE_POST';
export const UP_VOTE_POST = 'UP_VOTE_POST';
export const DOWN_VOTE_POST = 'DOWN_VOTE_POST';
export const SORT_POSTS_BY_DATE = 'SORT_POSTS_BY_DATE';
export const SORT_POSTS_BY_VOTE = 'SORT_POSTS_BY_VOTE';
export const COMMENTS_BY_POST_ID = 'COMMENTS_BY_POST_ID';

function loadPosts(posts) {
    return {
        type: LOAD_POSTS,
        posts
    }
};

function loadPostsByCategory(category, posts) {
    return {
        type: LOAD_POSTS_BY_CATEGORY,
        category,
        posts
    }
};

function addPost(post) {
    return {
        type: ADD_POST,
        post
    }
};

function updatePost(post) {
    return {
        type: UPDATE_POST,
        post
    }
};

function removePost(postId) {
    return {
        type: REMOVE_POST,
        postId
    }
};

function upVotePost(postId) {
    return {
        type: UP_VOTE_POST,
        postId
    }
};

function downVotePost(postId) {
    return {
        type: DOWN_VOTE_POST,
        postId
    }
};

export function sortPostsByDate() {
    return {
        type: SORT_POSTS_BY_DATE
    }
};

export function sortPostsByVote() {
    return {
        type: SORT_POSTS_BY_VOTE
    }
};

function getCommentsByPostId(comments, postId) {
    return {
        type: COMMENTS_BY_POST_ID,
        comments,
        postId
    }
};

const fetchCommentsByPostId = (postId) => dispatch => (
    PostAPI.getAllCommentsFromPostId(postId)
        .then(comments => dispatch(getCommentsByPostId(comments, postId)))
);

export const fetchPosts = () => dispatch => (
    PostAPI.getAllPosts()
        .then(posts => {
            dispatch(loadPosts(posts));
            return posts;
        })
        .then(posts => posts.map(post => dispatch(fetchCommentsByPostId(post.id))))
        .catch(error => dispatch(ServerErrorActions.showError()))
);

export const fetchPostsByCategory = (category) => dispatch => (
    PostAPI.getPostsByCategory(category)
        .then(posts => dispatch(loadPostsByCategory(category, posts)))
);

export const addNewPost = (post) => dispatch => (
    PostAPI.addPost(post)
        .then(dispatch(addPost(post)))
);

export const editPost = (post) => dispatch => (
    PostAPI.updatePost(post)
        .then(dispatch(updatePost(post)))
);

export const deletePost = (postId) => dispatch => (
    PostAPI.deletePost(postId)
        .then(dispatch(removePost(postId)))
);

export const upVotingPost = (postId) => dispatch => (
    PostAPI.upVotePost(postId)
        .then(dispatch(upVotePost(postId)))
);

export const downVotingPost = (postId) => dispatch => (
    PostAPI.downVotePost(postId)
        .then(dispatch(downVotePost(postId)))
);
