import React from 'react';
import ReactDOM from 'react-dom';
import ConnectedPostEditor, { PostEditor } from '../../components/PostEditor';
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

const updatePostSpy = sinon.spy();

const postId = "8xf0y6ziyjabvozdd253nd";

const props = {
  postId: postId,
  updatePost: updatePostSpy,
  posts: { items: items },
  postForm: { open: true, postId: "8xf0y6ziyjabvozdd253nd" }
};

it('renders without crashing', () => {
  const container = shallow(<PostEditor {...props} />);
  expect(container.find("PostForm").length).toEqual(0);
});

