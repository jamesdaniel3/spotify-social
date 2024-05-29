import React, { useEffect, useState } from 'react';
import axios from 'axios';

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


    return (
        <>
            <h2>Messages</h2>
        </>
    );
};

export default Messages;
