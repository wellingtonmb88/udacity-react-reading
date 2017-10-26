import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Comment } from 'semantic-ui-react';
import CommentCreator from './CommentCreator';
import CommentEditor from './CommentEditor';
import CommentJS from './Comment';
import If from './If.js';
import PropTypes from 'prop-types';
import * as CommentActions from '../actions/CommentActions';
import * as CommentFormActions from '../actions/CommentFormActions';

class CommentList extends Component {

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
        this.props.openCommentForm(commentId);
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
                <Header as='h3' dividing>{commentsList.length} Comments</Header>
                <Comment.Group threaded>
                    {commentsList.map((item) => (
                        <If test={item.deleted === false} key={item.id}>
                            <CommentJS
                            comment={item}
                            handleUpVoteCallback={this.handleUpVoteCallback}
                            handleDownVoteCallback={this.handleDownVoteCallback}
                            removeComment={removeComment}
                            openCommentEditor={this.openCommentEditor}
                            />
                        </If>
                    ))}
                    <CommentCreator postId={postId} />
                    <CommentEditor />
                </Comment.Group>
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
    comments: state.comments
});

function mapDispatchToProps(dispatch) {
    return {
        openCommentForm: (data) => dispatch(CommentFormActions.openForm(data)),
        loadComments: (data) => dispatch(CommentActions.fetchCommentsByPostId(data)),
        removeComment: (data) => dispatch(CommentActions.deleteComment(data)),
        upVote: (data) => dispatch(CommentActions.upVotingComment(data)),
        downVote: (data) => dispatch(CommentActions.downVotingComment(data))
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommentList);
