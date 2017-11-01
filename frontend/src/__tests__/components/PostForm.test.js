import React from 'react';
import ReactDOM from 'react-dom';
import { PostForm } from '../../components/PostForm';
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

const categories = {
    items:
    [
        { name: 'react', path: 'react' },
        { name: 'redux', path: 'redux' },
        { name: 'udacity', path: 'udacity' }
    ]
};

const closePostFormSpy = sinon.spy();
const handleSubmitSpy = sinon.spy();

const postId = "8xf0y6ziyjabvozdd253nd";

const props = {
    postId: postId,
    posts: { items: items },
    categories: categories,
    postForm: { open: true, postId: "8xf0y6ziyjabvozdd253nd" },
    handleSubmit: handleSubmitSpy,
    closePostForm: closePostFormSpy
};

it('renders without crashing', () => {
    const container = shallow(<PostForm {...props} />);
    expect(container.find("ModalHeader").length).toEqual(2);
});

it('testing text length > 0 change behavior', () => {
    const container = shallow(<PostForm {...props} />);
    const eventFormInput = { target: { name: "author", value: "Author" } };
    const eventFormTextArea = { target: { name: "body", value: "Body" } };
    container.find("FormInput").at(0).simulate('change', eventFormInput);
    container.find("FormTextArea").simulate('change', eventFormTextArea);
});

it('testing FormInput length < 1 change behavior', () => {
    const container = shallow(<PostForm {...props} />);
    const eventFormInput = { target: { name: "author", value: "" } };
    container.find("FormInput").at(0).simulate('change', eventFormInput);
});

it('testing FormTextArea length < 1 change behavior', () => {
    const container = shallow(<PostForm {...props} />);
    const eventFormInput = { target: { name: "body", value: "" } };
    container.find("FormTextArea").simulate('change', eventFormInput);
});

it('testing text undefined change behavior', () => {
    const container = shallow(<PostForm {...props} />);
    const eventFormInput = { target: { name: "author", value: undefined } };
    container.find("FormInput").at(0).simulate('change', eventFormInput);
});

it('testing submit behavior', () => {
    const container = shallow(<PostForm {...props} />);
    container.find("Button").at(1).simulate('click');
    expect(handleSubmitSpy.callCount).toBe(1);
});

it('testing cancel behavior', () => {
    const container = shallow(<PostForm {...props} />);
    container.find("Button").at(0).simulate('click');
    expect(closePostFormSpy.callCount).toBe(2);
});