import React, { Component } from 'react';
import { Button, Feed, Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types';

class Vote extends Component {
    static propTypes = {
        itemId: PropTypes.string.isRequired,
        number: PropTypes.number.isRequired,
        upVote: PropTypes.func.isRequired,
        downVote: PropTypes.func.isRequired,
    };
    render() {
        const { upVote, downVote, number, itemId } = this.props;
        return (
            <div>
                <Feed.Like>
                    <Icon name='like' />
                    <span>{number} Votes</span>
                    <Button onClick={ () => upVote(itemId)}
                        icon='thumbs outline up'
                    /><Button onClick={ () => downVote(itemId)}
                        icon='thumbs outline down'
                    />
                </Feed.Like>
            </div>
        )
    }
};

export default Vote;