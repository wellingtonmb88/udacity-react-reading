import React, { Component } from 'react';
import { Button, Input, Form, Header, Comment } from 'semantic-ui-react'
import avatar from '../assets/images/avatar_placeholder.png';
import Vote from './Vote';
import { connect } from 'react-redux';
import * as CommentActions from '../actions/CommentActions';
import PropTypes from 'prop-types';

class Comments extends Component {

    state = {
        commentBody: '',
        commentAuthor: ''
    };

    static propTypes = {
        commentsList: PropTypes.array.isRequired,
        postId: PropTypes.string.isRequired
    };

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleSubmit = () => {
        const { commentBody, commentAuthor } = this.state
        const commentId = Math.random().toString(36).substr(-8);
        const commentTimestamp = Date.now();

        const comment = {
            id: commentId,
            timestamp: commentTimestamp,
            body: commentBody,
            author: commentAuthor,
            parentId: this.props.postId
        };
        this.props.addComment({ comment });

        this.setState({ commentBody: '' })
        this.setState({ commentAuthor: '' })
    }

    render() {
        console.log('Props - comments', this.props);
        const { commentsList } = this.props;
        const { commentBody, commentAuthor } = this.state;
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
                                        <span>{item.date}</span>
                                    </Comment.Metadata>
                                    <Comment.Text>
                                        <p>{item.post}</p>
                                        <Vote number={item.vote} />
                                    </Comment.Text>
                                    <Comment.Actions>
                                        <a onClick={() => this.props.removeComment(item.id)}>Delete</a>
                                    </Comment.Actions>
                                </Comment.Content>
                            </Comment>
                        ))}

                        <Form reply onSubmit={this.handleSubmit}>
                            <Form.Field
                                control={Input}
                                label='Author'
                                name='commentAuthor'
                                value={commentAuthor}
                                placeholder='Author name'
                                onChange={this.handleChange} />
                            <Form.TextArea
                                name='commentBody'
                                value={commentBody}
                                onChange={this.handleChange} />
                            <Button
                                content='Add Comment'
                                labelPosition='left'
                                icon='edit'
                                primary />
                        </Form>
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
        addComment: (data) => dispatch(CommentActions.addComment(data)),
        removeComment: (data) => dispatch(CommentActions.removeComment(data))
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Comments);
