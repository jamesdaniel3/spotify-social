const express = require('express');
const router = express.Router();
const db = require('../firebase');
const admin = require('firebase-admin');
const { FieldValue } = admin.firestore;

router.post('/api/updateUserSettings', async (req, res) => {
    try {
        const { userId, displayInfo, privatePage } = req.body;
        const updateData = {};
        if (displayInfo !== undefined) updateData.display_info = displayInfo;
        if (privatePage !== undefined) updateData.private_page = privatePage;
        await db.collection('users').doc(userId).update(updateData);
        res.status(200).send('User settings updated successfully');
    } catch (error) {
        console.error('Error updating user settings:', error);
        res.status(500).json({ error: 'An error occurred while updating user settings' });
    }
});

router.post('/api/updateUserTopData', async (req, res) => {
    try {
        const { userId, topArtists, topSongs } = req.body;
        const updateData = {};
        if (topArtists !== undefined) updateData.recent_top_artists = topArtists;
        if (topSongs !== undefined) updateData.recent_top_songs = topSongs;
        await db.collection('users').doc(userId).update(updateData);
        res.status(200).send('User top data updated successfully');
    } catch (error) {
        console.error('Error updating user top data:', error);
        res.status(500).json({ error: 'An error occurred while updating user top data' });
    }
});

router.get('/api/users/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const userDoc = await db.collection('users').doc(userId).get();
        if (userDoc.exists) {
            const userData = userDoc.data();
            res.json({ displayName: userData.display_name });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'An error occurred while fetching user' });
    }
});

router.post('/user', async (req, res) => {
    try {
        const { id, display_name, followers, profilePicture } = req.body;
        const docRef = db.collection('users').doc(id);
        await docRef.set({
            artists_displayed: [],
            display_name: display_name,
            followers: followers,
            profilePicture: profilePicture,
            open_for_messages: true,
            private_page: true,
            display_info: true,
            recently_seen: [],
            songs_displayed: []
        });
        res.status(201).json({ message: 'User created successfully', id: docRef.id });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put("/posts/:currentUserId", async (req, res) => {
    try {
        const currentUserId = req.params.currentUserId;
        const clickedUserId = req.body.clickedUserId;
        const docRef = db.collection("users").doc(currentUserId);
        const doc = await docRef.get();
        if (!doc.exists) {
            return res.status(404).json({ error: "User not found" });
        }
        const data = doc.data();
        const recentlySeen = data.recently_seen || [];
        if (!recentlySeen.includes(clickedUserId)) {
            await docRef.update({
                recently_seen: admin.firestore.FieldValue.arrayUnion(clickedUserId)
            });
            res.status(200).json({ message: "success" });
        } else {
            res.status(200).json({ message: "User already in recently seen" });
        }
    } catch (e) {
        console.error(`Error updating recently seen for user:`, e);
        res.status(400).json({ error: e.message });
    }
});

module.exports = router;
