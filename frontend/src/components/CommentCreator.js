import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as CommentActions from '../actions/CommentActions';
import CommentForm from './CommentForm';

class CommentCreator extends Component {

    static propTypes = {
        postId: PropTypes.string.isRequired
    };

    handleSubmit = (commentAuthor, commentBody) => {
        const commentId = Math.random().toString(36).substr(-8);
        const commentTimestamp = Date.now();

        const comment = {
            id: commentId,
            timestamp: commentTimestamp,
            body: commentBody,
            author: commentAuthor,
            parentId: this.props.postId,
            voteScore: 1,
            deleted: false
        };

        this.props.addComment(comment);
    }

    render() {
        return (
            <div >
                <CommentForm
                    commentAuthor=''
                    commentBody=''
                    handleSubmit={this.handleSubmit} />
            </div>
        )
    }
};

function mapDispatchToProps(dispatch) {
    return {
        addComment: (data) => dispatch(CommentActions.addNewComment(data))
    }
}
export default connect(null, mapDispatchToProps)(CommentCreator);
