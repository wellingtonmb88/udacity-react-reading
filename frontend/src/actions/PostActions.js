
import * as PostAPI from '../utils/PostAPI';

export const LOAD_POSTS = 'LOAD_POSTS';
export const LOAD_POSTS_BY_CATEGORY = 'LOAD_POSTS_BY_CATEGORY';
export const ADD_POST = 'ADD_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const REMOVE_POST = 'REMOVE_POST';
export const UP_VOTE_POST = 'UP_VOTE_POST';
export const DOWN_VOTE_POST = 'DOWN_VOTE_POST';

export function loadPosts(posts) {
    return {
        type: LOAD_POSTS,
        posts
    }
};

export function loadPostsByCategory(category, posts) {
    return {
        type: LOAD_POSTS_BY_CATEGORY,
        category,
        posts
    }
};

export function addPost(post) {
    return {
        type: ADD_POST,
        post
    }
};

export function updatePost(post) {
    return {
        type: UPDATE_POST,
        post
    }
};

export function removePost(postId) {
    return {
        type: REMOVE_POST,
        postId
    }
};

export function upVotePost(postId) {
    return {
        type: UP_VOTE_POST,
        postId
    }
};

export function downVotePost(postId) {
    return {
        type: DOWN_VOTE_POST,
        postId
    }
};

export const fetchPosts = () => dispatch => (
    PostAPI.getAllPosts()
        .then(posts => dispatch(loadPosts(posts)))
);

export const fetchCommentsByCategory = (category) => dispatch => (
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

export const upVotingPost = (postId) => dispatch => (
    PostAPI.upVotePost(postId)
        .then(dispatch(upVotePost(postId)))
);

export const downVotingPost = (postId) => dispatch => (
    PostAPI.downVotePost(postId)
        .then(dispatch(downVotePost(postId)))
);
