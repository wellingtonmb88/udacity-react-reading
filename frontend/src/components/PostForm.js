import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { Button, Form, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import If from './If';
import * as PostFormActions from '../actions/PostFormActions';
import * as Utils from '../utils/Utils';

export class PostForm extends Component {

    state = {
        body: '',
        author: '',
        title: '',
        category: 'Category',
        date: '',
        options: [],
        disableSubButton: true
    };

    static propTypes = {
        handleSubmit: PropTypes.func.isRequired
    };

    componentDidMount() {
        const { postForm, posts, categories } = this.props;
        const postId = postForm !== undefined ? postForm.postId : '';

        if (categories) {
            this.createOptionsForDropDown(categories.items);
        }

        if (posts !== undefined && posts.items) {
            const post = posts.items.filter(item => item.id === postId)[0];

            if (post) {
                this.setState({ body: post.body });
                this.setState({ author: post.author });
                this.setState({ title: post.title });
                this.setState({ date: post.timestamp });
                this.setState({ category: post.category });
            }
        }
    };

    createOptionsForDropDown = (categoryList) => {
        if (categoryList) {
            let options = [];
            let index = 1;
            categoryList.forEach(category => {
                const categoryCapitalized = Utils.capitalize(category.name)
                options.push({ key: index, text: categoryCapitalized, value: category.name });
                index++;
            });

            this.setState({ options });
        }
    };

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({ [name]: value },
            () => { this.validateFields() });
    }

    handleSelectChange = (e, { value }) => {
        const { categories } = this.props;
        const categorySelected = categories.items.filter(item => item.name === value)[0];
        this.setState({ category: categorySelected.name });
        this.setState({ category: categorySelected.name },
            () => { this.validateFields() });
    };

    validateFields = () => {
        const { author, body, title, category } = this.state;
        if (body === undefined || title === undefined
            || author === undefined) {
            this.setState({ disableSubButton: true });
            return;
        }
        if (author.length > 0 && title.length > 0
            && body.length > 0 && category !== 'Category') {
            this.setState({ disableSubButton: false });
        } else if (author.length < 1 || title.length < 1
            || body.length < 1 || category === 'Category') {
            this.setState({ disableSubButton: true });
        }
    };

    handleSubmit = () => {
        const { body, author, title, category } = this.state
        this.props.handleSubmit(author, title, body, category);
        this.props.closePostForm();

        this.setState({ body: '' });
        this.setState({ author: '' });
        this.setState({ title: '' });
        this.setState({ category: '' });
        this.setState({ date: '' });
    };

    onModalClosed = () => {
        this.props.closePostForm();
    };

    render() {
        const { date, author, title, body, category, options } = this.state;
        const { postForm } = this.props;
        return (
            <div>
                <div style={{ justifyContent: 'center' }}>
                    <Modal dimmer={'blurring'} open={postForm !== undefined ? postForm.open : false} onClose={this.onModalClosed}>
                        <If test={date > 0}>
                            <Modal.Header>Editing Post | Created at: <Moment fromNow>{date}</Moment> </Modal.Header>
                        </If>
                        <If test={date < 1}>
                            <Modal.Header>Creating Post</Modal.Header>
                        </If>
                        <Modal.Content>
                            <Form loading={false} reply>
                                <Form.Group unstackable widths={2}>
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
                                    placeholder={Utils.capitalize(category)}
                                    error={false}
                                    onChange={this.handleSelectChange} />
                                <Form.TextArea
                                    label='Post'
                                    placeholder='Post'
                                    name='body'
                                    value={body}
                                    onChange={this.handleChange} />
                            </Form>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button color='black'
                                content="Cancel"
                                onClick={this.onModalClosed} />
                            <Button positive
                                content="Save"
                                disabled={this.state.disableSubButton}
                                onClick={this.handleSubmit} />
                        </Modal.Actions>
                    </Modal>
                </div>
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
    posts: state.posts,
    categories: state.categories,
    postForm: state.postForm
});

function mapDispatchToProps(dispatch) {
    return {
        closePostForm: () => dispatch(PostFormActions.closeForm())
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostForm);