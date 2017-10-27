import React, { Component } from 'react';
import { Image, Card, Button } from 'semantic-ui-react';
import Moment from 'react-moment';
import avatar from '../assets/images/avatar_placeholder.png';
import PropTypes from 'prop-types';
import Vote from './Vote';
import If from './If.js';

class PostCard extends Component {

    state = {
        numOfComments: 0
    };

    static propTypes = {
        post: PropTypes.object.isRequired,
        handleUpVoteCallback: PropTypes.func.isRequired,
        handleDownVoteCallback: PropTypes.func.isRequired,
        openPostEditor: PropTypes.func.isRequired,
        deletePost: PropTypes.func.isRequired,
        goToPostDetails: PropTypes.func.isRequired
    };

    render() {
        const {
            post,
            handleUpVoteCallback,
            handleDownVoteCallback,
            openPostEditor,
            deletePost,
            goToPostDetails
        } = this.props;

        const numComments = post.comments !== undefined ? post.comments.items.length : 0;
        return (
            <div className="post-card">
                <Card.Group itemsPerRow={1}>
                    <Card fluid key={post.id}>
                        <Card.Content>
                            <div style={{ marginBottom: '10px' }}>
                                <Image avatar src={avatar} />
                            </div>
                            <Card.Header>
                                {post.title}
                            </Card.Header>
                            <Card.Meta>
                                <Moment fromNow>{post.timestamp}</Moment>
                            </Card.Meta>
                            <Card.Description>
                                {post.body}
                                <div>
                                    <If test={numComments > 0}>
                                        <h4>Comments: {numComments}</h4>
                                    </If>
                                </div>
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <Vote
                                itemId={post.id}
                                number={post.voteScore}
                                upVote={handleUpVoteCallback}
                                downVote={handleDownVoteCallback} />
                            <div className='ui three buttons'>
                                <Button basic color='green'
                                    onClick={() => openPostEditor(post.id)}>Edit</Button>
                                <Button basic color='red'
                                    onClick={() => deletePost(post.id)} >Delte</Button>
                                <Button basic color='blue'
                                    onClick={() => goToPostDetails(post.id, post.category)} >Details</Button>
                            </div>
                        </Card.Content>
                    </Card>
                </Card.Group >
            </div>
        )
    }
};

export default PostCard;
