require(`dotenv`).config();
const cors = require('cors');
const express = require(`express`);
const queryString = require(`querystring`);
const axios = require(`axios`);
const db = require('./firebase');
const admin = require('firebase-admin');
const { FieldValue } = admin.firestore;
const app = express();
const port = 8888;

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectURI = process.env.REDIRECT_URI;

app.use(cors());
app.use(express.json());


app.post('/api/updateUserSettings', async (req, res) => {
    try {
        const { userId, displayInfo, privatePage } = req.body;

        // Ensure the values are not undefined
        const updateData = {};
        if (displayInfo !== undefined) updateData.display_info = displayInfo;
        if (privatePage !== undefined) updateData.private_page = privatePage;

        // Update the user document in Firestore
        await db.collection('users').doc(userId).update(updateData);

        res.status(200).send('User settings updated successfully');
    } catch (error) {
        console.error('Error updating user settings:', error);
        res.status(500).json({ error: 'An error occurred while updating user settings' });
    }
});

app.post('/api/updateUserTopData', async (req, res) => {
    try {
        const { userId, topArtists, topSongs } = req.body;

        // Ensure the values are not undefined
        const updateData = {};
        if (topArtists !== undefined) updateData.recent_top_artists = topArtists;
        if (topSongs !== undefined) updateData.recent_top_songs = topSongs;

        // Update the user document in Firestore
        await db.collection('users').doc(userId).update(updateData);

        res.status(200).send('User top data updated successfully');
    } catch (error) {
        console.error('Error updating user top data:', error);
        res.status(500).json({ error: 'An error occurred while updating user top data' });
    }
});


app.post('/api/chats', async (req, res) => {
    try {
        const { userId } = req.body;

        // Query the 'chats' collection for documents where the 'participants' array contains the user's ID
        const querySnapshot = await db.collection('chats')
            .where('participants', 'array-contains', userId)
            .get();

        // Create a map to store chat document IDs and their participants
        const chatMap = new Map();

        // Iterate over the query results and populate the map
        querySnapshot.docs.forEach((doc) => {
            const chatData = doc.data();
            const chatId = doc.id;
            const participants = chatData.participants;

            // Add the chat ID and participants to the map
            chatMap.set(chatId, participants);
        });

        // Convert the map to an array of objects for easier JSON serialization
        const chatArray = Array.from(chatMap.entries()).map(([chatId, participants]) => ({
            chatId,
            participants
        }));

        res.json(chatArray);
    } catch (error) {
        console.error('Error fetching chats:', error);
        res.status(500).json({ error: 'An error occurred while fetching chats' });
    }
});

app.get('/api/users/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        // Query the 'users' collection for the document with the given ID
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


app.post('/api/chats/:chatId/messages', async (req, res) => {
    try {
        const chatId = req.params.chatId;
        const { content, sender } = req.body;

        // Create a new message document in the 'messages' collection
        const messageRef = await db.collection('messages').add({
            content: content,
            sender: sender,
            timestamp: new Date().toISOString(),
        });

        // Get the ID of the newly created message document
        const messageId = messageRef.id;

        // Update the 'messages' array in the chat document
        await db.collection('chats').doc(chatId).update({
            messages: FieldValue.arrayUnion(messageId),
        });

        res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/chats/:chatId/messages', async (req, res) => {
    try {
        const chatId = req.params.chatId;

        // Retrieve the chat document
        const chatDoc = await db.collection('chats').doc(chatId).get();

        if (!chatDoc.exists) {
            return res.status(404).json({ error: 'Chat not found' });
        }

        const chatData = chatDoc.data();
        const messageIds = chatData.messages;

        // Retrieve the message documents
        const messageRefs = messageIds.map((messageId) =>
            db.collection('messages').doc(messageId).get()
        );
        const messageSnapshots = await Promise.all(messageRefs);

        // Extract the message data
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


//DISCOVER PAGE START

// get all users
app.get("/posts", async (req, res) => {
    try {
        let ret = [];
        const querySnapshot = await db.collection("users").get();
        querySnapshot.forEach((doc) => {
            ret.push({
                id: doc.id,
                ...doc.data(),
            });
        });
        res.status(200).json(ret);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});


// check specific users
app.get("/user/:id", async (req, res) => {
    try {
        const id = req.params.id;

        // Query the 'users' collection for the document with the given ID
        const userDoc = await db.collection('users').doc(id).get();

        if (!userDoc.exists) {
            return res.status(200).json([]); // If the document doesn't exist, return an empty array
        } else {
            const userData = userDoc.data(); // Retrieve the document data
            res.status(200).json(userData); // Respond with the user data
        }
    } catch (error) {
        console.error('Error fetching user:', error); // Log the error for debugging
        res.status(500).json({ error: 'An error occurred while fetching user' });
    }
});



app.post('/user', async (req, res) => {
    try {
        const { id, display_name, followers, profilePicture } = req.body;

        // console.log('Received POST request with body:', req.body);
        // console.log(profilePicture);

        // Create a new document in the 'users' collection with a specific ID
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

app.put("/posts/:currentUserId", async (req, res) => {
    try {
        const currentUserId = req.params.currentUserId; // Correctly access currentUserId from params
        const clickedUserId = req.body.clickedUserId;

        // console.log(`Updating user ${currentUserId} with recently seen: ${clickedUserId}`);
        
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


//LOGIN

const generateRandomString = length => {
    let text = ``;
    const possible = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`;

    for(let i = 0; i < length; i++){
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

const stateKey = `spotify_auth_state`


app.get(`/login`, (request, response) => {
    const state = generateRandomString(16)
    response.cookie(stateKey, state)

    const scope = [
        'user-read-private',
        'user-read-email',
        'user-top-read',
        'user-library-read',
    ].join(' ');

    const queryParams = queryString.stringify({
        client_id: clientId,
        response_type: `code`,
        redirect_uri: redirectURI,
        state: state,
        scope: scope,
    })
    response.redirect(`https://accounts.spotify.com/authorize?${queryParams}`)
})

app.get(`/callback`, (req, res) => {
    const code = req.query.code || null;

    axios({
        method: `post`,
        url: `https://accounts.spotify.com/api/token`,
        data: queryString.stringify({
            grant_type: `authorization_code`,
            code: code,
            redirect_uri: redirectURI
        }),
        headers: {
            'content-type': `application/x-www-form-urlencoded`,
            Authorization: `Basic ${new Buffer.from(`${clientId}:${clientSecret}`).toString(`base64`)}`
        },
    }).then(response => {
        if(response.status === 200){
            const { access_token, refresh_token, expires_in} = response.data;

            const queryParams = queryString.stringify({
                access_token,
                refresh_token,
                expires_in,
            })

            res.redirect(`http://localhost:5173/?${queryParams}`)


        } else{
            res.redirect(`/?${queryString.stringify({ error: `invalid_token`})}`)
        }
    }).catch(error => {
        res.send(error)
    })
})

app.get(`/refresh_token`, (req, res) => {
    const { refresh_token } = req.query;

    axios({
        method: `post`,
        url: `https://accounts.spotify.com/api/token`,
        data: queryString.stringify({
            grant_type: `authorization_code`,
            refresh_token: refresh_token
        }),
        headers: {
            'content-type': `application/x-www-form-urlencoded`,
            Authorization: `Basic ${new Buffer.from(`${clientId}:${clientSecret}`).toString(`base64`)}`
        },
    })
        .then(response => {
            res.send(response.data)
        })
        .catch(error => {
            res.send(error)
        })
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})