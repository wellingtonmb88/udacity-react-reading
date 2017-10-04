import React from 'react';
import { List } from 'semantic-ui-react';

export default function CategoryList({ list }) {
    return (
        <div>
            <h1>Categories</h1>
            <List horizontal relaxed>
                {list.map((item) => (
                    <List.Item key={item}>
                        <List.Content>
                            <List.Header as='a'>{item}</List.Header>
                        </List.Content>
                    </List.Item>
                ))}
            </List>
        </div>
    )
};