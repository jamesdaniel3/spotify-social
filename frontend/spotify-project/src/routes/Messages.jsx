import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Messages = ({ profileInfo }) => {
    const [chats, setChats] = useState([]);
    const [displayNames, setDisplayNames] = useState({});

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const response = await axios.post('http://localhost:8888/api/chats', { userId: profileInfo.id });
                setChats(response.data);
            } catch (error) {
                console.error('Error fetching chats:', error);
            }
        };

        if (profileInfo) {
            fetchChats();
        }
    }, [profileInfo]);

    useEffect(() => {
        const fetchDisplayNamesForChat = async (chat) => {
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

            setDisplayNames((prevDisplayNames) => ({
                ...prevDisplayNames,
                [chat.id]: participantDisplayNames,
            }));
        };

        chats.forEach(fetchDisplayNamesForChat);
    }, [chats]);

    return (
        <>
            <h2>Messages</h2>
            {chats.length > 0 ? (
                <ul>
                    {chats.map((chat, index) => (
                        <li key={index}>
                            <p>
                                Participants: {displayNames[chat.id]?.join(', ') || 'Loading...'}
                            </p>
                            {/* Add more chat details here */}
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