import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'semantic-ui-react';
import CommentForm from './CommentForm';
import * as CommentActions from '../actions/CommentActions';
import * as CommentFormActions from '../actions/CommentFormActions';

class CommentEditor extends Component {

    state = {
        commentBody: '',
        commentAuthor: ''
    };

    handleSubmit = (commentAuthor, commentBody) => {
        const { comments, commentForm, updateComment } = this.props;
        const commentId = commentForm.commentId;
        const comment = this.getComment(comments, commentId);
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

    getComment = (comments, commentId) => {
        if (comments.items) {
            const comment = comments.items.filter(item => item.id === commentId)[0];
            if (comment) {
                return comment;
            }
        }
    };

    onModalClosed = () => {
        this.props.closeCommentForm();
    };

    render() {
        const { comments, commentForm } = this.props;
        return (
            <div >
                <Modal dimmer={'blurring'} open={commentForm.open} onClose={this.onModalClosed}>
                    <Modal.Header>Editing Comment</Modal.Header>
                    <Modal.Content>
                        <CommentForm
                            comment={this.getComment(comments, commentForm.commentId)}
                            handleSubmit={this.handleSubmit} />
                    </Modal.Content>
                </Modal>
            </div>
        )
    };
};

const mapStateToProps = (state) => ({
    comments: state.comments,
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
