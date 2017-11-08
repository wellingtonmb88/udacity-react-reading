import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class CommentForm extends Component {
    state = {
        body: '',
        author: '',
        disableSubButton: true
    };

    static propTypes = {
        comment: PropTypes.object,
        handleSubmit: PropTypes.func.isRequired
    };

    componentDidMount() {
        const { comment } = this.props;
        if (comment) {
            this.setState({
                body: comment.body,
                author: comment.author,
                disableSubButton: false
            });
        }
    };

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({ [name]: value },
            () => { this.validateFields() });
    }

    validateFields = () => {
        const { author, body } = this.state;
        if (body === undefined || author === undefined) {
            this.setState({ disableSubButton: true });
            return;
        }
        if (author.length > 0 && body.length > 0) {
            this.setState({ disableSubButton: false });
        } else if (author.length < 1 || body.length < 1) {
            this.setState({ disableSubButton: true });
        }
    };

    handleSubmit = () => {
        const { body, author } = this.state
        this.props.handleSubmit(author, body);
        this.setState({ body: '', author: '', disableSubButton: true });
    };

    render() {
        const { author, body } = this.state;
        return (
            <div >
                <Form reply >
                    <Form.Input
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
                        disabled={this.state.disableSubButton}
                        onClick={this.handleSubmit} />
                </Form>
            </div>
        )
    }
};

export default CommentForm;
