import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as PostActions from '../actions/PostActions';
import PostForm from './PostForm';

class PostEditor extends Component {

    state = {
        postBody: '',
        postAuthor: '',
        postTitle: '',
        postCategory: '',
        postDate: '',
        voteScore: 0
    };

    static propTypes = {
        postId: PropTypes.string.isRequired
    };

    componentWillMount() {
        const { postId, posts } = this.props;
        const post = posts[postId];

        this.setState({ postBody: post.body });
        this.setState({ postAuthor: post.author });
        this.setState({ postTitle: post.title });
        this.setState({ postCategory: post.category });
        this.setState({ postDate: post.date });
        this.setState({ voteScore: post.voteScore });
    }

    handleSubmit = (postAuthor, postBody) => {
        const { parentId, voteScore } = this.state
        const { postId, updatePost } = this.props;
        const postTimestamp = Date.now();

        const post = {
            id: postId,
            timestamp: postTimestamp,
            body: postBody,
            author: postAuthor,
            parentId: parentId,
            voteScore: voteScore,
            deleted: false
        };

        updatePost({ post });
    }

    handleSubmit = (postAuthor, postTitle, postBody, postCategory) => {
        const { voteScore } = this.state
        const { postId, updatePost } = this.props;
        const postTimestamp = Date.now();

        const post = {
            id: postId,
            timestamp: postTimestamp,
            body: postBody,
            author: postAuthor,
            title: postTitle,
            category: postCategory,
            voteScore: voteScore,
            deleted: false
        };

        updatePost({ post });
    }

    render() {
        const { postBody, postAuthor, postTitle, postCategory, postDate } = this.state;
        return (
            <div >
                <PostForm
                    postAuthor={postAuthor}
                    postBody={postBody}
                    postTitle={postTitle}
                    postCategory={postCategory}
                    postDate={postDate}
                    handleSubmit={this.handleSubmit} />
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
    posts: state.posts
});

function mapDispatchToProps(dispatch) {
    return {
        updatePost: (data) => dispatch(PostActions.updatePost(data))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PostEditor);
