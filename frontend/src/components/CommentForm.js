import React, { Component } from 'react';
import { Button, Input, Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as CommentFormActions from '../actions/CommentFormActions';

class CommentForm extends Component {
    state = {
        body: '',
        author: '',
        date: 0
    };

    static propTypes = {
        handleSubmit: PropTypes.func.isRequired
    };

    componentDidMount() {
        const { commentForm, comments } = this.props;
        if (comments.items) {
            const commentId = commentForm.commentId;
            const comment = comments.items.filter(item => item.id === commentId)[0];

            if (comment) {
                this.setState({ author: comment.author });
                this.setState({ body: comment.body });
            }
        }
    };

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleSubmit = () => {
        const { body, author } = this.state
        this.props.handleSubmit(author, body);

        this.setState({ body: '' });
        this.setState({ author: '' });
    };

    onModalClosed = () => {
        this.props.closeCommentForm();
    };

    render() {
        const { author, body } = this.state;

        return (
            <div >
                <Form reply >
                    <Form.Field
                        control={Input}
                        label='Author'
                        name='author'
                        value={author}
                        placeholder='Author name'
                        onChange={this.handleChange} />
                    <Form.TextArea
                        name='body'
                        value={body}
                        onChange={this.handleChange} />
                    <Button positive
                        content="Save"
                        onClick={this.handleSubmit} />
                </Form>
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
    comments: state.comments,
    commentForm: state.commentForm
});

function mapDispatchToProps(dispatch) {
    return {
        closeCommentForm: () => dispatch(CommentFormActions.closeForm())
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommentForm);
