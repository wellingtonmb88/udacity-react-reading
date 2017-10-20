import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Comment } from 'semantic-ui-react';
import avatar from '../assets/images/avatar_placeholder.png';
import Vote from './Vote';
import CommentForm from './CommentForm';
import PropTypes from 'prop-types';
import * as CommentActions from '../actions/CommentActions';

class Comments extends Component {

    static propTypes = {
        commentsList: PropTypes.array.isRequired,
        postId: PropTypes.string.isRequired
    };

    handleUpVoteCallback = (commentId) => {
        this.props.upVote({ commentId })
    };

    handleDownVoteCallback = (commentId) => {
        this.props.downVote({ commentId })
    };

    render() {
        const {
            commentsList,
            removeComment,
            postId
        } = this.props;

        return (
            <div >
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Comment.Group threaded>
                        <Header as='h3' dividing>{commentsList.length} Comments</Header>
                        {commentsList.map((item) => (
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
                                </Comment.Content>
                            </Comment>
                        ))}
                        <CommentForm postId={postId} />
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
        removeComment: (data) => dispatch(CommentActions.removeComment(data)),
        upVote: (data) => dispatch(CommentActions.upVoteComment(data)),
        downVote: (data) => dispatch(CommentActions.downVoteComment(data))
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Comments);
