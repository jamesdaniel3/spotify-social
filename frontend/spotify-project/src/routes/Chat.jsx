import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Chat( {profileInfo}) {
    const { id } = useParams();
    let sender = "XX"
    if(profileInfo){
        sender = profileInfo.id;
    }
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`http://localhost:8888/api/chats/${id}/messages`);
                const messagesData = response.data;

                // Fetch the display name for each sender
                const updatedMessages = await Promise.all(
                    messagesData.map(async (message) => {
                        try {
                            const userResponse = await axios.get(`http://localhost:8888/api/users/${message.sender}`);
                            const senderDisplayName = userResponse.data.displayName;
                            return {
                                ...message,
                                sender: senderDisplayName,
                            };
                        } catch (error) {
                            console.error("Error fetching sender display name:", error);
                            return message;
                        }
                    })
                );

                setMessages(updatedMessages);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        fetchMessages();
    }, [id]);

    console.log("Messages:", messages);
    console.log(sender)

    return (
        <>
            <p>This is a chat with ID: {id}</p>
        </>
    );
}
