
export const SHOW_ERROR = 'SHOW_ERROR';
export const CLOSE_ERROR = 'CLOSE_ERROR';

export function showError() {
    return {
        type: SHOW_ERROR
    }
};

export function closeError() {
    return {
        type: CLOSE_ERROR
    }
};

