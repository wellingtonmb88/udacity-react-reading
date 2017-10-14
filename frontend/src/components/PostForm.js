import React from 'react'
import { Button, Form } from 'semantic-ui-react'

const options = [
    { key: 1, text: 'Redux', value: 1 },
    { key: 2, text: 'React', value: 2 },
    { key: 3, text: 'Udacity', value: 3 }
];

export default function PostForm({ post }) {
    return (
        <div>
            <Form loading={false}>
                <Form.Group unstackable widths={3}>
                    <Form.Input label='Date' placeholder={Date.now()} />
                    <Form.Input label='Author' placeholder='Author' />
                    <Form.Input label='Title' placeholder='Title' />
                </Form.Group>
                <Form.Select options={options} placeholder='Category' error={false} />
                <Form.TextArea label='Post' placeholder='Post' />
                <Button.Group>
                    <Button>Delete</Button>
                    <Button.Or />
                    <Button positive>Save</Button>
                </Button.Group>
            </Form>
        </div>
    )
};

