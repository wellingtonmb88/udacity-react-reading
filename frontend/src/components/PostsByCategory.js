import React, { Component } from 'react';
import { Header, Card, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import PostListHeader from './PostListHeader';
import PostEditor from './PostEditor';
import PostCreator from './PostCreator';
import If from './If';
import PostCard from './PostCard';
import * as PostActions from '../actions/PostActions';
import * as PostFormActions from '../actions/PostFormActions';
import * as Utils from '../utils/Utils';
import ErrorMsgPostsByCategory from './ErrorMsgPostsByCategory';

class PostsByCategory extends Component {

    state = {
        showError: false
    };

    componentDidMount() {
        const { posts } = this.props;
        if (posts.items === undefined) {
            this.setState({ showError: true });
        }
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

    deletePost = (postId) => {
        this.props.deletePost(postId);
    };

    goToPostDetails = (postId, category) => {
        this.props.goToPostDetails(postId, category);
    };

    getActivePosts() {
        const { posts, category } = this.props;
        if (posts.items !== undefined) {
            return posts.items
                .filter(item => item.deleted === false && item.category === category);
        }
        return [];
    };

    onModalClosed = () => {
        this.setState({ showError: false });
        this.props.goBackToHome();
    };

    render() {
        const { postForm, category } = this.props;
        const activePosts = this.getActivePosts();
        return (
            <div style={{ textAlign: 'center' }}>
                <ErrorMsgPostsByCategory shouldShow={this.state.showError} onModalClosed={this.onModalClosed} />
                <Divider />
                <Header as='h1' color='blue'>{Utils.capitalize(category)}</Header>
                <PostListHeader />
                <If test={activePosts.length < 1}>
                    <Header as='h3' color='red'>No results!</Header>
                </If>
                <If test={activePosts.length > 0}>
                    <Card.Group>
                        {activePosts.map((item) => (
                            <PostCard
                                key={item.id}
                                post={item}
                                deletePost={this.deletePost}
                                handleUpVoteCallback={this.handleUpVoteCallback}
                                handleDownVoteCallback={this.handleDownVoteCallback}
                                openPostEditor={this.openPostEditor}
                                goToPostDetails={this.goToPostDetails} />
                        ))}
                    </Card.Group>
                </If>
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

const mapStateToProps = (state, ownProps) => ({
    posts: state.posts,
    postForm: state.postForm,
    category: ownProps.match.params.category,
});

function mapDispatchToProps(dispatch) {
    return {
        goToPostDetails: (data) => dispatch(routerActions.push('/postdetails/' + data)),
        goBackToHome: () => dispatch(routerActions.goBack()),
        openPostForm: (data) => dispatch(PostFormActions.openForm(data)),
        loadPosts: () => dispatch(PostActions.fetchPosts()),
        deletePost: (data) => dispatch(PostActions.deletePost(data)),
        upVote: (data) => dispatch(PostActions.upVotingPost(data)),
        downVote: (data) => dispatch(PostActions.downVotingPost(data))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsByCategory);