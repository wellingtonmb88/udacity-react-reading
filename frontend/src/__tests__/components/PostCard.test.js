import React from 'react';
import ReactDOM from 'react-dom';
import PostCard from '../../components/PostCard';
import * as UI from 'semantic-ui-react';
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

const post = {
    "id": "8xf0y6ziyjabvozdd253nd",
    "timestamp": 1467166872634,
    "title": "Udacity is the best place to learn React",
    "body": "Everyone says so after all.",
    "author": "thingtwo",
    "category": "react",
    "comments": { "items": comments },
    "voteScore": 6,
    "deleted": false
};

const post_2 = {
    "id": "8xf0y6ziyjabvozdd253nd",
    "timestamp": 1467166872634,
    "title": "Udacity is the best place to learn React",
    "body": "Everyone says so after all.",
    "author": "thingtwo",
    "category": "react",
    "voteScore": 6,
    "deleted": false
};

const handleUpVoteCallbackSpy = sinon.spy();
const handleDownVoteCallbackSpy = sinon.spy();
const deletePostSpy = sinon.spy();
const openPostEditorSpy = sinon.spy();
const goToPostDetailsSpy = sinon.spy();

const props = {
    post: post,
    handleUpVoteCallback: handleUpVoteCallbackSpy,
    handleDownVoteCallback: handleDownVoteCallbackSpy,
    deletePost: deletePostSpy,
    openPostEditor: openPostEditorSpy,
    goToPostDetails: goToPostDetailsSpy
};

const props_2 = {
    post: post_2,
    handleUpVoteCallback: handleUpVoteCallbackSpy,
    handleDownVoteCallback: handleDownVoteCallbackSpy,
    deletePost: deletePostSpy,
    openPostEditor: openPostEditorSpy,
    goToPostDetails: goToPostDetailsSpy
};

it('renders without crashing', () => {
    const container = mount(<PostCard {...props} />);
    expect(container.find(UI.Card.Group).length).toEqual(1);
});

it('test Up Vote and Down Vote behavior', () => {
    const container = mount(<PostCard {...props} />);
    container.find("Vote").prop('upVote')({});
    container.find("Vote").prop('downVote')({});
    expect(handleUpVoteCallbackSpy.callCount).toBe(1);
    expect(handleDownVoteCallbackSpy.callCount).toBe(1);
});

it('test Delete Post behavior', () => {
    const container = mount(<PostCard {...props} />);
    const deleteComponent = container
        .findWhere(n => n.type() === 'button' && n !== null && n.text() === 'Delete');
    deleteComponent.simulate('click');
    expect(deletePostSpy.callCount).toBe(1);
});

it('test Edit Post behavior', () => {
    const container = mount(<PostCard {...props} />);
    const deleteComponent = container
        .findWhere(n => n.type() === 'button' && n !== null && n.text() === 'Edit');
    deleteComponent.simulate('click');
    expect(deletePostSpy.callCount).toBe(1);
});

it('test Go to Post Details behavior', () => {
    const container = mount(<PostCard {...props} />);
    const deleteComponent = container
        .findWhere(n => n.type() === 'button' && n !== null && n.text() === 'Details');
    deleteComponent.simulate('click');
    expect(deletePostSpy.callCount).toBe(1);
});

it('test Pot with 0 comments behavior', () => {
    const container = mount(<PostCard {...props_2} />);
    const commentsComponent = container.findWhere(n => n.type() === 'h4');
    expect(commentsComponent.length).toEqual(0);
});