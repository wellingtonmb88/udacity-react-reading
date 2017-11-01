import React from 'react';
import ReactDOM from 'react-dom';
import Comment from '../../components/Comment';
import * as UI from 'semantic-ui-react';
import { shallow, mount } from "enzyme";

const sinon = require('sinon');

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

const handleUpVoteCallbackSpy = sinon.spy();
const handleDownVoteCallbackSpy = sinon.spy();
const removeCommentSpy = sinon.spy();
const openCommentEditorSpy = sinon.spy();

const props = {
    comment: comment,
    handleUpVoteCallback: handleUpVoteCallbackSpy,
    handleDownVoteCallback: handleDownVoteCallbackSpy,
    removeComment: removeCommentSpy,
    openCommentEditor: openCommentEditorSpy
};

it('renders without crashing', () => {
    const container = mount(<Comment {...props}  />);
    expect(container.find(UI.Comment.Author).length).toEqual(1);
});

it('test Up Vote and Down Vote behavior', () => {
    const container = mount(<Comment {...props}  />);
    container.find("Vote").prop('upVote')({});
    container.find("Vote").prop('downVote')({});
    expect(handleUpVoteCallbackSpy.callCount).toBe(1);
    expect(handleDownVoteCallbackSpy.callCount).toBe(1);
});

it('test Remove Comment behavior', () => {
    const container = mount(<Comment {...props}  />);
    const deleteComponent = container
    .findWhere(n => n.type() === 'a' && n !== null && n.text() === 'Delete');
    deleteComponent.simulate('click');
    expect(removeCommentSpy.callCount).toBe(1);
});

it('test Open Comment Editor behavior', () => {
    const container = mount(<Comment {...props}  />);
    const openEditorComponent = container
    .findWhere(n => n.type() === 'a' && n !== null && n.text() === 'Update');
    openEditorComponent.simulate('click');
    expect(openCommentEditorSpy.callCount).toBe(1);
});