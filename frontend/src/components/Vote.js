import React from 'react'
import { Button, Feed, Icon } from 'semantic-ui-react'

export default function Vote({ number }) {
    return (
        <div>
            <Feed.Like>
                <Icon name='like' />
                <span>{number} Votes</span>
                <Button
                    icon='thumbs outline up'
                /><Button
                    icon='thumbs outline down'
                />
            </Feed.Like>

        </div>
    )
};
