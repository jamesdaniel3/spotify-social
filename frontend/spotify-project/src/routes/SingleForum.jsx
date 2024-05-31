import React, {useEffect, useState} from 'react'
import axios from "axios";
import { useLocation } from 'react-router-dom'
import Header from '../components/Header'
import ForumPostModal from '../components/ForumPostModal'
import '../styles/forum.css'
import Thread from '../components/Thread'

const SingleForum = ({profileInfo}) => {
    const location = useLocation();
    const data = location.state;
    const [user, setUser] = useState("");
    const [threadIDs, setThreadIDs] = useState([]);
    useEffect(() => {
        const fetchThreadsIDs = async () => {
            try {
                const idsResponse = await axios.get(`http://localhost:8888/forums/${data.forumID}`);
                setThreadIDs(idsResponse.data);
                profileInfo.id && setUser(profileInfo);
            } catch (error) {
                console.error('Error fetching threads: ', error);
            }
        };
        fetchThreadsIDs();
    }, []);

    return(
        <>
            <Header title={data.name} searchPlaceholder={"search posts"} forForums={true}></Header>
            <div className='main-container'>
                <ForumPostModal
                    profileInfo={profileInfo}
                    forumName={data.name}
                    forumID={data.forumID}
                    forReply={false}
                />
                {Array.isArray(threadIDs) && threadIDs.map((threadID, idx)=>{
                    return <Thread key={idx} threadID={threadID} profileInfo={user} forumName={data.name} forumID={data.forumID}/>
                })}
            </div>
        </>
    )
}
export default SingleForum;