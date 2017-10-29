
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import fetchMock from 'jest-fetch-mock';
import * as CategoryActions from '../../actions/CategoryActions';
import * as ServerErrorActions from '../../actions/ServerErrorActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const categories = [{ name: 'react1', path: 'react' }, { name: 'redux', path: 'redux' }, { name: 'udacity', path: 'udacity' }];
const response = { categories: categories };

describe('CategoryActions suite test', () => {

    it('creates LOAD_CATEGORIES when fetching categories has been done', () => {

        fetchMock.mockResponse(JSON.stringify(response))

        window.fetch = fetchMock;

        const expectedActions = [
            { type: CategoryActions.LOAD_CATEGORIES, categories: categories }
        ];

        const store = mockStore({ categories: [] });

        return store.dispatch(CategoryActions.fetchCategories()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    });

    it('dispatches the correct actions on a failed fetch request', () => {

        fetchMock.mockReject()

        window.fetch = fetchMock;
        const expectedActions = [
            { type: ServerErrorActions.SHOW_ERROR }
        ]
        const store = mockStore({})

        return store.dispatch(CategoryActions.fetchCategories()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    });
})

