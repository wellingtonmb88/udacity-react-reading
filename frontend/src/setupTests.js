
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const localStorageMock = {
  token: jest.fn(),
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock;

// const DATE_TO_USE = new Date('2016');
// const _Date = Date;
// global.Date = jest.fn(() => DATE_TO_USE);
// global.Date.UTC = _Date.UTC;
// global.Date.parse = _Date.parse;
// global.Date.now = jest.fn();
