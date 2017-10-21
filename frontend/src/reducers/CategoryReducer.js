import { LOAD_CATEGORIES } from '../actions/CategoryActions'

export function reducer(state = {}, action) {
    const { categories } = action
    switch (action.type) {
        case LOAD_CATEGORIES:
            return {
                ...state,
                items: categories
            }
        default:
            return state
    }
};
