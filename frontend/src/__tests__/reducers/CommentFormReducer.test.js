import { OPEN_COMMENT_FORM, CLOSE_COMMENT_FORM } from '../../actions/CommentFormActions'

import * as CommentFormReducer from '../../reducers/CommentFormReducer';

const reducer = CommentFormReducer.reducer;

describe('CommentForm reducer', () => {

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({})
    });

    it('should handle OPEN_COMMENT_FORM', () => {
        const commentId = "commentId";
        expect(
            reducer([], {
                type: OPEN_COMMENT_FORM,
                open: true,
                commentId
            })
        ).toEqual(
            { open: true, commentId: commentId }
            );
    });

    it('should handle CLOSE_COMMENT_FORM', () => {
        expect(
            reducer([], {
                type: CLOSE_COMMENT_FORM,
                open: false
            })
        ).toEqual(
            { open: false }
            );
    });
});