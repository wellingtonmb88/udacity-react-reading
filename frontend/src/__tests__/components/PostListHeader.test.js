import React from 'react';
import ReactDOM from 'react-dom';
import ConnectedPostListHeader, { PostListHeader } from '../../components/PostListHeader';
import { shallow, mount } from "enzyme";
import configureMockStore from 'redux-mock-store';
import { Button, Dropdown, Divider, Grid } from 'semantic-ui-react';

import thunk from 'redux-thunk';

let store;

const mockStore = configureMockStore([thunk]);

it('renders without crashing', () => {
    store = mockStore({});
    const container = mount(<PostListHeader store={store} />);
    expect(container.find(Grid.Row).length).toEqual(1);
});

it('testing open Post Form', () => {
    store = mockStore({});
    const container = mount(<ConnectedPostListHeader store={store} />);
    container.find(Button).simulate('click');
});