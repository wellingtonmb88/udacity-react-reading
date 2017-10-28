import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import CategoryList from './CategoryList';
import PostList from './PostList';
import ServerErrorMessage from './ServerErrorMessage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Welcome to Readings</h1>
          <p>The place where you can read and post comments.</p>
        </header>
        <ServerErrorMessage />
        <CategoryList />
        <PostList />
      </div>
    );
  }
};

export default App;
