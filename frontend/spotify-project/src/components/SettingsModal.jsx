import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const SettingsModal = ({ show, handleClose }) => {
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Settings</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: 'black', color: 'white' }}>
                <p>Settings content goes here...</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Apply
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SettingsModal;