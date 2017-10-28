import React, { Component } from 'react';
import { Button, Grid, Segment, Label } from 'semantic-ui-react';
import Moment from 'react-moment';
import Vote from './Vote';
import PropTypes from 'prop-types';

const margin10px = '10px';

class PostGrid extends Component {

    static propTypes = {
        post: PropTypes.object.isRequired,
        handleUpVoteCallback: PropTypes.func.isRequired,
        handleDownVoteCallback: PropTypes.func.isRequired,
        deletePost: PropTypes.func.isRequired,
        openPostEditor: PropTypes.func.isRequired
    };

    render() {
        const {
            post,
            deletePost,
            openPostEditor,
            handleUpVoteCallback,
            handleDownVoteCallback
            } = this.props;

        return (
            <div
                style={{
                    width: '500px',
                    height: '350px',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}>
                <Grid  >
                    <Grid.Row>
                        <Grid.Column >
                            <Segment raised>
                                <Label as='a' color='blue' ribbon
                                    floated="update"
                                    size="large"
                                    onClick={() => openPostEditor(post.id)} >Update</Label>
                                <Button as='a' color='red'
                                    floated="right"
                                    onClick={() => deletePost(post.id)} >Delete</Button>
                                <Segment>
                                    <div style={{ marginBottom: margin10px }}>
                                        <Label color='yellow' horizontal>Author</Label> <span><b>{post.author}</b></span>
                                    </div>
                                    <div style={{ marginBottom: margin10px }}>
                                        <Label color='red' horizontal>Title</Label> <span><b>{post.title}</b></span>
                                    </div>
                                    <div style={{ marginBottom: margin10px }}>
                                        <Label color='green' horizontal>Body</Label> <span><b>{post.body}</b></span>
                                    </div>
                                    <div style={{ marginBottom: margin10px }}>
                                        <Label color='green' horizontal>Date</Label> <b><Moment fromNow>{post.timestamp}</Moment></b>
                                    </div>
                                    <div style={{ marginBottom: margin10px }}>
                                        <Label color='blue' horizontal>Category</Label> <span><b>{post.category}</b></span>
                                    </div>
                                    <Vote
                                        itemId={post.id !== undefined ? post.id : ''}
                                        number={post.voteScore !== undefined ? post.voteScore : 0}
                                        upVote={handleUpVoteCallback}
                                        downVote={handleDownVoteCallback} />
                                </Segment>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
};

export default PostGrid;