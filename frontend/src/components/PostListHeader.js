import React from 'react';
import { Button, Dropdown, Divider, Grid } from 'semantic-ui-react';

const options = [
    { key: 1, text: 'Vote Score', value: 1 },
    { key: 2, text: 'Creation Date', value: 2 }
  ];

export default function PostListHeader() {
    return (
        <div>
            <Divider />
            <h1> Posts</h1>
            <Grid columns={2} container divided >
                <Grid.Row>
                    <Grid.Column>
                        <Button primary>Create New Post</Button>
                    </Grid.Column>
                    <Grid.Column>
                        <Dropdown upward search selection options={options} placeholder='Ordered by Vote Score' />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Divider />
        </div>
    )
};