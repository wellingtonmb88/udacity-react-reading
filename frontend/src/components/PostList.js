import React from 'react';
import { Image, List } from 'semantic-ui-react';
import avatar from '../assets/images/avatar_placeholder.png';
import PostListHeader from './PostListHeader';
import Vote from './Vote';

export default function PostList({ list }) {
    return (
        <div>
            <PostListHeader />
            <List animated verticalAlign='middle'>
                {list.map((item) => (
                    <List.Item key={item}>
                        <Image avatar src={avatar} />
                        <List.Content>
                            <List.Header as='a'>{item}</List.Header>
                            <Vote number="5"/>
                        </List.Content>
                    </List.Item>
                ))}
            </List>
        </div>
    )
};