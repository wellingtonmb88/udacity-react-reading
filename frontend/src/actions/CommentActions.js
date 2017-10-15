export const ADD_COMMENT = 'ADD_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';
export const UP_VOTE_COMMENT = 'UP_VOTE_COMMENT';
export const DOWN_VOTE_COMMENT = 'DOWN_VOTE_COMMENT';

export function addCommnet({ commnet }) {
    return {
        type: ADD_COMMENT,
        commnet
    }
};

export function updateCommnet({ commnet }) {
    return {
        type: UPDATE_COMMENT,
        commnet
    }
};

export function removeCommnet({ commnetId }) {
    return {
        type: REMOVE_COMMENT,
        commnetId
    }
};

export function upVoteCommnet({ commnetId }) {
    return {
        type: UP_VOTE_COMMENT,
        commnetId
    }
};

export function downVoteCommnet({ commnetId }) {
    return {
        type: DOWN_VOTE_COMMENT,
        commnetId
    }
};