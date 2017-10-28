import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class ErrorMessage extends Component {

    static propTypes = {
        shouldShow: PropTypes.bool.isRequired,
        header: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
        onModalClosed: PropTypes.func.isRequired
    };

    render() {
        const { shouldShow, header, message, onModalClosed } = this.props;
        return (
            <div >
                <Modal dimmer={'blurring'} open={shouldShow} onClose={onModalClosed}>
                    <Modal.Header>{header}</Modal.Header>
                    <Modal.Content>
                        {message}
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

export default ErrorMessage;
