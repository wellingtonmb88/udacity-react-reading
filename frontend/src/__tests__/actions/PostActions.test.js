
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import fetchMock from 'jest-fetch-mock';
import * as PostActions from '../../actions/PostActions';
import * as ServerErrorActions from '../../actions/ServerErrorActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const responseAll = [
    {
        "id": "8xf0y6ziyjabvozdd253nd",
        "timestamp": 1467166872634,
        "title": "Udacity is the best place to learn React",
        "body": "Everyone says so after all.",
        "author": "thingtwo",
        "category": "react",
        "voteScore": 6,
        "deleted": false
    },
    {
        "id": "6ni6ok3ym7mf1p33lnez",
        "timestamp": 1468479767190,
        "title": "Learn Redux in 10 minutes!",
        "body": "Just kidding. It takes more than 10 minutes to learn technology.",
        "author": "thingone",
        "category": "redux",
        "voteScore": -5,
        "deleted": false
    }
];

const responseReact = [
    {
        "id": "8xf0y6ziyjabvozdd253nd",
        "timestamp": 1467166872634,
        "title": "Udacity is the best place to learn React",
        "body": "Everyone says so after all.",
        "author": "thingtwo",
        "category": "react",
        "voteScore": 6,
        "deleted": false
    }
];

describe('PostActions suite test', () => {

    it('test LOAD_POSTS action', () => {

        fetchMock.mockResponse(JSON.stringify(responseAll))

        window.fetch = fetchMock;

        const expectedActions = [
            { type: PostActions.LOAD_POSTS, posts: responseAll }
        ];

        const store = mockStore({})

        return store.dispatch(PostActions.fetchPosts()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        });
    });

    it('test LOAD_POSTS_BY_CATEGORY action', () => {

        fetchMock.mockResponse(JSON.stringify(responseReact))

        window.fetch = fetchMock;

        const category = "react";

        const expectedActions = [
            { type: PostActions.LOAD_POSTS_BY_CATEGORY, posts: responseReact, category }
        ];

        const store = mockStore({})

        return store.dispatch(PostActions.fetchPostsByCategory(category)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        });
    });

    it('test ADD_POST action', () => {

        fetchMock.mockResponse(JSON.stringify(responseReact))

        window.fetch = fetchMock;

        const post = responseReact[0];

        const expectedActions = [
            { type: PostActions.ADD_POST, post }
        ];

        const store = mockStore({})

        return store.dispatch(PostActions.addNewPost(post)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        });
    });

    it('test UPDATE_POST action', () => {

        fetchMock.mockResponse(JSON.stringify(responseReact))

        window.fetch = fetchMock;

        const post = responseReact[0];

        const expectedActions = [
            { type: PostActions.UPDATE_POST, post }
        ];

        const store = mockStore({})

        return store.dispatch(PostActions.editPost(post)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    });

    it('test REMOVE_POST action', () => {

        fetchMock.mockResponse(JSON.stringify(responseReact))

        window.fetch = fetchMock;

        const postId = responseReact[0].id;

        const expectedActions = [
            { type: PostActions.REMOVE_POST, postId }
        ];

        const store = mockStore({})

        return store.dispatch(PostActions.deletePost(postId)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        });
    });

    it('test UP_VOTE_POST action', () => {

        fetchMock.mockResponse(JSON.stringify(responseReact))

        window.fetch = fetchMock;

        const postId = responseReact[0].id;

        const expectedActions = [
            { type: PostActions.UP_VOTE_POST, postId }
        ];

        const store = mockStore({})

        return store.dispatch(PostActions.upVotingPost(postId)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        });
    });

    it('test DOWN_VOTE_POST action', () => {

        fetchMock.mockResponse(JSON.stringify(responseReact))

        window.fetch = fetchMock;

        const postId = responseReact[0].id;

        const expectedActions = [
            { type: PostActions.DOWN_VOTE_POST, postId }
        ];

        const store = mockStore({})

        return store.dispatch(PostActions.downVotingPost(postId)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        });
    });

    it('test SORT_POSTS_BY_DATE action', () => {

        const expectedActions = { type: PostActions.SORT_POSTS_BY_DATE };

        expect(PostActions.sortPostsByDate()).toEqual(expectedActions);
    });

    it('test SORT_POSTS_BY_VOTE action', () => {

        const expectedActions = { type: PostActions.SORT_POSTS_BY_VOTE };

        expect(PostActions.sortPostsByVote()).toEqual(expectedActions);
    });

    it('dispatches the correct actions on a failed fetch request', () => {

        fetchMock.mockReject()

        window.fetch = fetchMock;

        const expectedActions = [
            { type: ServerErrorActions.SHOW_ERROR }
        ]
        const store = mockStore({})

        return store.dispatch(PostActions.fetchPosts()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        });
    });
});

