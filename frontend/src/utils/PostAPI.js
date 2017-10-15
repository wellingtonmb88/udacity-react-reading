import { api, headers } from './UtilsAPI';

export const getAllPosts = () =>
    fetch(`${api}/posts`, { headers })
        .then(res => res.json())
        .then(data => data);

export const getPostsByCategory = (category) =>
    fetch(`${api}/${category}/posts`, { headers })
        .then(res => res.json())
        .then(data => data);

export const getPostById = (id) =>
    fetch(`${api}/posts/${id}`, { headers })
        .then(res => res.json())
        .then(data => data);

export const addPost = (post) =>
    fetch(`${api}/posts`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    }).then(res => res.json());

export const updatePost = (post) =>
    fetch(`${api}/posts/${post.id}`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    }).then(res => res.json());

export const upVotePost = (post) =>
    fetch(`${api}/posts/${post.id}`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ option: "upVote" })
    }).then(res => res.json());

export const downVotePost = (post) =>
    fetch(`${api}/posts/${post.id}`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ option: "downVote" })
    }).then(res => res.json());

export const deletePost = (post) =>
    fetch(`${api}/posts/${post.id}`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        }
    }).then(res => res.json());

export const getAllCommentsFromPost = (post) =>
    fetch(`${api}/posts/${post.id}/comments`, { headers })
        .then(res => res.json())
        .then(data => data);