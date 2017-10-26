import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import PostListHeader from './PostListHeader';
import PostEditor from './PostEditor';
import PostCreator from './PostCreator';
import PostCard from './PostCard';
import If from './If';
import * as PostActions from '../actions/PostActions';
import * as PostFormActions from '../actions/PostFormActions';

class PostList extends Component {

    componentDidMount() {
        this.props.loadPosts();
    };

    handleUpVoteCallback = (postId) => {
        this.props.upVote(postId);
    };

    handleDownVoteCallback = (postId) => {
        this.props.downVote(postId);
    };

    openPostEditor = (postId) => {
        this.props.openPostForm(postId);
    };

    goToPostDetails = (postId, category) => {
        this.props.goToPostDetails(postId, category);
    };

    getActivePosts() {
        const { posts } = this.props;
        if (posts.items !== undefined) {
            return posts.items.filter(item => item.deleted === false);
        }
        return [];
    };

    render() {
        const { postForm } = this.props;
        return (
            <div>
                <PostListHeader />
                <Card.Group itemsPerRow={1}>
                    {this.getActivePosts().map((item) => (
                        <PostCard
                            key={item.id}
                            post={item}
                            handleUpVoteCallback={this.handleUpVoteCallback}
                            handleDownVoteCallback={this.handleDownVoteCallback}
                            openPostEditor={this.openPostEditor}
                            goToPostDetails={this.goToPostDetails} />
                    ))}
                </Card.Group>
                <If test={postForm.open && postForm.postId !== undefined}>
                    <PostEditor />
                </If>
                <If test={postForm.open && postForm.postId === undefined}>
                    <PostCreator />
                </If>
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
        goToPostDetails: (postId, category) => dispatch(routerActions.push('/' + category + '/' + postId)),
        openPostForm: (data) => dispatch(PostFormActions.openForm(data)),
        loadPosts: () => dispatch(PostActions.fetchPosts()),
        removePost: (data) => dispatch(PostActions.deletePost(data)),
        upVote: (data) => dispatch(PostActions.upVotingPost(data)),
        downVote: (data) => dispatch(PostActions.downVotingPost(data))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PostList);