import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import '../styles/editChatModal.css';

const EditChatModal = ({ show, handleClose, chat, updateChatTitle }) => {
    const [newTitle, setNewTitle] = useState('');

    useEffect(() => {
        if (chat) {
            setNewTitle(chat.title || '');
        }
    }, [chat]);

    const handleApply = () => {
        updateChatTitle(chat.chatId, newTitle);
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton className="modal-header-custom">
                <Modal.Title>Edit Chat Name</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-custom">
                <Form>
                    <Form.Group controlId="formChatTitle">
                        <Form.Label>Chat Title</Form.Label>
                        <Form.Control
                            type="text"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            placeholder="Enter new chat title"
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

export default EditChatModal;
