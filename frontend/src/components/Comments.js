import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Comment } from 'semantic-ui-react';
import avatar from '../assets/images/avatar_placeholder.png';
import Vote from './Vote';
import CommentCreator from './CommentCreator';
import CommentEditor from './CommentEditor';
import If from './If.js';
import PropTypes from 'prop-types';
import * as CommentActions from '../actions/CommentActions';

class Comments extends Component {

    state = {
        showCommentEditor: false,
        commentId: ''
    };

    static propTypes = {
        postId: PropTypes.string.isRequired
    };

    componentDidMount() {
        const { postId, loadComments } = this.props;
        loadComments(postId);
    };

    handleUpVoteCallback = (commentId) => {
        this.props.upVote(commentId)
    };

    handleDownVoteCallback = (commentId) => {
        this.props.downVote(commentId)
    };

    openCommentEditor = (commentId) => {
        this.setState({ commentId });
        this.setState({ showCommentEditor: true })
    }

    getActiveComments(comments) {
        if (comments.items) {
            return comments.items.filter(item => item.deleted === false);
        }
        return [];
    }

    render() {
        const {
            comments,
            removeComment,
            postId
        } = this.props;

        const commentsList = this.getActiveComments(comments);

        return (
            <div >
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Comment.Group threaded>
                        <Header as='h3' dividing>{commentsList.length} Comments</Header>
                        {commentsList.map((item) => (
                            <If test={item.deleted === false} key={item.id}>
                                <Comment key={item.id}>
                                    <Comment.Avatar as='a' src={avatar} />
                                    <Comment.Content>
                                        <Comment.Author as='a'>{item.author}</Comment.Author>
                                        <Comment.Metadata>
                                            <span>{item.timestamp}</span>
                                        </Comment.Metadata>
                                        <Comment.Text>
                                            <p>{item.body}</p>
                                            <Vote
                                                itemId={item.id}
                                                number={item.voteScore}
                                                upVote={this.handleUpVoteCallback}
                                                downVote={this.handleDownVoteCallback} />
                                        </Comment.Text>
                                        <Comment.Actions>
                                            <a onClick={() => removeComment(item.id)}>Delete</a>
                                        </Comment.Actions>
                                        <Comment.Actions>
                                            <a onClick={() => this.openCommentEditor(item.id)}>Update</a>
                                        </Comment.Actions>
                                    </Comment.Content>
                                </Comment>
                            </If>
                        ))}
                        <CommentCreator postId={postId} />
                        <If test={this.state.showCommentEditor === true} >
                            <CommentEditor commentId={this.state.commentId} />
                        </If>
                    </Comment.Group>
                </div>
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
    comments: state.comments
});

function mapDispatchToProps(dispatch) {
    return {
        loadComments: (data) => dispatch(CommentActions.fetchCommentsByPostId(data)),
        removeComment: (data) => dispatch(CommentActions.deleteComment(data)),
        upVote: (data) => dispatch(CommentActions.upVotingComment(data)),
        downVote: (data) => dispatch(CommentActions.downVotingComment(data))
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Comments);
