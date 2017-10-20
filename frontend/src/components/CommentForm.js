import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Input, Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import * as CommentActions from '../actions/CommentActions';

class CommentForm extends Component {

    state = {
        commentBody: '',
        commentAuthor: ''
    };

    static propTypes = {
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
            parentId: this.props.postId,
            voteScore: 0,
            deleted: false
        };
        this.props.addComment({ comment });

        this.setState({ commentBody: '' })
        this.setState({ commentAuthor: '' })
    }

    render() {
        const { commentBody, commentAuthor } = this.state;
        return (
            <div >
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
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
    comments: state.comments
});

function mapDispatchToProps(dispatch) {
    return {
        addComment: (data) => dispatch(CommentActions.addComment(data))
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommentForm);
