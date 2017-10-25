import React, { Component } from 'react';
import { Image, Card, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import Moment from 'react-moment';
import avatar from '../assets/images/avatar_placeholder.png';
import PostListHeader from './PostListHeader';
import Vote from './Vote';
import PostEditor from './PostEditor';
import PostCreator from './PostCreator';
import If from './If';
import * as PostActions from '../actions/PostActions';
import * as PostFormActions from '../actions/PostFormActions';

class PostList extends Component {

    componentDidMount() {
        this.props.loadPosts();
    };

    handleUpVoteCallback = (postId) => {
        this.props.upVote(postId);
    };

    handleDownVoteCallback = (postId) => {
        this.props.downVote(postId);
    };

    openPostEditor = (postId, category) => {
        this.props.openPostForm(postId);
    };

    getActivePosts() {
        const { posts } = this.props;
        if (posts.items !== undefined) {
            return posts.items.filter(item => item.deleted === false);
        }
        return [];
    };

    render() {
        const { postForm } = this.props;
        return (
            <div>
                <PostListHeader />
                <Card.Group itemsPerRow={1}>
                    {this.getActivePosts().map((item) => (
                        <Card fluid={false} key={item.id}>
                            <Card.Content>
                                <Image avatar src={avatar} />
                                <Card.Header>
                                    {item.title}
                                </Card.Header>
                                <Card.Meta>
                                    <Moment fromNow>{item.timestamp}</Moment>
                                </Card.Meta>
                                <Card.Description>
                                    {item.body}
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <div style={{ marginBottom: '10px' }}>
                                    <Vote
                                        itemId={item.id}
                                        number={item.voteScore}
                                        upVote={this.handleUpVoteCallback}
                                        downVote={this.handleDownVoteCallback} />
                                </div>
                                <div className='ui two buttons'>
                                    <Button basic color='green'
                                        onClick={() => this.openPostEditor(item.id)}>Edit</Button>
                                    <Button basic color='blue'
                                        onClick={() => this.props.goToPostDetails(item.id, item.category)} >Details</Button>
                                </div>
                            </Card.Content>
                        </Card>
                    ))}
                </Card.Group>
                <If test={postForm.open && postForm.postId !== undefined}>
                    <PostEditor />
                </If>
                <If test={postForm.open && postForm.postId === undefined}>
                    <PostCreator />
                </If>
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
    posts: state.posts,
    postForm: state.postForm
});

function mapDispatchToProps(dispatch) {
    return {
        goToPostDetails: (postId, category) => dispatch(routerActions.push('/' + category + '/' + postId)),
        openPostForm: (data) => dispatch(PostFormActions.openForm(data)),
        loadPosts: () => dispatch(PostActions.fetchPosts()),
        removePost: (data) => dispatch(PostActions.deletePost(data)),
        upVote: (data) => dispatch(PostActions.upVotingPost(data)),
        downVote: (data) => dispatch(PostActions.downVotingPost(data))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PostList);