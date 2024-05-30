import React, {useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../components/Header'
import ForumPostModal from '../components/ForumPostModal'
import '../styles/forum.css'

const SingleForum = () => {
    const location = useLocation();
    const id = location.id;

    const name = "indie lovers";
    const dummyPosts = [
        {
            subject: "concerts near boston?",
            message: "I’m in the area and I’m a huge indie rock fan. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla imperdiet vitae augue at dapibus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean consectetur posuere justo, nec dapibus eros efficitur vel. Morbi porttitor eros sit amet ante pretium auctor. Class aptent taciti sociosqu ad Class aptent taciti addd",
            user: "stellaminjin",
            likes: 1,
        },
        {
            subject: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
            message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla imperdiet vitae augue at dapibus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean consectetur posuere justo, nec dapibus eros efficitur vel. Morbi porttitor eros sit amet ante pretium auctor. Class aptent taciti Nam aliquet venenatis est, nec bibendum purus convallis eu. Phasellus ac venenatis nisl. Quisque et interdum sapien. Morbi augue lacus, ornare eu dui eget, gravida tempor magna. Sed in purus diam. Vestibulum non est eleifend, dapibus lectus ut, venenatis velit. Quisque finibus eleifend est nec mattis. Integer nec enim nunc. Mauris semper est vitae purus aliquam rutrum in quis tortor.",
            user: "emujinwin",
            likes: 300,
        },
        {
            subject: "fav bands?",
            message: "what are our fav bands?",
            user: "stellaminjin",
            likes: 100000,
        }
    ];

    return(
        <>
            <Header title={name} searchPlaceholder={"search posts"} forForums={true}></Header>
            <div className='main-container'>
                <ForumPostModal></ForumPostModal>
                {dummyPosts.map((post, idx)=>{
                    return (
                        <div key={idx} className='post'>
                            <div className='post-header'>
                                <div className='user'>{post.user}</div>
                                <div className='subject'>{post.subject}</div>
                            </div>
                            <br></br>
                            {post.message}
                            <br></br>
                            Likes: {post.likes}
                            <br></br>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
export default SingleForum;