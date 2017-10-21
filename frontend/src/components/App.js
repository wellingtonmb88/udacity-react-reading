import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import CategoryList from './CategoryList';
import PostList from './PostList';
import PostCreator from './PostCreator';
import PostDetails from './PostDetails';
import { connect } from 'react-redux';
import * as PostActions from '../actions/PostActions';
import * as CategoryActions from '../actions/CategoryActions';

const categoryList = ["Redux", "React", "Udacity"];
const postList = ["post1", "post2", "post3"];
const post = {
  id: "6ni6ok3ym7mf1p33lnez35",
  timestamp: 1468479767190,
  title: "Learn Redux in 10 minutes!",
  body: "Just kidding. It takes more than 10 minutes to learn technology.",
  author: "thingone",
  category: "redux",
  voteScore: -5,
  deleted: false
};
class App extends Component {

  componentDidMount() {
    this.props.dispatch(CategoryActions.fetchCategories());
  };

  getActivePosts(posts) {
    let output = [];
    Object.keys(posts).map((key) => output.push(posts[key]));
    return output.filter(item => item.deleted === false);
  };

  render() {
    const { posts, comments } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Welcome to Readings</h1>
          <p>The place where you can read and post comments.</p>
        </header>
        <CategoryList list={categoryList} />
        <PostList postList={this.getActivePosts(posts)} />
        <PostCreator />
        <PostDetails postId={"19"} />
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  posts: state.posts,
  comments: state.comments
});

function mapDispatchToProps(dispatch) {
  return {
    addPost: (data) => dispatch(PostActions.addPost(data)),
    removePost: (data) => dispatch(PostActions.removePost(data))
  }
}
export default connect(mapStateToProps)(App);
