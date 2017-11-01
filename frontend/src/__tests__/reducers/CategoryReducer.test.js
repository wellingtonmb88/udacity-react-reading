import { LOAD_CATEGORIES } from '../../actions/CategoryActions'
import * as CategoryReducer from '../../reducers/CategoryReducer';

const reducer = CategoryReducer.reducer;

const categories = [{ name: 'react1', path: 'react' }, { name: 'redux', path: 'redux' }, { name: 'udacity', path: 'udacity' }];

describe('Category reducer', () => {

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({})
    });

    it('should handle LOAD_CATEGORIES', () => {
        expect(
            reducer([], {
                type: LOAD_CATEGORIES,
                categories
            })
        ).toEqual(
            { items: categories }
            );
    });
});