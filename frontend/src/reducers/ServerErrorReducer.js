import { SHOW_ERROR, CLOSE_ERROR } from '../actions/ServerErrorActions'

export function reducer(state = {}, action) {
    switch (action.type) {
        case SHOW_ERROR:
            return {
                ...state,
                show: true
            }

        case CLOSE_ERROR:
            return {
                ...state,
                show: false
            }
        default:
            return state
    }
};
