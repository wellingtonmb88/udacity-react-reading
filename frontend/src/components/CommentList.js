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

    handleUpVoteCallback = (comment) => {
        this.props.upVote(comment)
    };

    handleDownVoteCallback = (comment) => {
        this.props.downVote(comment)
    };

    openCommentEditor = (commentId) => {
        this.props.openCommentForm(commentId);
    }

    getCommentList() {
        const { postId, posts } = this.props;
        if (posts.items) {
            return posts.items.filter(post => post.id === postId && post.deleted === false)[0]
                .comments.items.filter(comment => comment.deleted === false);
        }
        return [];
    }

    render() {
        const {
            removeComment,
            postId
        } = this.props;

        const commentsList = this.getCommentList();

        return (
            <div >
                <Header as='h3' dividing>{commentsList.length} Comments</Header>
                <Comment.Group threaded>
                    {commentsList.map((item) => (
                        <If test={item !== undefined} key={item !== undefined ? item.id : 0}>
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
                    <CommentEditor postId={postId} />
                </Comment.Group>
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
    posts: state.posts
});

function mapDispatchToProps(dispatch) {
    return {
        openCommentForm: (data) => dispatch(CommentFormActions.openForm(data)),
        removeComment: (data) => dispatch(CommentActions.deleteComment(data)),
        upVote: (data) => dispatch(CommentActions.upVotingComment(data)),
        downVote: (data) => dispatch(CommentActions.downVotingComment(data))
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommentList);
