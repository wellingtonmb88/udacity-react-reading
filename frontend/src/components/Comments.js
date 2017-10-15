import React from 'react';
import { Button, Form, Header, Comment } from 'semantic-ui-react'
import avatar from '../assets/images/avatar_placeholder.png';
import Vote from './Vote';

export default function Comments({ commentsList }) {
    return (
        <div >
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Comment.Group threaded>
                    <Header as='h3' dividing>{commentsList.length} Comments</Header>
                    {commentsList.map((item) => (
                        <Comment key={item}>
                            <Comment.Avatar as='a' src={avatar} />
                            <Comment.Content>
                                <Comment.Author as='a'>{item.author}</Comment.Author>
                                <Comment.Metadata>
                                    <span>{item.date}</span>
                                </Comment.Metadata>
                                <Comment.Text>
                                    <p>{item.post}</p>
                                    <Vote number={item.vote} />
                                </Comment.Text>
                                <Comment.Actions>
                                    <a>Delete</a>
                                </Comment.Actions>
                            </Comment.Content>
                        </Comment>
                    ))}

                    <Form reply>
                        <Form.TextArea />
                        <Button content='Add Comment' labelPosition='left' icon='edit' primary />
                    </Form>
                </Comment.Group>
            </div>
        </div>
    )
};