import React, { Component } from 'react';
import * as UI from 'semantic-ui-react';
import Moment from 'react-moment';
import Vote from './Vote';
import PropTypes from 'prop-types';
import avatar from '../assets/images/avatar_placeholder.png';

class Comment extends Component {

    static propTypes = {
        comment: PropTypes.object.isRequired,
        handleUpVoteCallback: PropTypes.func.isRequired,
        handleDownVoteCallback: PropTypes.func.isRequired,
        removeComment: PropTypes.func.isRequired,
        openCommentEditor: PropTypes.func.isRequired
    };

    render() {
        const {
            comment,
            handleUpVoteCallback,
            handleDownVoteCallback,
            removeComment,
            openCommentEditor
         } = this.props;

        return (
            <div >
                <UI.Comment key={comment.id}>
                    <UI.Comment.Avatar as='a' src={avatar} />
                    <UI.Comment.Content>
                        <UI.Comment.Author as='a'>{comment.author}</UI.Comment.Author>
                        <UI.Comment.Metadata>
                            <Moment fromNow>{comment.timestamp}</Moment>
                        </UI.Comment.Metadata>
                    </UI.Comment.Content>
                    <UI.Comment.Text>
                        <p>{comment.body}</p>
                        <Vote
                            itemId={comment.id}
                            number={comment.voteScore}
                            upVote={handleUpVoteCallback}
                            downVote={handleDownVoteCallback} />
                    </UI.Comment.Text>
                    <UI.Comment.Actions>
                        <a onClick={() => removeComment(comment.id)}>Delete</a>
                    </UI.Comment.Actions>
                    <UI.Comment.Actions>
                        <a onClick={() => openCommentEditor(comment.id)}>Update</a>
                    </UI.Comment.Actions>
                </UI.Comment>
            </div>
        )
    };
};

export default Comment;
