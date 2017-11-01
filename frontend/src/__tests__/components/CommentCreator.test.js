import React from 'react';
import ReactDOM from 'react-dom';
import ConnectedCommentCreator, { CommentCreator } from '../../components/CommentCreator';
import { shallow, mount } from "enzyme";

const postId = "postId";

const sinon = require('sinon');

const addNewCommentSpy = sinon.spy();

const props = {
  postId: postId,
  addComment: addNewCommentSpy
};

it('renders without crashing', () => {
  const container = shallow(<CommentCreator {...props} />);
  expect(container.find("CommentForm").length).toEqual(1);
});

it('test create comment', () => {

  const container = shallow(<CommentCreator {...props} />);

  expect(container.find("CommentForm").length).toEqual(1);
  container.find("CommentForm").prop('handleSubmit')({});
  expect(addNewCommentSpy.call.length).toBe(1);
});
