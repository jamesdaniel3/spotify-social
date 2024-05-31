import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const RemoveChatModal = ({ show, handleClose, chat, removeUserFromChat }) => {
    const handleLeave = () => {
        removeUserFromChat(chat.chatId);
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton className="modal-header-custom">
                <Modal.Title>Are you sure you want to leave this chat?</Modal.Title>
            </Modal.Header>
            <Modal.Footer className="modal-footer-custom">
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleLeave}>
                    Leave
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default RemoveChatModal;
