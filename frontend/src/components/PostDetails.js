import React, { Component } from 'react';
import { Button, Grid, Segment, Label } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import Moment from 'react-moment';
import Vote from './Vote';
import If from './If';
import CommentList from './CommentList';
import PostEditor from './PostEditor';
import ErrorMsgPostDetails from './ErrorMsgPostDetails';
import * as PostActions from '../actions/PostActions';
import * as PostFormActions from '../actions/PostFormActions';

class PostDetails extends Component {

    getPost() {
        const { posts, postId } = this.props;
        if (posts.items) {
            const post = posts.items.filter(item => item.id === postId)[0];
            return post;
        }
        return {};
    }

    handleUpVoteCallback = (postId) => {
        this.props.upVote(postId);
    };

    handleDownVoteCallback = (postId) => {
        this.props.downVote(postId);
    };

    onBackPressed = () => {
        this.props.goBackToHome();
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

    render() {
        const { postId, postForm } = this.props;
        const post = this.getPost();

        return (
            <div>
                <div className="details-bar">
                    <a className="close-details" onClick={() => this.onBackPressed()}>Close</a>
                    <p>Post Details</p>
                    <Button color='blue'
                        content="Update"
                        onClick={() => this.openPostEditor(postId)} />
                </div>
                <If test={post.id !== undefined}>
                    <div
                        style={{
                            width: '500px',
                            height: '500px',
                            marginTop: '10%',
                            marginLeft: 'auto',
                            marginRight: 'auto'
                        }}>
                        <Grid  >
                            <Grid.Row>
                                <Grid.Column >
                                    <Segment raised>
                                        <Label as='a' color='red' ribbon>Post Details</Label>
                                        <Button color='red'
                                            content="Delete"
                                            onClick={() => this.deletePost(postId)} />
                                        <div>
                                            <Label color='yellow' horizontal>Author</Label> <span>{post.author}</span>
                                        </div>
                                        <div>
                                            <Label color='red' horizontal>Title</Label> <span>{post.title}</span>
                                        </div>

                                        <div>
                                            <Label color='green' horizontal>Body</Label> <span>{post.body}</span>
                                        </div>

                                        <div>
                                            <Label color='green' horizontal>Date</Label> <Moment fromNow>{post.timestamp}</Moment>
                                        </div>

                                        <div>
                                            <Label color='blue' horizontal>Category</Label> <span>{post.category}</span>
                                        </div>
                                        <Vote
                                            itemId={post.id}
                                            number={post.voteScore}
                                            upVote={this.handleUpVoteCallback}
                                            downVote={this.handleDownVoteCallback} />
                                    </Segment>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        <CommentList postId={postId} />
                    </div>
                </If>
                <ErrorMsgPostDetails postId={post.id} onModalClosed={this.onModalClosed} />
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
        openPostForm: (data) => dispatch(PostFormActions.openForm(data)),
        goBackToHome: () => dispatch(routerActions.goBack()),
        upVote: (data) => dispatch(PostActions.upVotingPost(data)),
        downVote: (data) => dispatch(PostActions.downVotingPost(data)),
        deletePost: (data) => dispatch(PostActions.deletePost(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);