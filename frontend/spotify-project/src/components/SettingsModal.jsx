import React, { useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import '../styles/settingsModal.css';

const SettingsModal = ({ show, handleClose, displayInfo, privatePage, id }) => {
    useEffect(() => {
        if (show) {
            console.log('Modal opened with fields:', { displayInfo, privatePage, id });
        }
    }, [show, displayInfo, privatePage, id]);

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton className="modal-header-custom">
                <Modal.Title>Settings</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-custom">
                <Form>
                    <Form.Group controlId="formDisplayInfo">
                        <Form.Check
                            type="checkbox"
                            label="Display Info"
                            defaultChecked={displayInfo}
                            className="custom-checkbox"
                        />
                    </Form.Group>
                    <Form.Group controlId="formPrivatePage">
                        <Form.Check
                            type="checkbox"
                            label="Private Page"
                            defaultChecked={privatePage}
                            className="custom-checkbox"
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className="modal-footer-custom">
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="success" onClick={handleClose}>
                    Apply
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SettingsModal;