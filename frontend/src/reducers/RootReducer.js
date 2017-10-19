
import * as PostReducer from './PostReducer';
import * as CommentReducer from './CommentReducer';
import { combineReducers } from 'redux';

const posts = PostReducer.reducer;
const comments = CommentReducer.reducer;

export default combineReducers({
    posts,
    comments
  });