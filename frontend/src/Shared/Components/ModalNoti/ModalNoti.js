import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// import {Util} from '../../../Helper/Util'
class ModalNoti extends React.Component {

    render() {
        let { message, done } = this.props;
        return (
            <div className="modalNotiContainer">
                <Modal isOpen={!!message} >
                    <ModalHeader >Thông Báo !</ModalHeader>
                    <ModalBody>{message}</ModalBody>
                    <ModalFooter>
                        <Button
                            color="primary"
                            onClick={() => { done() }}>OK</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default ModalNoti;