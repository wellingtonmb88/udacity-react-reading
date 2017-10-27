import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class ErrorMsgPostsByCategory extends Component {

    static propTypes = {
        shouldShow: PropTypes.bool.isRequired,
        onModalClosed: PropTypes.func.isRequired
    };

    render() {
        const { shouldShow, onModalClosed } = this.props;
        return (
            <div >
                <Modal dimmer={'blurring'} open={shouldShow} onClose={onModalClosed}>
                    <Modal.Header>Errorr!!!!</Modal.Header>
                    <Modal.Content>
                        Sorry but it was unable to load the Posts by Category Screen!
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

export default ErrorMsgPostsByCategory;
