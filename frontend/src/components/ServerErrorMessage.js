import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'semantic-ui-react';

export class ServerErrorMessage extends Component {

    render() {
        return (
            <div>
                <div style={{ justifyContent: 'center' }}>
                    <Modal dimmer={'blurring'} open={this.props.serverError.show} >
                        <Modal.Header>Internal Server Error</Modal.Header>
                        <Modal.Content>
                            Sorry, our servers are not responding, please try again later!
                        </Modal.Content>
                        <Modal.Actions>
                        </Modal.Actions>
                    </Modal>
                </div>
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
    serverError: state.serverError
});

export default connect(
    mapStateToProps
)(ServerErrorMessage);