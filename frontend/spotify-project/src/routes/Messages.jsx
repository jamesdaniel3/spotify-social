import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Messages = ({ profileInfo }) => {
    const [chats, setChats] = useState([]);
    const [displayNames, setDisplayNames] = useState([]);
    const [displayNamesUpdated, setDisplayNamesUpdated] = useState(false);

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const response = await axios.post('http://localhost:8888/api/chats', { userId: profileInfo.id });
                setChats(response.data);
                setDisplayNamesUpdated(false);
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

            const existingChatIndex = displayNames.findIndex(
                (chatEntry) =>
                    chatEntry.chatId === chat.id &&
                    JSON.stringify(chatEntry.participants) === JSON.stringify(participantDisplayNames)
            );

            if (existingChatIndex === -1) {
                setDisplayNames((prevDisplayNames) => [
                    ...prevDisplayNames,
                    { chatId: chat.id, participants: participantDisplayNames },
                ]);
            }
        };

        if (!displayNamesUpdated) {
            chats.forEach(fetchDisplayNamesForChat);
            setDisplayNamesUpdated(true);
        }
    }, [chats, displayNames, displayNamesUpdated]);

    return (
        <>
            <h2>Messages</h2>
            {displayNames.length > 0 ? (
                <ul>
                    {displayNames.map(({ chatId, participants }, index) => (
                        <li key={index}>
                            <p>Participants: {participants.join(', ')}</p>
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