const express = require('express');
const router = express.Router();
const db = require('../firebase');
const admin = require('firebase-admin');
const { FieldValue } = admin.firestore;

router.post('/api/removeUserFromChat', async (req, res) => {
    try {
        const { chatId, userId } = req.body;
        const chatRef = db.collection('chats').doc(chatId);
        const chatDoc = await chatRef.get();
        if (!chatDoc.exists) {
            return res.status(404).json({ error: 'Chat not found' });
        }
        const chatData = chatDoc.data();
        const updatedParticipants = chatData.participants.filter(participant => participant !== userId);
        if (updatedParticipants.length === 0) {
            await chatRef.delete();
            return res.status(200).send('Chat deleted successfully');
        } else {
            await chatRef.update({ participants: updatedParticipants });
            return res.status(200).send('User removed from chat successfully');
        }
    } catch (error) {
        console.error('Error removing user from chat:', error);
        res.status(500).json({ error: 'An error occurred while removing user from chat' });
    }
});

router.post('/api/updateChatTitle', async (req, res) => {
    try {
        const { chatId, title } = req.body;
        await db.collection('chats').doc(chatId).update({ title });
        res.status(200).send('Chat title updated successfully');
    } catch (error) {
        console.error('Error updating chat title:', error);
        res.status(500).json({ error: 'An error occurred while updating chat title' });
    }
});

router.post('/api/sendMessage', async (req, res) => {
    try {
        const { current_user_id, recipient_id, content } = req.body;
        const newMessageRef = db.collection('messages').doc();
        const newMessageId = newMessageRef.id;
        const timestamp = new Date().toISOString();
        await newMessageRef.set({
            content: content,
            sender: current_user_id,
            timestamp: timestamp
        });
        const chatQuery = await db.collection('chats')
            .where('participants', 'array-contains', current_user_id)
            .get();
        let chatDoc = null;
        chatQuery.forEach(doc => {
            const participants = doc.data().participants;
            if (participants.includes(recipient_id)) {
                chatDoc = doc;
            }
        });
        if (chatDoc) {
            await db.collection('chats').doc(chatDoc.id).update({
                messages: admin.firestore.FieldValue.arrayUnion(newMessageId)
            });
        } else {
            await db.collection('chats').add({
                participants: [current_user_id, recipient_id],
                messages: [newMessageId],
                title: ""
            });
        }
        res.status(200).send('Message sent successfully');
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'An error occurred while sending the message' });
    }
});

router.post('/api/chats', async (req, res) => {
    try {
        const { userId } = req.body;
        const querySnapshot = await db.collection('chats')
            .where('participants', 'array-contains', userId)
            .get();
        const chatMap = new Map();
        querySnapshot.docs.forEach((doc) => {
            const chatData = doc.data();
            const chatId = doc.id;
            const participants = chatData.participants;
            const title = chatData.title;
            chatMap.set(chatId, { participants, title });
        });
        const chatArray = Array.from(chatMap.entries()).map(([chatId, { participants, title }]) => ({
            chatId,
            participants,
            title
        }));
        res.json(chatArray);
    } catch (error) {
        console.error('Error fetching chats:', error);
        res.status(500).json({ error: 'An error occurred while fetching chats' });
    }
});

router.post('/api/chats/:chatId/messages', async (req, res) => {
    try {
        const chatId = req.params.chatId;
        const { content, sender } = req.body;
        const messageRef = await db.collection('messages').add({
            content: content,
            sender: sender,
            timestamp: new Date().toISOString(),
        });
        const messageId = messageRef.id;
        await db.collection('chats').doc(chatId).update({
            messages: FieldValue.arrayUnion(messageId),
        });
        res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/api/chats/:chatId/messages', async (req, res) => {
    try {
        const chatId = req.params.chatId;
        const chatDoc = await db.collection('chats').doc(chatId).get();
        if (!chatDoc.exists) {
            return res.status(404).json({ error: 'Chat not found' });
        }
        const chatData = chatDoc.data();
        const messageIds = chatData.messages;
        const messageRefs = messageIds.map((messageId) =>
            db.collection('messages').doc(messageId).get()
        );
        const messageSnapshots = await Promise.all(messageRefs);
        const messages = messageSnapshots.map((messageSnapshot) => {
            const messageData = messageSnapshot.data();
            return {
                content: messageData.content,
                sender: messageData.sender,
                timestamp: messageData.timestamp,
            };
        });
        res.json(messages);
    } catch (error) {
        console.error('Error retrieving messages:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
