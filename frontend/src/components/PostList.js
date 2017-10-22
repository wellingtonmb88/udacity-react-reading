import React, { Component } from 'react';
import { Image, List, Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import avatar from '../assets/images/avatar_placeholder.png';
import PostListHeader from './PostListHeader';
import Vote from './Vote';
import PostEditor from './PostEditor';
import * as PostActions from '../actions/PostActions';

class PostList extends Component {

    state = {
        openPostEditorScreen: false,
        postId: ''
    };

    componentDidMount() {
        this.props.loadPosts();
    };

    handleUpVoteCallback = (postId) => {
        this.props.upVote(postId);
    };

    handleDownVoteCallback = (postId) => {
        this.props.downVote(postId);
    };

    openPostEditor = (postId) => {
        console.log("Open PostEditor Id: " + postId);

        // this.setState({ openPostEditorScreen: true });
        // this.setState({ postId });
    };

    getActivePosts() {
        const { posts } = this.props;
        if (posts.items !== undefined) {
            return posts.items.filter(item => item.deleted === false);
        }
        return [];
    };

    onModalClosed = () => {
        this.setState({ openPostEditorScreen: false });
    };

    render() {
        const { openPostEditorScreen, postId } = this.state;
        return (
            <div>
                <PostListHeader />
                <List animated verticalAlign='middle'>
                    {this.getActivePosts().map((item) => (
                        <List.Item key={item.id} onClick={() => this.openPostEditor(item.id)}>
                            <Image avatar src={avatar} />
                            <List.Content>
                                <List.Header as='a'>{item.title}</List.Header>
                                <List.Content>{item.body}</List.Content>
                                <Vote
                                    itemId={item.id}
                                    number={item.voteScore}
                                    upVote={this.handleUpVoteCallback}
                                    downVote={this.handleDownVoteCallback} />
                            </List.Content>
                        </List.Item>
                    ))}
                </List>
                <Modal open={openPostEditorScreen} onClose={this.onModalClosed}>
                    <PostEditor postId={postId} />
                </Modal>
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
    posts: state.posts
});

function mapDispatchToProps(dispatch) {
    return {
        loadPosts: () => dispatch(PostActions.fetchPosts()),
        removePost: (data) => dispatch(PostActions.deletePost(data)),
        upVote: (data) => dispatch(PostActions.upVotingPost(data)),
        downVote: (data) => dispatch(PostActions.downVotingPost(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PostList);