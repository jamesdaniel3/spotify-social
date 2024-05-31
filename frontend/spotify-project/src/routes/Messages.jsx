import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from "../components/Header.jsx";
import '../styles/messages.css';
import edit from '../icons/edit.png';
import remove from '../icons/remove.png';
import EditChatModal from "../components/EditChatModal";
import RemoveChatModal from "../components/RemoveChatModal";
import LoadingIcon from "../icons/loading-icon.png";

const Messages = ({ profileInfo }) => {
    const [chats, setChats] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [selectedChat, setSelectedChat] = useState(null);
    let user_id = "";
    if(profileInfo){
        user_id = profileInfo.id;
    }

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
            } finally {
                setLoading(false)
            }
        };

        if (profileInfo) {
            fetchChats();
        }
    }, [profileInfo]);

    const handleEditClick = (chat) => {
        setSelectedChat(chat);
        setIsEditModalOpen(true);
    };

    const handleRemoveClick = (chat) => {
        setSelectedChat(chat);
        setIsRemoveModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedChat(null);
    };

    const closeRemoveModal = () => {
        setIsRemoveModalOpen(false);
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
            closeEditModal();
        } catch (error) {
            console.error('Error updating chat title:', error);
        }
    };

    const removeUserFromChat = async (chatId) => {
        try {
            await axios.post('http://localhost:8888/api/removeUserFromChat', { chatId, userId: user_id });
            setChats((prevChats) =>
                prevChats.filter((chat) => chat.chatId !== chatId)
            );
            closeRemoveModal();
        } catch (error) {
            console.error('Error removing user from chat:', error);
        }
    };

    return (
        <>
            {loading &&
                <div className='loading-container'>
                    <img
                        src={LoadingIcon}
                        alt='Loading Icon'
                        style={{height:"8rem"}}
                    />
                    <p>Loading...</p>
                </div>
            }
            {!loading &&
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
                                                <img
                                                    src={remove}
                                                    alt="Remove"
                                                    className="remove-icon"
                                                    onClick={() => handleRemoveClick(chat)}
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
                        {isEditModalOpen && (
                            <EditChatModal
                                show={isEditModalOpen}
                                handleClose={closeEditModal}
                                chat={selectedChat}
                                updateChatTitle={updateChatTitle}
                            />
                        )}
                        {isRemoveModalOpen && (
                            <RemoveChatModal
                                show={isRemoveModalOpen}
                                handleClose={closeRemoveModal}
                                chat={selectedChat}
                                removeUserFromChat={removeUserFromChat}
                            />
                        )}

                    </div>

                </>
            }
        </>
    );
};

export default Messages;
