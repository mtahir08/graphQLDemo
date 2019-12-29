import React from 'react';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'


const ModalEvent = (props) => (
    <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.children}</Modal.Body>
        <Modal.Footer>
            {props.close && <Button variant="secondary" onClick={props.handleClose}>
                Close
            </Button>}

            {props.confirm && <Button variant="primary" onClick={props.handleConfirm}>
                Confirm
            </Button>}
        </Modal.Footer>
    </Modal>
)

export { ModalEvent }