import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import CategoryList from './CategoryList';
import PostList from './PostList';
import PostForm from './PostForm';
import PostDetails from './PostDetails';

const categoryList = ["Redux", "React", "Udacity"];
const postList = ["post1", "post2", "post3"];

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Welcome to Readings</h1>
          <p>The place where you can read and post comments.</p>
        </header>
        <CategoryList list={categoryList} />
        <PostList list={postList} />

        <PostForm />
        <PostDetails />
      </div>
    );
  }
};

export default App;
