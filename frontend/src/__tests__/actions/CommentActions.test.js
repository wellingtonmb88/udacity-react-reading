
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import fetchMock from 'jest-fetch-mock';
import * as CommentActions from '../../actions/CommentActions';
import * as ServerErrorActions from '../../actions/ServerErrorActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const responseAll = [
    {
        "id": "894tuq4ut84ut8v4t8wun89g",
        "parentId": "8xf0y6ziyjabvozdd253nd",
        "timestamp": 1468166872634,
        "body": "Hi there! I am a COMMENT.",
        "author": "thingtwo",
        "voteScore": 6,
        "deleted": false,
        "parentDeleted": false
    },
    {
        "id": "8tu4bsun805n8un48ve89",
        "parentId": "8xf0y6ziyjabvozdd253nd",
        "timestamp": 1469479767190,
        "body": "Comments. Are. Cool.",
        "author": "thingone",
        "voteScore": -5,
        "deleted": false,
        "parentDeleted": false
    }
];

const comment = responseAll[0];

describe('CommentActions suite test', () => {

    it('test LOAD_COMMENTS action', () => {

        fetchMock.mockResponse(JSON.stringify(responseAll))

        window.fetch = fetchMock;

        const expectedActions = [
            { type: CommentActions.LOAD_COMMENTS, comments: responseAll }
        ];

        const store = mockStore({})

        return store.dispatch(CommentActions.fetchCommentsByPostId("postId")).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        });
    });

    it('test ADD_COMMENT action', () => {

        fetchMock.mockResponse(JSON.stringify(responseAll))

        window.fetch = fetchMock;

        const expectedActions = [
            { type: CommentActions.ADD_COMMENT, comment}
        ];

        const store = mockStore({})

        return store.dispatch(CommentActions.addNewComment(comment)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        });
    });

    it('test UPDATE_COMMENT action', () => {

        fetchMock.mockResponse(JSON.stringify(responseAll))

        window.fetch = fetchMock;

        const expectedActions = [
            { type: CommentActions.UPDATE_COMMENT, comment }
        ];

        const store = mockStore({})

        return store.dispatch(CommentActions.editComment(comment)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    });

    it('test REMOVE_COMMENT action', () => {

        fetchMock.mockResponse(JSON.stringify(responseAll))

        window.fetch = fetchMock;

        const expectedActions = [
            { type: CommentActions.REMOVE_COMMENT, comment }
        ];

        const store = mockStore({})

        return store.dispatch(CommentActions.deleteComment(comment)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        });
    });

    it('test UP_VOTE_COMMENT action', () => {

        fetchMock.mockResponse(JSON.stringify(responseAll))

        window.fetch = fetchMock;

        const expectedActions = [
            { type: CommentActions.UP_VOTE_COMMENT, comment }
        ];

        const store = mockStore({})

        return store.dispatch(CommentActions.upVotingComment(comment)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        });
    });

    it('test DOWN_VOTE_COMMENT action', () => {

        fetchMock.mockResponse(JSON.stringify(responseAll))

        window.fetch = fetchMock;

        const expectedActions = [
            { type: CommentActions.DOWN_VOTE_COMMENT, comment }
        ];

        const store = mockStore({})

        return store.dispatch(CommentActions.downVotingComment(comment)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        });
    });
});

