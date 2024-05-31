import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from "../components/Header.jsx";
import '../styles/messages.css';
import edit from '../icons/edit.png';
import EditChatModal from "../components/EditChatModal";

const Messages = ({ profileInfo }) => {
    const [chats, setChats] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedChat, setSelectedChat] = useState(null);

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const response = await axios.post('http://localhost:8888/api/chats', { userId: profileInfo.id });
                const fetchedChats = response.data;

                const updatedChats = await Promise.all(
                    fetchedChats.map(async (chat) => {
                        const participantDisplayNames = await Promise.all(
                            chat.participants.map(async (participantId) => {
                                try {
                                    const response = await axios.get(`http://localhost:8888/api/users/${participantId}`);
                                    return response.data.displayName;
                                } catch (error) {
                                    console.error('Error fetching display name:', error);
                                    return participantId; // Return the user ID if display name can't be fetched
                                }
                            })
                        );
                        return { ...chat, participants: participantDisplayNames };
                    })
                );

                setChats(updatedChats);
            } catch (error) {
                console.error('Error fetching chats:', error);
            }
        };

        if (profileInfo) {
            fetchChats();
        }
    }, [profileInfo]);

    const handleEditClick = (chat) => {
        setSelectedChat(chat);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedChat(null);
    };

    const updateChatTitle = async (chatId, newTitle) => {
        try {
            await axios.post('http://localhost:8888/api/updateChatTitle', { chatId, title: newTitle });
            setChats((prevChats) =>
                prevChats.map((chat) =>
                    chat.chatId === chatId ? { ...chat, title: newTitle } : chat
                )
            );
            closeModal();
        } catch (error) {
            console.error('Error updating chat title:', error);
        }
    };

    return (
        <>
            <Header title={"your messages"} />
            <div className={"chats"}>
                {chats.length > 0 ? (
                    <table className="chats-table">
                        <tbody>
                        {chats.map((chat) => (
                            <tr key={chat.chatId}>
                                <td>
                                    <div className="chat-container">
                                        <Link to={`/chats/${chat.chatId}`} className="chat-link">
                                            {chat.title ? (
                                                <div style={{color:"white"}}>{chat.title}</div>
                                            ) : (
                                                <div style={{color:"white"}}>{chat.participants.join(', ')}</div>
                                            )}
                                        </Link>
                                        <img
                                            src={edit}
                                            alt="Edit"
                                            className="edit-icon"
                                            onClick={() => handleEditClick(chat)}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No chats found.</p>
                )}
            </div>
            {isModalOpen && (
                <EditChatModal
                    show={isModalOpen}
                    handleClose={closeModal}
                    chat={selectedChat}
                    updateChatTitle={updateChatTitle}
                />
            )}
        </>
    );
};

export default Messages;
