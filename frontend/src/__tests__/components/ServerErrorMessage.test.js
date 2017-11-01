import React from 'react';
import ReactDOM from 'react-dom';
import { ServerErrorMessage } from '../../components/ServerErrorMessage';
import * as UI from 'semantic-ui-react';
import { shallow, mount } from "enzyme";

const props = {
    serverError: { show: true }
};

it('renders without crashing', () => {
    const container = shallow(<ServerErrorMessage {...props} />);
    expect(container.find(UI.Modal.Header).length).toEqual(1);
});