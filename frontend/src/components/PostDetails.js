import React, { Component } from 'react';
import { Button, Grid, Segment, Label, Modal } from 'semantic-ui-react';
import Vote from './Vote';
import If from './If';
import Comments from './Comments';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import Moment from 'react-moment';
import * as PostActions from '../actions/PostActions';

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

    render() {
        const { postId } = this.props;
        const post = this.getPost();

        return (
            <div>
                <div className="details-bar">
                    <a className="close-details" onClick={() => this.onBackPressed()}>Close</a>
                    <p>Post Details</p>
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
                        <Comments postId={postId} />
                    </div>
                </If>
                <Modal dimmer={'blurring'} open={post.id === undefined} onClose={this.onModalClosed}>
                    <Modal.Header>Errorr!!!!</Modal.Header>
                    <Modal.Content>
                        Sorry but it was unabe to load the pos details try again later!
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='black'
                            content="Ok"
                            onClick={this.onModalClosed} />
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
};

const mapStateToProps = (state, ownProps) => ({
    posts: state.posts,
    postId: ownProps.match.params.post_id
});

function mapDispatchToProps(dispatch) {
    return {
        goBackToHome: () => dispatch(routerActions.push('/')),
        upVote: (data) => dispatch(PostActions.upVotingPost(data)),
        downVote: (data) => dispatch(PostActions.downVotingPost(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);