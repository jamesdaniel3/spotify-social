import React from 'react';
import '../styles/message.css'; // Import the CSS file for styling

const Message = ({ content, sender, timestamp, isOwnMessage }) => {
    return (
        <div className={`message ${isOwnMessage ? 'own-message' : 'other-message'}`}>
            <div className="message-content">
                <p>{content}</p>
            </div>
            <div className="message-timestamp">
                <small>{new Date(timestamp).toLocaleString()}</small>
            </div>
        </div>
    );
};

export default Message;
