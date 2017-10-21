import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import * as PostActions from '../actions/PostActions';

const options = [
    { key: 1, text: 'Redux', value: 1 },
    { key: 2, text: 'React', value: 2 },
    { key: 3, text: 'Udacity', value: 3 }
];

class PostForm extends Component {

    state = {
        body: '',
        author: '',
        title: '',
        category: 'Category',
        date: ''
    };

    static propTypes = {
        postAuthor: PropTypes.string.isRequired,
        postBody: PropTypes.string.isRequired,
        postTitle: PropTypes.string.isRequired,
        postCategory: PropTypes.string.isRequired,
        postDate: PropTypes.string.isRequired,
        handleSubmit: PropTypes.func.isRequired
    };

    componentDidMount() {
        const { postBody, postAuthor, postTitle, postCategory, postDate } = this.props;
        this.setState({ body: postBody });
        this.setState({ author: postAuthor });
        this.setState({ title: postTitle });
        this.setState({ date: postDate });
        if (postCategory) {
            this.setState({ category: postCategory });
        }
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleSelectChange = (e, { value }) => {
        const categorySelected = options.filter(item => item.value === value)[0].text;
        this.setState({ category: categorySelected });
    }

    handleSubmit = () => {
        const { body, author, title, category } = this.state
        this.props.handleSubmit(author, title, body, category);

        this.setState({ body: '' });
        this.setState({ author: '' });
        this.setState({ title: '' });
        this.setState({ category: '' });
        this.setState({ date: '' });
    }

    render() {
        const { date, author, title, body, category } = this.state;
        return (
            <div>
                <div style={{ justifyContent: 'center' }}>
                    <Form loading={false} reply onSubmit={this.handleSubmit}>
                        <Form.Group unstackable widths={3}>
                            <Label size={'medium'}>{date}</Label>
                            <Form.Input
                                label='Author'
                                name='author'
                                value={author}
                                placeholder='Author name'
                                onChange={this.handleChange} />
                            <Form.Input
                                label='Title'
                                name='title'
                                value={title}
                                placeholder='Title'
                                onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Select
                            options={options}
                            placeholder={category}
                            error={false}
                            onChange={this.handleSelectChange} />
                        <Form.TextArea
                            label='Post'
                            placeholder='Post'
                            name='body'
                            value={body}
                            onChange={this.handleChange} />
                        <Button positive>Save</Button>
                    </Form>
                </div>
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
    posts: state.posts
});

function mapDispatchToProps(dispatch) {
    return {
        addPost: (data) => dispatch(PostActions.addPost(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PostForm);

