import React from 'react';
import ReactDOM from 'react-dom';
import ConnectedCategoryList, { CategoryList } from '../../components/CategoryList';
import { shallow, mount } from "enzyme";
import configureMockStore from 'redux-mock-store';
import { Loader, List } from 'semantic-ui-react';

import thunk from 'redux-thunk';

let store;

const mockStore = configureMockStore([thunk]);

const items = {
  items:
  [
    { name: 'react', path: 'react' },
    { name: 'redux', path: 'redux' },
    { name: 'udacity', path: 'udacity' }
  ]
};

const initialState = { categories: items };

it('renders without crashing', () => {
  store = mockStore({ categories: {} });
  const container = mount(<ConnectedCategoryList store={store} />);
  expect(container.find(List.Header).length).toEqual(0);
  expect(container.find(Loader).prop('active')).toEqual(true);
});

it('renders without crashing', () => {
  store = mockStore(initialState);
  const container = mount(<ConnectedCategoryList store={store} />);
  expect(container.find(Loader).prop('active')).toEqual(false);
  expect(container.find(List.Item).length).toEqual(3);
});

it('renders 0(Zero) Categories ', () => {
  store = mockStore({ categories: { items: [] } });
  const container = mount(<ConnectedCategoryList store={store} />);
  expect(container.find(List.Header).length).toEqual(0);
});

it('renders and simulate click one Category', () => {
  store = mockStore(initialState);
  const container = mount(<ConnectedCategoryList store={store} />);
  expect(container.find(List.Header).length).toEqual(3);
  container.find(List.Header).first().simulate('click');
});