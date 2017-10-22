import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Dropdown, Divider, Grid } from 'semantic-ui-react';
import * as PostActions from '../actions/PostActions';
import * as PostFormActions from '../actions/PostFormActions';

const VOTE_SCORE = 'Vote Score';
const CREATION_DATE = 'Creation Date';

const options = [
    { key: 1, text: VOTE_SCORE, value: 1 },
    { key: 2, text: CREATION_DATE, value: 2 }
];

class PostListHeader extends Component {

    handleSelectChange = (e, { value }) => {
        const { sortPostsByVote, sortPostsByDate } = this.props;

        const orderSelected = options.filter(item => item.value === value)[0].text;

        if (orderSelected === VOTE_SCORE) {
            sortPostsByVote();
        } else {
            sortPostsByDate();
        }
    };

    render() {
        return (
            <div>
                <Divider />
                <h1> Posts</h1>
                <Grid columns={2} container divided >
                    <Grid.Row>
                        <Grid.Column>
                            <Button primary onClick={()=> this.props.openPostForm(undefined)}>Create New Post</Button>
                        </Grid.Column>
                        <Grid.Column>
                            <Dropdown upward search selection
                                options={options}
                                placeholder={'Ordered by ' + VOTE_SCORE}
                                onChange={this.handleSelectChange} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Divider />
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
    posts: state.posts
});


function mapDispatchToProps(dispatch) {
    return {
        openPostForm: (data) => dispatch(PostFormActions.openForm(data)),
        sortPostsByDate: () => dispatch(PostActions.sortPostsByDate()),
        sortPostsByVote: () => dispatch(PostActions.sortPostsByVote())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PostListHeader);