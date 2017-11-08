import React from 'react';
import ReactDOM from 'react-dom';
import ConnectedPostDetails, { PostDetails } from '../../components/PostDetails';
import { shallow, mount } from "enzyme";

const sinon = require('sinon');
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

const items = [
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
        "comments": { "items": comments },
        "voteScore": -5,
        "deleted": false
    }
];

const postId = "8xf0y6ziyjabvozdd253nd";

const deletePostSpy = sinon.spy();
const openPostFormSpy = sinon.spy();
const goBackToHomeSpy = sinon.spy();
const upVoteSpy = sinon.spy();
const downVoteSpy = sinon.spy();
const mockPromise = Promise.resolve({})
const getPostByIdSpy = jest.fn(() => mockPromise)

const props = {
    postId: postId,
    posts: { items: items },
    openPostForm: openPostFormSpy,
    goBackToHome: goBackToHomeSpy,
    getPostById: getPostByIdSpy,
    deletePost: deletePostSpy,
    upVote: upVoteSpy,
    downVote: downVoteSpy,
    postForm: { open: false, postId: postId },
    ownProps: { match: { params: { post_id: postId } } }
};

it('renders without crashing', () => {
    const container = shallow(<PostDetails {...props} />);
    expect(container.find("PostGrid").length).toEqual(1);
});

it('testing delete Post', () => {
    const container = shallow(<PostDetails {...props} />);
    container.find("PostGrid").first().prop('deletePost')({});
});

it('testing open Post Editor Form', () => {
    const container = shallow(<PostDetails {...props} />);
    container.find("PostGrid").first().prop('openPostEditor')({});
});

it('testing UpVote Post', () => {
    const container = shallow(<PostDetails {...props} />);
    container.find("PostGrid").first().prop('handleUpVoteCallback')({});
});

it('testing UpVote Post', () => {
    const container = shallow(<PostDetails {...props} />);
    container.find("PostGrid").first().prop('handleUpVoteCallback')({});
});

it('testing DownVote Post', () => {
    const container = shallow(<PostDetails {...props} />);
    container.find("PostGrid").first().prop('handleDownVoteCallback')({});
});
