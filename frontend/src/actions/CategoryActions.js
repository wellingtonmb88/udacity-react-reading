
import * as CategoryAPI from '../utils/CategoryAPI';
import * as ServerErrorActions from '../actions/ServerErrorActions';

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
        .catch(error => dispatch(ServerErrorActions.showError()))
);
