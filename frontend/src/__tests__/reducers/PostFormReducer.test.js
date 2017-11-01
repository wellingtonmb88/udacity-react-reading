import { OPEN_FORM, CLOSE_FORM } from '../../actions/PostFormActions'

import * as PostFormReducer from '../../reducers/PostFormReducer';

const reducer = PostFormReducer.reducer;

describe('PostForm reducer', () => {

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({})
    });

    it('should handle OPEN_FORM', () => {
        const postId = "postId";
        expect(
            reducer([], {
                type: OPEN_FORM,
                open: true,
                postId
            })
        ).toEqual(
            { open: true, postId: postId }
            );
    });

    it('should handle CLOSE_FORM', () => {
        expect(
            reducer([], {
                type: CLOSE_FORM,
                open: false
            })
        ).toEqual(
            { open: false }
            );
    });
});