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
            <div className="vote">
                <Feed.Like>
                    <Icon name='like' />
                    <span className="votes-number">{number} Votes</span>
                    <Button
                        icon='thumbs outline up'
                        onClick={() => upVote(itemId)}
                    /><Button
                        icon='thumbs outline down'
                        onClick={() => downVote(itemId)}
                    />
                </Feed.Like>
            </div>
        )
    }
};

export default Vote;