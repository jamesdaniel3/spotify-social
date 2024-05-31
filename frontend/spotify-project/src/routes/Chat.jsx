import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Message from "../components/Message";
import '../styles/chat.css';
import Header from "../components/Header.jsx";

export default function Chat({ profileInfo }) {
    const { id } = useParams();
    let sender = "XX";
    if (profileInfo) {
        sender = profileInfo.id;
    }
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    const fetchMessages = async () => {
        try {
            const response = await axios.get(`http://localhost:8888/api/chats/${id}/messages`);
            const messagesData = response.data;
            setMessages(messagesData);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:8888/api/chats/${id}/messages`, {
                content: newMessage,
                sender: sender,
            });
            setNewMessage("");
            // Refresh messages after sending a new message
            fetchMessages();
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <>
            <Header title={"messaging"} />
            <div className="messages">
                <div className="messages-container">
                    {messages.map((message, index) => (
                        <Message
                            key={index}
                            content={message.content}
                            sender={message.sender}
                            timestamp={message.timestamp}
                            isOwnMessage={message.sender === sender}
                        />
                    ))}
                </div>
                <div className={"send-message"}>
                    <form onSubmit={handleSubmit} className="message-form">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type your message"
                            className="message-input"
                        />
                        <button type="submit" className="send-button">Send</button>
                    </form>
                </div>
            </div>
        </>
    );
}
