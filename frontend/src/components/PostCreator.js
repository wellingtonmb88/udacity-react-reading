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
            body: postBody !== undefined ? postBody : '',
            author: postAuthor !== undefined ? postAuthor : '',
            title: postTitle !== undefined ? postTitle : '',
            category: postCategory !== undefined ? postCategory : '',
            voteScore: 1,
            deleted: false
        };

        this.props.addPost(post);
    };

    render() {
        return (
            <div >
                <PostForm
                    handleSubmit={this.handleSubmit} />
            </div>
        )
    }
};

function mapDispatchToProps(dispatch) {
    return {
        addPost: (data) => dispatch(PostActions.addNewPost(data))
    }
};

export default connect(null, mapDispatchToProps)(PostCreator);
