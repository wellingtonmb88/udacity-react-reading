
export const OPEN_COMMENT_FORM = 'OPEN_COMMENT_FORM';
export const CLOSE_COMMENT_FORM = 'CLOSE_COMMENT_FORM';

export function openForm(commentId) {
    return {
        type: OPEN_COMMENT_FORM,
        commentId
    }
};

export function closeForm() {
    return {
        type: CLOSE_COMMENT_FORM
    }
};

