import { SHOW_ERROR, CLOSE_ERROR } from '../../actions/ServerErrorActions'

import * as ServerErrorReducer from '../../reducers/ServerErrorReducer';

const reducer = ServerErrorReducer.reducer;

describe('ServerError reducer', () => {

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({})
    });

    it('should handle SHOW_ERROR', () => {
        const postId = "postId";
        expect(
            reducer([], {
                type: SHOW_ERROR,
                show: true
            })
        ).toEqual(
            { show: true }
            );
    });

    it('should handle CLOSE_ERROR', () => {
        expect(
            reducer([], {
                type: CLOSE_ERROR,
                show: false
            })
        ).toEqual(
            { show: false }
            );
    });
});