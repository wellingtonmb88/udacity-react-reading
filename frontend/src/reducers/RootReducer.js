
import * as PostReducer from './PostReducer';
import * as CommentReducer from './CommentReducer';
import * as CategoryReducer from './CategoryReducer';
import { combineReducers } from 'redux';

const categories = CategoryReducer.reducer;
const posts = PostReducer.reducer;
const comments = CommentReducer.reducer;

export default combineReducers({
  categories,
  posts,
  comments
});