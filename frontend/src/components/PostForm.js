import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import * as CategoryActions from '../actions/CategoryActions';

class PostForm extends Component {

    state = {
        body: '',
        author: '',
        title: '',
        category: 'Category',
        date: '',
        options: []
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
        const { postBody, postAuthor, postTitle, postCategory, postDate, categories } = this.props;

        if (categories.items) {
            let options = [];
            let index = 1;
            categories.items.map(category => {
                options.push({ key: index, text: category.name, value: index });
                index++;
            });

            this.setState({ options });
        }

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
        const { categories } = this.props;
        const categorySelected = categories.items.filter(item => item.name === value)[0].text;
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
        const { date, author, title, body, category, options } = this.state;
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
    categories: state.categories
});

export default connect(
    mapStateToProps
)(PostForm);