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

// get all posts in a forum
app.get('/forums', async (req, res) => {
    try {
        const { userId } = req.params;

        // Query the 'users' collection for the document with the given ID
        const querySnapshot = await getDocs(collection(db, "forums"));

        querySnapshot.forEach((doc) => {
            ret.push({
                id: doc.id,
                ...doc.data(),
            });
        });
        res.status(200).json(ret);
    } catch (error) {
        console.error('Error fetching posts: ', error);
        res.status(500).json({ error: e.message });
    }
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// // get all posts
// forum.get("/forum-posts", async (req, res) => {
//     try {
//         let ret = [];
//         const querySnapshot = await getDocs(collection(db, "forums"));
//         querySnapshot.forEach((doc) => {
//             ret.push({
//                 id: doc.id,
//                 ...doc.data(),
//             });
//         });
//         res.status(200).json(ret);
//     } catch (e) {
//         res.status(400).json({ error: e.message });
//     }
// });

// like a post
// forum.put("/posts/:id", async (req, res) => {
//     try {
//         const id = req.params.id;
//         const currentLikes = req.body.currentLikes;

//         await updateDoc(doc(db, "posts", id), {
//             likes: currentLikes + 1,
//         });
//         res.status(200).json({ message: "Successfully liked a post"});
//     } catch (e) {
//         res.status(400).json({ error: e.message });
//     }
//     });
// make a post
// forum.post("/posts", async (req, res) => {
//     try {
//         const username = req.body.username;
//         const subject = req.body.subject;
//         const message = req.body.message;
//         const docRef = await addDoc(collection(db, "posts"), {
//             username: username,
//             subject: subject,
//             message: message,
//             likes: 0,
//         });
//         res.status(200).json({message: `Successfully created post with id ${docRef.id}`})
//     } catch (e) {
//         res.status(400).json({ error: e.message });
//     }
// });
// forum.delete("/posts/:id", async(req)=>{
//     const id = req.params.id;
//     const docRef = await deleteDoc(doc(db, "posts", id))
// });