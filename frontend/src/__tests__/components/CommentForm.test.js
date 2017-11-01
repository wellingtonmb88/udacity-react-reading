import React from 'react';
import ReactDOM from 'react-dom';
import CommentForm from '../../components/CommentForm';
import { shallow, mount } from "enzyme";

const comment = {
  "id": "894tuq4ut84ut8v4t8wun89g",
  "parentId": "8xf0y6ziyjabvozdd253nd",
  "timestamp": 1468166872634,
  "body": "Hi there! I am a COMMENT.",
  "author": "thingtwo",
  "voteScore": 6,
  "deleted": false,
  "parentDeleted": false
};

const sinon = require('sinon');

const handleSubmitSpy = sinon.spy();

const props = {
  comment: comment,
  handleSubmit: handleSubmitSpy
};

it('renders without crashing', () => {
  const container = shallow(<CommentForm {...props} />);
});

it('testing text length > 0 change behavior', () => {
  const container = shallow(<CommentForm {...props} />);
  const eventFormInput = { target: { name: "author", value: "Author" } };
  const eventFormTextArea = { target: { name: "body", value: "Body" } };
  container.find("FormInput").simulate('change', eventFormInput);
  container.find("FormTextArea").simulate('change', eventFormTextArea);
});

it('testing FormInput length < 1 change behavior', () => {
  const container = shallow(<CommentForm {...props} />);
  const eventFormInput = { target: { name: "author", value: "" } };
  container.find("FormInput").simulate('change', eventFormInput);
});

it('testing FormTextArea length < 1 change behavior', () => {
  const container = shallow(<CommentForm {...props} />);
  const eventFormInput = { target: { name: "body", value: "" } };
  container.find("FormTextArea").simulate('change', eventFormInput);
});

it('testing text undefined change behavior', () => {
  const container = shallow(<CommentForm {...props} />);
  const eventFormInput = { target: { name: "author", value: undefined } };
  container.find("FormInput").simulate('change', eventFormInput);
});

it('testing submit behavior', () => {
  const container = shallow(<CommentForm {...props} />);
  container.find("Button").simulate('click');
  expect(handleSubmitSpy.callCount).toBe(1);
});