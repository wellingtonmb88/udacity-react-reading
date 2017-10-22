
export const OPEN_FORM = 'OPEN_FORM';
export const CLOSE_FORM = 'CLOSE_FORM';

export function openForm(postId) {
    return {
        type: OPEN_FORM,
        postId
    }
};

export function closeForm() {
    return {
        type: CLOSE_FORM
    }
};

