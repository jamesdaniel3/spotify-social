import React, { useState, useEffect } from "react";
import '../styles/forum.css';
import grabSpotifyData from "../utils/GrabSpotifyData.js";
import axios from "axios";
import downvoteFilledIcon from '../icons/downvote-filled.png';
import downvoteUnfilledIcon from '../icons/downvote-unfilled.png';
import upvoteFilledIcon from '../icons/upvote-filled.png';
import upvoteUnfilledIcon from '../icons/upvote-unfilled.png';
import editIcon from '../icons/forumEdit.png';
import ForumPostModal from '../components/ForumPostModal'
import deleteIcon from '../icons/delete.png'

const Thread = ({forumName, forumID, threadID, profileInfo, isReply, parentThread}) => {
    const {
        profile,
        topArtistsShort,
        topArtistsMedium,
        topArtistsLong,
        topSongsShort,
        topSongsMedium,
        topSongsLong,
        likedSongs,
    } = grabSpotifyData();
    const [threadData, setThreadData] = useState({});
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [numUpvotes, setNumUpvotes] = useState(0);
    const [currentUser, setCurrentUser]= useState("")
    const fetchThread = async () => {
        try {
            const threadResponse = await axios.get(`http://localhost:8888/forums/${forumName}/${threadID}`);
            const data = threadResponse.data;
            setThreadData(data);
            profile && setCurrentUser(profile)
        } catch (error) {
            console.error('Error fetching thread: ', error);
        }
    };
    useEffect(()=>{
        fetchThread();
        }, []);
    useEffect(()=>{
        if (Array.isArray(threadData.upvotes) && Array.isArray(threadData.downvotes)&& currentUser.id){
            setNumUpvotes(threadData.upvotes.length - threadData.downvotes.length);
            setLiked(threadData.upvotes.includes(currentUser.id));
            setDisliked(threadData.downvotes.includes(currentUser.id))
        }
        fetchThread();
    }, [threadData, liked, disliked, numUpvotes])
    
    
    const handleLike = async () => {
        if (disliked){
            await axios.put(`http://localhost:8888/forums/${threadID}/undislike`, {user:currentUser.id});
            await axios.put(`http://localhost:8888/forums/${threadID}/like`, {user:currentUser.id});
            setDisliked(false);
            setLiked(true);
        } else if (!liked){
            await axios.put(`http://localhost:8888/forums/${threadID}/like`,{user:currentUser.id});
            setLiked(true);
        } else if (liked){
            await axios.put(`http://localhost:8888/forums/${threadID}/unlike`,{user:currentUser.id});
            setLiked(false);
        }
    }
    const handleDislike = async () => {
        if (liked){
            await axios.put(`http://localhost:8888/forums/${threadID}/unlike`,{user:currentUser.id});
            await axios.put(`http://localhost:8888/forums/${threadID}/dislike`,{user:currentUser.id});
            setLiked(false)
            setDisliked(true);
        } else if (!disliked){
            await axios.put(`http://localhost:8888/forums/${threadID}/dislike`,{user:currentUser.id});
            setDisliked(true);
        } else if (disliked){
            await axios.put(`http://localhost:8888/forums/${threadID}/undislike`,{user:currentUser.id});
            setDisliked(false);
        }
    }


    return (
        <>
        
        <div className='thread'>
            <div className='thread-header'>
                <div className='user'>{threadData.username}</div>
                {threadData.subject && <div className='subject'>{threadData.subject}</div>}
            </div>
            {threadData.body}
            <br></br>
            <div className="buttons">
            {
                liked ? 
                <>
                    <img src ={upvoteFilledIcon} onClick={handleLike}/>
                    <img src ={downvoteUnfilledIcon} onClick={handleDislike}/>
                    {numUpvotes}
                </> :
                disliked ? 
                <>
                    <img src ={upvoteUnfilledIcon} onClick={handleLike}/>
                    <img src ={downvoteFilledIcon} onClick={handleDislike}/>
                    {numUpvotes}
                </> :
                <>
                    <img src ={upvoteUnfilledIcon} onClick={handleLike} />
                    <img src ={downvoteUnfilledIcon} onClick={handleDislike} />
                    {numUpvotes}
                </>
            }
            {!isReply && <ForumPostModal 
                profileInfo={currentUser}
                forumName={forumName}
                forumID={forumID}
                threadID={threadData.id}
                forReply={true}
            />}
            </div>
            <div className="replies">
                {Array.isArray(threadData.replies) && threadData.replies.map((reply,idx)=>{
                    return <Thread key={idx} isReply={true} forumName={forumName} parentThread={threadID} threadID={reply} profileInfo={currentUser}></Thread>
                })}
            </div>
        </div>
        </>
    )
};
export default Thread;