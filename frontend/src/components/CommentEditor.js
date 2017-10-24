import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import CommentForm from './CommentForm';
import * as CommentActions from '../actions/CommentActions';
import * as CommentFormActions from '../actions/CommentFormActions';

class CommentEditor extends Component {

    state = {
        commentBody: '',
        commentAuthor: '',
        parentId: '',
        voteScore: 0
    };

    static propTypes = {
        commentId: PropTypes.string
    };

    componentDidMount() {
        const { comments, commentForm } = this.props;
        if (comments.items) {
            const commentId = commentForm.commentId;
            const comment = comments.items.filter(item => item.id === commentId)[0];

            if (comment) {
                this.setState({ author: comment.author });
                this.setState({ body: comment.body });
                this.setState({ parentId: comment.parentId });
                this.setState({ voteScore: comment.voteScore });
            }
        }
    };

    handleSubmit = (commentAuthor, commentBody) => {
        const { parentId, voteScore } = this.state
        const { commentForm, updateComment } = this.props;
        const commentId = commentForm.commentId;
        const commentTimestamp = Date.now();

        const comment = {
            id: commentId,
            timestamp: commentTimestamp,
            body: commentBody,
            author: commentAuthor,
            parentId: parentId,
            voteScore: voteScore,
            deleted: false
        };

        updateComment(comment);
        this.onModalClosed();
    };

    onModalClosed = () => {
        this.props.closeCommentForm();
    };

    render() {
        return (
            <div >
                <Modal dimmer={'blurring'} open={this.props.commentForm.open} onClose={this.onModalClosed}>
                    <Modal.Header>Editing Comment</Modal.Header>
                    <Modal.Content>
                        <CommentForm
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
