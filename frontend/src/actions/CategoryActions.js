
import * as CategoryAPI from '../utils/CategoryAPI';

export const LOAD_CATEGORIES = 'LOAD_CATEGORIES';

export function loadCategories(categories) {
    return {
        type: LOAD_CATEGORIES,
        categories
    }
};

export const fetchCategories = () => dispatch => (
    CategoryAPI.getAllCategories()
        .then(categories => dispatch(loadCategories(categories)))
);
