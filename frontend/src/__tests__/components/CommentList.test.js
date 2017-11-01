import React from 'react';
import ReactDOM from 'react-dom';
import ConnectedCommentList, { CommentList } from '../../components/CommentList';
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

const removeCommentSpy = sinon.spy();
const openCommentFormSpy = sinon.spy();
const upVoteSpy = sinon.spy();
const downVoteSpy = sinon.spy();

const props = {
  postId: postId,
  posts: { items: items },
  openCommentForm: openCommentFormSpy,
  removeComment: removeCommentSpy,
  upVote: upVoteSpy,
  downVote: downVoteSpy,
};

const props_empty = {
  postId: postId,
  posts: { items: [] },
  openCommentForm: openCommentFormSpy,
  removeComment: removeCommentSpy,
  upVote: upVoteSpy,
  downVote: downVoteSpy,
};

const props_undefined = {
  postId: postId,
  posts: {  },
  openCommentForm: openCommentFormSpy,
  removeComment: removeCommentSpy,
  upVote: upVoteSpy,
  downVote: downVoteSpy,
};

it('renders without crashing', () => {
  const container = shallow(<CommentList {...props} />);
  expect(container.find("Comment").length).toEqual(2);
});

it('testing empty Comment List', () => {
  const container = shallow(<CommentList  {...props_empty} />);
  expect(container.find("Comment").length).toEqual(0);
});

it('testing comments undefined', () => {
  const container = shallow(<CommentList  {...props_undefined} />);
  expect(container.find("Comment").length).toEqual(0);
});

it('testing posts undefined', () => {
  const container = shallow(<CommentList  {...props_undefined} />);
  expect(container.find("Comment").length).toEqual(0);
});

it('testing open Comment Form', () => {
  const container = shallow(<CommentList  {...props} />);
  container.find("Comment").first().prop('openCommentEditor')({});
});

it('testing remove Comment', () => {
  const container = shallow(<CommentList {...props} />);
  container.find("Comment").first().prop('removeComment')({});
});

it('testing Up Voting Comment', () => {
  const container = shallow(<CommentList {...props} />);
  container.find("Comment").first().prop('handleUpVoteCallback')({});
});

it('testing Down Voting Comment', () => {

  const container = shallow(<CommentList {...props} />);
  container.find("Comment").first().prop('handleDownVoteCallback')({});
});
