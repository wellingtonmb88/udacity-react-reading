import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Input, Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import * as CommentActions from '../actions/CommentActions';

class CommentEditor extends Component {

    state = {
        commentBody: '',
        commentAuthor: '',
        parentId: '',
        voteScore: 0
    };

    static propTypes = {
        commentId: PropTypes.string
    };

    componentDidMount() {
        const { commentId, comments } = this.props;
        const comment = comments[commentId];
        this.setState({ commentBody: comment.body});
        this.setState({ commentAuthor: comment.author});
        this.setState({ parentId: comment.parentId});
        this.setState({ voteScore: comment.voteScore});
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleSubmit = () => {
        const { commentBody, commentAuthor, parentId, voteScore } = this.state
        const { commentId, updateComment } = this.props;
        const commentTimestamp = Date.now();

        const comment = {
            id: commentId,
            timestamp: commentTimestamp,
            body: commentBody,
            author: commentAuthor,
            parentId: parentId,
            voteScore: voteScore,
            deleted: false
        };

        updateComment({ comment });
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
                        content='Update Comment'
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
        updateComment: (data) => dispatch(CommentActions.updateComment(data))
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommentEditor);
