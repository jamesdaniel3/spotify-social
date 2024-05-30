import React, {useState} from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import '../styles/settingsModal.css';
import axios from 'axios';

const SettingsModal = ({ show, handleClose, displayInfo, privatePage, id }) => {
    const [displayInfoChecked, setDisplayInfoChecked] = useState(displayInfo);
    const [privatePageChecked, setPrivatePageChecked] = useState(privatePage);

    const handleApply = async () => {
        try {
            await axios.post('http://localhost:8888/api/updateUserSettings', {
                userId: id,
                displayInfo: displayInfoChecked,
                privatePage: privatePageChecked
            });
            console.log('User settings updated successfully');
            handleClose();
        } catch (error) {
            console.error('Error updating user settings:', error);
        }
    };

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
                            checked={displayInfoChecked}
                            onChange={(e) => setDisplayInfoChecked(e.target.checked)}
                            className="custom-checkbox"
                        />
                    </Form.Group>
                    <Form.Group controlId="formPrivatePage">
                        <Form.Check
                            type="checkbox"
                            label="Private Page"
                            checked={privatePageChecked}
                            onChange={(e) => setPrivatePageChecked(e.target.checked)}
                            className="custom-checkbox"
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className="modal-footer-custom">
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="success" onClick={handleApply}>
                    Apply
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SettingsModal;