import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../components/App';
import { shallow, mount } from "enzyme";

it('renders without crashing', () => {
  shallow(<App />);
});
