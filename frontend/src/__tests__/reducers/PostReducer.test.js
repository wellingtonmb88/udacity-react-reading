import {
    LOAD_POSTS,
    LOAD_POSTS_BY_CATEGORY,
    ADD_POST,
    UPDATE_POST,
    REMOVE_POST,
    UP_VOTE_POST,
    DOWN_VOTE_POST,
    SORT_POSTS_BY_DATE,
    SORT_POSTS_BY_VOTE,
    COMMENTS_BY_POST_ID
} from '../../actions/PostActions';

import {
    ADD_COMMENT,
    UPDATE_COMMENT,
    REMOVE_COMMENT,
    UP_VOTE_COMMENT,
    DOWN_VOTE_COMMENT
} from '../../actions/CommentActions';

import * as PostReducer from '../../reducers/PostReducer';

const reducer = PostReducer.reducer;

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

const responseOrderedByVote = [
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

const responseOrderedByDate = [
    {
        "id": "6ni6ok3ym7mf1p33lnez",
        "timestamp": 1468479767190,
        "title": "Learn Redux in 10 minutes!",
        "body": "Just kidding. It takes more than 10 minutes to learn technology.",
        "author": "thingone",
        "category": "redux",
        "voteScore": -5,
        "deleted": false
    },
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

const responseSecondDeleted = [
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
        "deleted": true
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

const post = responseReact[0];

const comments = [
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

const responseWithComment = [
    {
        "id": "8xf0y6ziyjabvozdd253nd",
        "timestamp": 1467166872634,
        "title": "Udacity is the best place to learn React",
        "body": "Everyone says so after all.",
        "author": "thingtwo",
        "comments": { "items": comments },
        "category": "react",
        "voteScore": 6,
        "deleted": false
    }
];

const responseAllWithComment = [
    {
        "id": "8xf0y6ziyjabvozdd253nd",
        "timestamp": 1467166872634,
        "title": "Udacity is the best place to learn React",
        "body": "Everyone says so after all.",
        "author": "thingtwo",
        "category": "react",
        "comments": { "items": comments },
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

const responseDeletedWithComment = [
    {
        "id": "8xf0y6ziyjabvozdd253nd",
        "timestamp": 1467166872634,
        "title": "Udacity is the best place to learn React",
        "body": "Everyone says so after all.",
        "author": "thingtwo",
        "comments": { "items": comments },
        "category": "react",
        "voteScore": 6,
        "deleted": true
    }
];

describe('Post reducer', () => {

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({})
    });

    it('should handle LOAD_POSTS', () => {
        expect(
            reducer([], {
                type: LOAD_POSTS,
                posts: responseAll
            })
        ).toEqual(
            { items: responseAll }
            );
    });

    it('should handle LOAD_POSTS_BY_CATEGORY', () => {
        expect(
            reducer([], {
                type: LOAD_POSTS_BY_CATEGORY,
                posts: responseAll
            })
        ).toEqual(
            { items: responseAll }
            );
    });

    it('should handle ADD_POST', () => {
        expect(
            reducer({ items: responseAll }, {
                type: ADD_POST,
                post: post
            })
        ).toEqual(
            { items: [...responseAll, post] }
            );
    });

    it('should handle COMMENTS_BY_POST_ID', () => {
        expect(
            reducer({ items: responseAllWithComment }, {
                type: COMMENTS_BY_POST_ID,
                comments,
                postId: responseAllWithComment[0].id
            })
        ).toEqual(
            { items: responseAllWithComment }
            );
    });

    it('should handle SORT_POSTS_BY_DATE', () => {
        expect(
            reducer({ items: responseAll }, {
                type: SORT_POSTS_BY_DATE
            })
        ).toEqual(
            { items: responseOrderedByDate }
            );
    });

    it('should handle SORT_POSTS_BY_VOTE', () => {
        expect(
            reducer({ items: responseAll }, {
                type: SORT_POSTS_BY_VOTE
            })
        ).toEqual(
            { items: responseOrderedByVote }
            );
    });
});