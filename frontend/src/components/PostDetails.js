import React, { Component } from 'react';
import { Header, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import If from './If';
import PostGrid from './PostGrid';
import CommentList from './CommentList';
import PostEditor from './PostEditor';
import ErrorMessage from './ErrorMessage';
import MenuComponent from './MenuComponent';
import * as PostActions from '../actions/PostActions';
import * as PostFormActions from '../actions/PostFormActions';

const errorHeader = "Error loading";
const errorMessage = "Sorry but it was unable to load the Post's details screen!";

export class PostDetails extends Component {
    state = {
        showError: false
    };

    componentDidMount() {
        const { postId, getPostById } = this.props;
        getPostById(postId).then(data => {
            if (data.postId === undefined) {
                this.setState({ showError: true });
            }
        });
    };

    getPost() {
        const { posts, postId } = this.props;
        if (posts.items) {
            const post = posts.items.filter(item => item.id === postId)[0];
            if (post !== undefined) {
                return post;
            }
        }
        return {};
    }

    handleUpVoteCallback = (postId) => {
        this.props.upVote(postId);
    };

    handleDownVoteCallback = (postId) => {
        this.props.downVote(postId);
    };

    onModalClosed = () => {
        this.props.goBackToHome();
    };

    openPostEditor = (postId) => {
        this.props.openPostForm(postId);
    };

    deletePost = (postId) => {
        this.props.deletePost(postId);
        this.props.goBackToHome();
    };

    goBackToCategory = (category) => {
        this.props.goToCategory(category);
    };

    goBackToHome = () => {
        this.props.goBackToHome();
    };

    render() {
        const { postId, postForm } = this.props;
        const post = this.getPost();

        return (
            <div>
                <MenuComponent
                    category={post.category}
                    handleGoBackToHome={this.goBackToHome}
                    handleGoBackToCategory={this.goBackToCategory}
                />
                <Segment>
                    <Header as='h3' textAlign='center' color='teal'>
                        Post Details
                    </Header>
                </Segment>
                <If test={post !== undefined}>
                    <PostGrid
                        post={post}
                        deletePost={this.deletePost}
                        openPostEditor={this.openPostEditor}
                        handleUpVoteCallback={this.handleUpVoteCallback}
                        handleDownVoteCallback={this.handleDownVoteCallback} />
                    <CommentList postId={postId} />
                </If>
                <ErrorMessage
                    shouldShow={this.state.showError}
                    header={errorHeader}
                    message={errorMessage}
                    onModalClosed={this.onModalClosed} />
                <If test={postForm.open && postForm.postId !== undefined}>
                    <PostEditor />
                </If>
            </div>
        )
    }
};

const mapStateToProps = (state, ownProps) => ({
    posts: state.posts,
    postId: ownProps.match.params.post_id,
    postForm: state.postForm
});

function mapDispatchToProps(dispatch) {
    return {
        getPostById: (data) => dispatch(PostActions.fetchPostById(data)),
        openPostForm: (data) => dispatch(PostFormActions.openForm(data)),
        goBackToHome: () => dispatch(routerActions.push('/')),
        goToCategory: (category) => dispatch(routerActions.push('/' + category)),
        upVote: (data) => dispatch(PostActions.upVotingPost(data)),
        downVote: (data) => dispatch(PostActions.downVotingPost(data)),
        deletePost: (data) => dispatch(PostActions.deletePost(data))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);