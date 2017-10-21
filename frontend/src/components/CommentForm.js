import React, { Component } from 'react';
import { Button, Input, Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class CommentForm extends Component {
    state = {
        body: '',
        author: ''
    };

    static propTypes = {
        commentAuthor: PropTypes.string.isRequired,
        commentBody: PropTypes.string.isRequired,
        handleSubmit: PropTypes.func.isRequired
    };

    componentDidMount() {
        const { commentBody, commentAuthor } = this.props;
        this.setState({ body: commentBody })
        this.setState({ author: commentAuthor })
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleSubmit = () => {
        const { body, author } = this.state
        this.props.handleSubmit(author, body);

        this.setState({ body: '' })
        this.setState({ author: '' })
    }

    render() {
        const { body, author } = this.state;
        return (
            <div >
                <Form reply onSubmit={this.handleSubmit}>
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

export default CommentForm;
