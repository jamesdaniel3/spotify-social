const db = require('./firebase');
const express = require("express");
const router = express.Router();
const admin = require('firebase-admin');
const { FieldValue } = admin.firestore;

// get all forums
router.get("/", async (req, res) => {
    try {
        let ret = []
        const querySnapshot = await db.collection('forums').get();
        querySnapshot.forEach((doc) => {
            ret.push({
                id: doc.id,
                ...doc.data(),
            });
        });
        res.status(200).json(ret);
    } catch (e) {
        console.error('Error fetching forums: ', error);
        res.status(500).json({ error: e.message });
    }
});
// gets threads from a forum
router.get('/:id', async(req,res)=>{
    try{
        const id = req.params.id;
        const doc = await db.collection("forums").doc(id).get();
        res.status(200).json(doc.data()['threads']);
    }  catch (e) {
        console.error('Error fetching threads: ', e);
        res.status(500).json({ error: e.message });
    }
});
// get a single post in a forum
router.get('/:forum/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const doc = await db.collection("threads").doc(id).get();
        const username = await db.collection("users").doc(doc.data()['user']).get();
        res.status(200).json({id:doc.id,username:username.data()['display_name'],...doc.data()});
    } catch (e) {
        console.error('Error fetching forums: ', e);
        res.status(500).json({ error: e.message });
    }
});
// post a reply
router.post('/:forum/:id/reply', async (req,res)=>{
    try{
        // add post to threads
        const threadID = req.params.id;
        const userId = req.body.user;
        const body = req.body.body;
        const replies = [];
        const upvotes = [];
        const downvotes = [];
        const docRef = await db.collection('threads').add({
            body:body,
            upvotes:upvotes,
            downvotes: downvotes,
            replies:replies,
            user:userId,
        });
        // add post ID to thread
        await db.collection('threads').doc(threadID).update({
            replies: admin.firestore.FieldValue.arrayUnion(docRef.id)
        })
        res.status(200).json({message: `Successfully replied to thread with id ${docRef.id}`})
    } catch (e) {
        console.error('Error posting reply: ', e);
        res.status(500).json({ error: e.message });
    }
});
// // delete a forum post
// router.delete('/:forumID/:id', async(req,res)=>{
//     try{
//         // delete from threads
//         const threadId = req.params.id;
//         await db.collection("threads").doc(threadId).delete();
//         // delete from forums
//         const forumID = req.params.forumID;
//         const ref = db.collection('forums').doc(forumID);
//         const doc = await ref.get();
//         const data = doc.data();
//         const updatedPosts = data.threads.filter((thread) => thread !== threadId);
//         await ref.update({ threads: updatedPosts });
//         res.status(200).json({ message: "Successfully deleted a post"});
//     } catch (e) {
//         console.error('Error deleting: ', e);
//         res.status(500).json({ error: e.message });
//     }
// })
// // delete a reply
// router.delete('/:forumID/:parentID/:id', async(req,res)=>{
//     try{
//         // delete from threads
//         const threadId = req.params.id;
//         await db.collection("threads").doc(threadId).delete();
//         // delete from parent thread
//         const parentThread = req.params.parentID;
//         const ref = db.collection('threads').doc(parentThread);
//         const doc = await ref.get();
//         const data = doc.data();
//         const updatedReplies = data.replies.filter((reply) => reply != threadId);
//         await ref.update({ replies: updatedReplies });
//         res.status(200).json({ message: "Successfully deleted a reply"});
//     } catch (e) {
//         console.error('Error deleting: ', e);
//         res.status(500).json({ error: e.message });
//     }
// })

// post to a forum
router.post('/:forum', async(req, res)=>{
    try{
        // add post to threads
        const userId = req.body.user;
        const forumID = req.body.forumID;
        const subject = req.body.subject;
        const body = req.body.body;
        const replies = [];
        const upvotes = [];
        const downvotes = [];
        const docRef = await db.collection('threads').add({
            body:body,
            upvotes:upvotes,
            downvotes:downvotes,
            replies:replies,
            user:userId,
            forum: forumID,
            subject:subject,
        });
        // add post ID to forums
        await db.collection('forums').doc(forumID).update({
            threads: FieldValue.arrayUnion(docRef.id)
        })
        res.status(200).json({message: `Successfully posted thread with id ${docRef.id}`})
    } catch (e) {
        console.error('Error posting: ', e);
        res.status(500).json({ error: e.message });
    }
});
// like a forum post
router.put("/:id/like", async (req, res) => {
    try {
        const id = req.params.id;
        const user = req.body.user;
        await db.collection("threads").doc(id).update({upvotes: admin.firestore.FieldValue.arrayUnion(user)})
        res.status(200).json({ message: "Successfully liked a post"});
    } catch (e) {
        console.error('Error liking: ', e);
        res.status(400).json({ error: e.message });
    }
});
// unlike a forum post
router.put("/:id/unlike", async (req, res) => {
    try {
        const id = req.params.id;
        const userID = req.body.user;
        const ref = db.collection('threads').doc(id);
        const doc = await ref.get();
        const threadData = doc.data();
        const updatedUpvotes = threadData.upvotes.filter((user) => user != userID);
        await ref.update({ upvotes: updatedUpvotes });
        res.status(200).json({ message: "Successfully unliked a post"});
    } catch (e) {
        console.error('Error unliking: ', e);
        res.status(400).json({ error: e.message });
    }
});

//undislike a forum post
router.put("/:id/undislike", async (req, res) => {
    try {
        const id = req.params.id;
        const userID = req.body.user;
        const ref = db.collection('threads').doc(id);
        const doc = await ref.get();
        const threadData = doc.data();
        const updatedDownvotes = threadData.downvotes.filter((user) => user != userID);
        await ref.update({ downvotes: updatedDownvotes });
        res.status(200).json({ message: "Successfully undisliked a post"});
    } catch (e) {
        console.error('Error undisliking: ', e);
        res.status(400).json({ error: e.message });
    }
});

// dislike a forum post
router.put("/:id/dislike", async (req, res) => {
    try {
        const id = req.params.id;
        const user = req.body.user;
        await db.collection("threads").doc(id).update({downvotes: admin.firestore.FieldValue.arrayUnion(user)})
        res.status(200).json({ message: "Successfully disliked a post"});
    } catch (e) {
        console.error('Error disliking: ', e);
        res.status(400).json({ error: e.message });
    }
});


module.exports = router;