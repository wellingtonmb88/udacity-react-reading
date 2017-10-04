import React from 'react';
import PostList from './PostList';

export default function CategoryWithPosts({ categoryName, postList }) {
    return (
      <div>
        <h1>{categoryName}</h1>
        <PostList list={postList} />
      </div>
    );
  };
