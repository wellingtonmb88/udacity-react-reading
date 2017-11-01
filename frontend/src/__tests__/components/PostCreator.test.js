import React from 'react';
import ReactDOM from 'react-dom';
import ConnectedPostCreator, { PostCreator } from '../../components/PostCreator';
import { shallow, mount } from "enzyme";

const sinon = require('sinon');

const addPostSpy = sinon.spy();

const props = {
  addPost: addPostSpy
};

it('renders without crashing', () => {
  const container = shallow(<PostCreator  {...props} />);
});

