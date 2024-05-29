import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Messages = ({ profileInfo }) => {
    const [chats, setChats] = useState([]);

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

    console.log(chats)

    return (
        <>
            <h2>Messages</h2>
            {chats.length > 0 ? (
                <ul>
                    {chats.map((chat) => (
                        <li key={chat.chatId}>
                            <Link to={`/chats/${chat.chatId}`}>{chat.participants.join(', ')}</Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No chats found.</p>
            )}
        </>
    );
};

export default Messages;
