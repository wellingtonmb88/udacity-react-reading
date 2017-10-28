
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import * as PostReducer from './PostReducer';
import * as CategoryReducer from './CategoryReducer';
import * as PostFormReducer from './PostFormReducer';
import * as CommentFormReducer from './CommentFormReducer';
import * as ServerErrorReducer from './ServerErrorReducer';

const categories = CategoryReducer.reducer;
const posts = PostReducer.reducer;
const postForm = PostFormReducer.reducer;
const commentForm = CommentFormReducer.reducer;
const serverError = ServerErrorReducer.reducer;

export default combineReducers({
  categories,
  posts,
  postForm,
  commentForm,
  serverError,
  router: routerReducer
});