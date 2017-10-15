import { api, headers } from './UtilsAPI';


export const getCommentById = (id) =>
    fetch(`${api}/comments/${id}`, { headers })
        .then(res => res.json())
        .then(data => data);

export const addComment = (comment) =>
    fetch(`${api}/comments`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    }).then(res => res.json());

export const upVoteComment = (comment) =>
    fetch(`${api}/comments/${comment.id}`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ option: "upVote" })
    }).then(res => res.json());

export const downVoteComment = (comment) =>
    fetch(`${api}/comments/${comment.id}`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ option: "downVote" })
    }).then(res => res.json());

export const updateComment = (comment) =>
    fetch(`${api}/comments/${comment.id}`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    }).then(res => res.json());

export const deleteComment = (comment) =>
    fetch(`${api}/comments/${comment.id}`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        }
    }).then(res => res.json());