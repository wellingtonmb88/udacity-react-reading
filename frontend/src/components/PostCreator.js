import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as PostActions from '../actions/PostActions';
import PostForm from './PostForm';

class PostCreator extends Component {

    handleSubmit = (postAuthor, postTitle, postBody, postCategory) => {
        const postId = Math.random().toString(36).substr(-8);
        const postTimestamp = Date.now();

        const post = {
            id: postId,
            timestamp: postTimestamp,
            body: postBody,
            author: postAuthor,
            title: postTitle,
            category: postCategory,
            voteScore: 0,
            deleted: false
        };

        this.props.addPost({ post });
    }

    render() {
        return (
            <div >
                <PostForm
                    postAuthor=''
                    postBody=''
                    postTitle=''
                    postCategory=''
                    postDate=''
                    handleSubmit={this.handleSubmit} />
            </div>
        )
    }
};

function mapDispatchToProps(dispatch) {
    return {
        addPost: (data) => dispatch(PostActions.addPost(data))
    }
}
export default connect(null, mapDispatchToProps)(PostCreator);
