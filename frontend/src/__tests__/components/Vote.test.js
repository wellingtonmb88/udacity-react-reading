import React from 'react';
import ReactDOM from 'react-dom';
import Vote from '../../components/Vote';
import * as UI from 'semantic-ui-react';
import { shallow, mount } from "enzyme";

const sinon = require('sinon');

const handleUpVoteCallbackSpy = sinon.spy();
const handleDownVoteCallbackSpy = sinon.spy();

const props = {
    itemId: 'itemId',
    number: 0,
    upVote: handleUpVoteCallbackSpy,
    downVote: handleDownVoteCallbackSpy,
};

it('renders without crashing', () => {
    const container = mount(<Vote {...props} />);
    expect(container.find(UI.Feed.Like).length).toEqual(1);
});

it('test Up Vote behavior', () => {
    const container = mount(<Vote {...props} />);
    container.find(UI.Button).at(0).simulate('click');
    expect(handleUpVoteCallbackSpy.callCount).toBe(1);
});

it('test Down Vote behavior', () => {
    const container = mount(<Vote {...props} />);
    container.find(UI.Button).at(1).simulate('click');
    expect(handleDownVoteCallbackSpy.callCount).toBe(1);
});