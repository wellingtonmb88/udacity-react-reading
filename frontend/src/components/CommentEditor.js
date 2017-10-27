import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'semantic-ui-react';
import CommentForm from './CommentForm';
import PropTypes from 'prop-types';
import * as CommentActions from '../actions/CommentActions';
import * as CommentFormActions from '../actions/CommentFormActions';

class CommentEditor extends Component {

    state = {
        commentBody: '',
        commentAuthor: ''
    };

    static propTypes = {
        postId: PropTypes.string.isRequired
    };

    handleSubmit = (commentAuthor, commentBody) => {
        const { commentForm, updateComment } = this.props;
        const commentId = commentForm.commentId;
        const comment = this.getComment(commentId);
        const commentTimestamp = Date.now();

        const commentObject = {
            id: commentId,
            timestamp: commentTimestamp,
            body: commentBody,
            author: commentAuthor,
            parentId: comment.parentId,
            voteScore: comment.voteScore,
            deleted: false
        };

        updateComment(commentObject);
        this.onModalClosed();
    };

    getComment = (commentId) => {
        const comments = this.getCommentList();
        if (comments) {
            const comment = comments.filter(item => item.id === commentId)[0];
            if (comment) {
                return comment;
            }
        }
    };

    getCommentList() {
        const { postId, posts } = this.props;
        if (posts.items) {
            return posts.items.filter(post => post.id === postId && post.deleted === false)[0].comments.items;
        }
        return [];
    }

    onModalClosed = () => {
        this.props.closeCommentForm();
    };

    render() {
        const { commentForm } = this.props;
        return (
            <div >
                <Modal dimmer={'blurring'} open={commentForm.open} onClose={this.onModalClosed}>
                    <Modal.Header>Editing Comment</Modal.Header>
                    <Modal.Content>
                        <CommentForm
                            comment={this.getComment(commentForm.commentId)}
                            handleSubmit={this.handleSubmit} />
                    </Modal.Content>
                </Modal>
            </div>
        )
    };
};

const mapStateToProps = (state) => ({
    posts: state.posts,
    commentForm: state.commentForm
});

function mapDispatchToProps(dispatch) {
    return {
        updateComment: (data) => dispatch(CommentActions.editComment(data)),
        closeCommentForm: () => dispatch(CommentFormActions.closeForm())
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommentEditor);
