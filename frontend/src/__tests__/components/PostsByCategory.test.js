import React from 'react';
import ReactDOM from 'react-dom';
import { PostsByCategory } from '../../components/PostsByCategory';
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

const getPostsCategorySpy = sinon.spy();
const deletePostSpy = sinon.spy();
const handleSubmitSpy = sinon.spy();
const handleUpVoteCallbackSpy = sinon.spy();
const handleDownVoteCallbackSpy = sinon.spy();
const goToPostDetailsSpy = sinon.spy();
const openPostEditorSpy = sinon.spy();
const loadPostsSpy = sinon.spy();

const postId = "8xf0y6ziyjabvozdd253nd";

const props = {
    category: "redux",
    postId: postId,
    posts: { items: items },
    postForm: { open: true, postId: "8xf0y6ziyjabvozdd253nd" },
    loadPosts: loadPostsSpy,
    deletePost: deletePostSpy,
    handleUpVoteCallback: handleUpVoteCallbackSpy,
    handleDownVoteCallback: handleDownVoteCallbackSpy,
    getPostsCategory: getPostsCategorySpy,
    goToPostDetails: goToPostDetailsSpy,
    openPostEditor: openPostEditorSpy,
    openPostForm: openPostEditorSpy,
    upVote: handleUpVoteCallbackSpy,
    downVote: handleDownVoteCallbackSpy
};

it('renders without crashing', () => {
    const container = shallow(<PostsByCategory {...props} />);
    expect(container.find("PostCard").length).toEqual(1);
});

it('test Up Vote and Down PostCard behavior', () => {
    const container = shallow(<PostsByCategory {...props} />);
    container.find("PostCard").at(0).prop('handleUpVoteCallback')({});
    container.find("PostCard").at(0).prop('handleDownVoteCallback')({});
    expect(handleUpVoteCallbackSpy.callCount).toBe(1);
    expect(handleDownVoteCallbackSpy.callCount).toBe(1);
});

it('test delete PostCard behavior', () => {
    const container = shallow(<PostsByCategory {...props} />);
    container.find("PostCard").at(0).prop('deletePost')({});
    expect(deletePostSpy.callCount).toBe(1);
});

it('test open Post Editor PostCard behavior', () => {
    const container = shallow(<PostsByCategory {...props} />);
    container.find("PostCard").at(0).prop('openPostEditor')({});
    expect(openPostEditorSpy.callCount).toBe(1);
});

it('test go To PostDetails PostCard behavior', () => {
    const container = shallow(<PostsByCategory {...props} />);
    container.find("PostCard").at(0).prop('goToPostDetails')({});
    expect(goToPostDetailsSpy.callCount).toBe(1);
});