import React from 'react';
import { Button, Grid, Segment, Label } from 'semantic-ui-react';
import Vote from './Vote';
import Comments from './Comments';

const commentsList = [{author:"wellington", date: "2017-10-19", vote:"50"},
{author:"wellington", date: "2017-10-19", vote:"50"},
{author:"wellington", date: "2017-10-19", vote:"50"}];

export default function PostDetails({ list }) {
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
                            <Vote number="5" />
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Comments commentsList={commentsList} />
        </div>
    )
};