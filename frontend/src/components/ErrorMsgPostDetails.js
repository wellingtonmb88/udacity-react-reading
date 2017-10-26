import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class ErrorMsgPostDetails extends Component {

    static propTypes = {
        postId: PropTypes.string.isRequired,
        onModalClosed: PropTypes.func.isRequired
    };

    render() {
        const { postId, onModalClosed } = this.props;
        return (
            <div >
                <Modal dimmer={'blurring'} open={postId === undefined} onClose={onModalClosed}>
                    <Modal.Header>Errorr!!!!</Modal.Header>
                    <Modal.Content>
                        Sorry but it was unable to load the Post's details!
                </Modal.Content>
                    <Modal.Actions>
                        <Button color='black'
                            content="Ok"
                            onClick={onModalClosed} />
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
};

export default ErrorMsgPostDetails;
