require(`dotenv`).config();
const cors = require('cors');
const express = require(`express`);
const queryString = require(`querystring`);
const axios = require(`axios`);
const db = require('./firebase');
const app = express();
const port = 8888;

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectURI = process.env.REDIRECT_URI;


app.use(cors());
app.use(express.json());

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