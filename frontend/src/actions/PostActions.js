export const LOAD_POSTS = 'LOAD_POSTS';
export const LOAD_POSTS_BY_CATEGORY = 'LOAD_POSTS_BY_CATEGORY';
export const ADD_POST = 'ADD_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const REMOVE_POST = 'REMOVE_POST';
export const UP_VOTE_POST = 'UP_VOTE_POST';
export const DOWN_VOTE_POST = 'DOWN_VOTE_POST';

export function loadPosts() {
    return {
        type: LOAD_POSTS
    }
};

export function loadPostsByCategory({ category }) {
    return {
        type: LOAD_POSTS_BY_CATEGORY,
        category
    }
};

export function addPost({ post }) {
    return {
        type: ADD_POST,
        post
    }
};

export function updatePost({ post }) {
    return {
        type: UPDATE_POST,
        post
    }
};

export function removePost({ postId }) {
    return {
        type: REMOVE_POST,
        postId
    }
};

export function upVotePost({ postId }) {
    return {
        type: UP_VOTE_POST,
        postId
    }
};

export function downVotePost({ postId }) {
    return {
        type: DOWN_VOTE_POST,
        postId
    }
};