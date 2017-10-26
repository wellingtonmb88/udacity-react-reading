import React, { Component } from 'react';
import { Image, Card, Button } from 'semantic-ui-react';
import Moment from 'react-moment';
import avatar from '../assets/images/avatar_placeholder.png';
import PropTypes from 'prop-types';
import Vote from './Vote';

class PostCard extends Component {

    static propTypes = {
        post: PropTypes.object.isRequired,
        handleUpVoteCallback: PropTypes.func.isRequired,
        handleDownVoteCallback: PropTypes.func.isRequired,
        openPostEditor: PropTypes.func.isRequired,
        goToPostDetails: PropTypes.func.isRequired
    };

    render() {
        const {
            post,
            handleUpVoteCallback,
            handleDownVoteCallback,
            openPostEditor,
            goToPostDetails
        } = this.props;

        return (
            <div >
                <Card fluid={false} key={post.id}>
                    <Card.Content>
                        <Image avatar src={avatar} />
                        <Card.Header>
                            {post.title}
                        </Card.Header>
                        <Card.Meta>
                            <Moment fromNow>{post.timestamp}</Moment>
                        </Card.Meta>
                        <Card.Description>
                            {post.body}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <div style={{ marginBottom: '10px' }}>
                            <Vote
                                itemId={post.id}
                                number={post.voteScore}
                                upVote={handleUpVoteCallback}
                                downVote={handleDownVoteCallback} />
                        </div>
                        <div className='ui two buttons'>
                            <Button basic color='green'
                                onClick={() => openPostEditor(post.id)}>Edit</Button>
                            <Button basic color='blue'
                                onClick={() => goToPostDetails(post.id, post.category)} >Details</Button>
                        </div>
                    </Card.Content>
                </Card>
            </div>
        )
    }
};

export default PostCard;
