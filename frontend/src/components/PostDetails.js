import React, { Component } from 'react';
import { Button, Grid, Segment, Label } from 'semantic-ui-react';
import Vote from './Vote';
import Comments from './Comments';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as PostActions from '../actions/PostActions';

const commentsList = [{ id: "1", author: "wellington", date: "2017-10-19", vote: "50" },
{ id: "2", author: "wellington", date: "2017-10-19", vote: "50" },
{ id: "3", author: "wellington", date: "2017-10-19", vote: "50" }];

class PostDetails extends Component {

    static propTypes = {
        postId: PropTypes.string
    };

    render() {
        const { comments, postId } = this.props;
        return (
            <div>
                <Grid columns={1} centered>
                    <Grid.Row>
                        <Grid.Column width={3}>
                            <Segment raised>
                                <Label as='a' color='red' ribbon>Post Details</Label>
                                <Button primary>Edit Post</Button>

                                <div>
                                    <Label color='red' horizontal>Title</Label> <span>Kumquats</span>
                                </div>

                                <div>
                                    <Label color='green' horizontal>Body</Label> <span>Kumquats</span>
                                </div>

                                <div>
                                    <Label color='blue' horizontal>Date</Label> <span>Kumquats</span>
                                </div>

                                <div>
                                    <Label color='yellow' horizontal>Author</Label> <span>Kumquats</span>
                                </div>
                                {/* <Vote number="5" /> */}
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Comments postId={postId} />
            </div>
        )
    }
};
const mapStateToProps = (state) => ({
    posts: state.posts,
    comments: state.comments
});

function mapDispatchToProps(dispatch) {
    return {
        addPost: (data) => dispatch(PostActions.addNewPost(data)),
        removePost: (data) => dispatch(PostActions.deletePost(data))
    }
}
export default connect(mapStateToProps)(PostDetails);