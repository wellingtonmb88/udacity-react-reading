import React from 'react';
import ReactDOM from 'react-dom';
import ErrorMessage from '../../components/ErrorMessage';
import * as UI from 'semantic-ui-react';
import { shallow, mount } from "enzyme";

const sinon = require('sinon');

const onModalClosedSpy = sinon.spy();

const props = {
    shouldShow: true,
    header: 'header',
    message: 'message',
    onModalClosed: onModalClosedSpy
};

it('renders without crashing', () => {
    const container = shallow(<ErrorMessage {...props}  />);
    expect(container.find(UI.Modal.Header).length).toEqual(1);
});