import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as CommentActions from '../actions/CommentActions';
import CommentForm from './CommentForm';

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

    componentWillMount() {
        const { commentId, comments } = this.props;
        const comment = comments.items.filter(item => item.id === commentId)[0];

        this.setState({ commentBody: comment.body });
        this.setState({ commentAuthor: comment.author });
        this.setState({ parentId: comment.parentId });
        this.setState({ voteScore: comment.voteScore });
    }

    handleSubmit = (commentAuthor, commentBody) => {
        const { parentId, voteScore } = this.state
        const { commentId, updateComment } = this.props;
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
    }

    render() {
        const { commentBody, commentAuthor } = this.state;
        return (
            <div >
                <CommentForm
                    commentAuthor={commentAuthor}
                    commentBody={commentBody}
                    handleSubmit={this.handleSubmit} />
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
    comments: state.comments
});

function mapDispatchToProps(dispatch) {
    return {
        updateComment: (data) => dispatch(CommentActions.editComment(data))
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommentEditor);
