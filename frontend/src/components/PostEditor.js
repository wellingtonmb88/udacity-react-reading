import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as PostActions from '../actions/PostActions';
import PostForm from './PostForm';

class PostEditor extends Component {

    handleSubmit = (postAuthor, postTitle, postBody, postCategory) => {
        const { updatePost, posts, postForm } = this.props;
        const postId = postForm.postId;
        if (posts.items) {
            const post = posts.items.filter(item => item.id === postId)[0];
            const postTimestamp = Date.now();
            const voteScore = post.voteScore;

            const postObject = {
                id: postId,
                timestamp: postTimestamp,
                body: postBody !== undefined ? postBody : '',
                author: postAuthor !== undefined ? postAuthor : '',
                title: postTitle !== undefined ? postTitle : '',
                category: postCategory !== undefined ? postCategory : '',
                voteScore: voteScore,
                deleted: false
            };

            updatePost(postObject);
        }
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

const mapStateToProps = (state) => ({
    posts: state.posts,
    postForm: state.postForm
});

function mapDispatchToProps(dispatch) {
    return {
        updatePost: (data) => dispatch(PostActions.editPost(data))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PostEditor);
