require(`dotenv`).config();
const express = require(`express`);
const queryString = require(`querystring`);
const axios = require(`axios`);
const app = express();
const port = 8888;

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectURI = process.env.REDIRECT_URI;
console.log(redirectURI)

app.use(express.json());
const db = require("./firebase");
const { collection, getDoc, getDocs, updateDoc, doc, setDoc, arrayUnion, addDoc} = require("firebase/firestore");


const cors = require("cors");
app.use(cors());

const generateRandomString = length => {
    let text = ``;
    const possible = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`;

    for(let i = 0; i < length; i++){
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

const stateKey = `spotify_auth_state`

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


// get specific users
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
        const { id, display_name, followers } = req.body;

        console.log('Received POST request with body:', req.body);

        // Create a new document in the 'users' collection with a specific ID
        const docRef = db.collection('users').doc(id);
        await docRef.set({
            artists_displayed: [],
            display_name: display_name,
            followers: followers,
            open_for_messages: true,
            private_page: true,
            recently_seen: [],
            songs_displayed: []
        });

        res.status(201).json({ message: 'User created successfully', id: docRef.id });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// // change recently_seen  
// app.put("/posts/:id", async (req, res) => {
//     try {
//         const id = req.params.id;
//         const username = req.body.recently_seen;

//         console.log(`Updating user ${id} with recently seen: ${username}`);
        
//         await updateDoc(doc(db, "users", id), {
//             recently_seen: arrayUnion(username)
//         });
        
//         res.status(200).json({ message: "success" });
//     } catch (e) {
//         console.error(`Error updating recently seen for user ${id}:`, e);
//         res.status(400).json({ error: e.message });
//     }
// });


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