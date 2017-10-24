
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import * as PostReducer from './PostReducer';
import * as CommentReducer from './CommentReducer';
import * as CategoryReducer from './CategoryReducer';
import * as PostFormReducer from './PostFormReducer';

const categories = CategoryReducer.reducer;
const posts = PostReducer.reducer;
const comments = CommentReducer.reducer;
const postForm = PostFormReducer.reducer;

export default combineReducers({
  categories,
  posts,
  comments,
  postForm,
  router: routerReducer
});