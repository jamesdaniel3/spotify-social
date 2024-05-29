import React, {useEffect, useState} from 'react'
import SearchBar from '../components/SearchBar'
import Table from 'react-bootstrap/Table';
import '../styles/song-list.css'
import { useNavigate, Link } from 'react-router-dom';


const AllForums = () => {
    // order data by number of posts in a forum
    const navigate = useNavigate();
    const dummyData = [
        {
            id:123,
            name:"indie lovers",
            numPosts: 3,
            posts: [
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
            ]
        },
        {
            id:456,
            name:"metal heads",
            numPosts: 2,
            posts: [
                {
                    subject: "concerts near boston?",
                    message: "I’m in the area and I’m a huge indie rock fan. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla imperdiet vitae augue at dapibus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean consectetur posuere justo, nec dapibus eros efficitur vel. Morbi porttitor eros sit amet ante pretium auctor. Class aptent taciti sociosqu ad Class aptent taciti addd",
                    user: "stellaminjin",
                    likes: 1,
                },
                {
                    subject: "fav bands?",
                    message: "what are our fav bands?",
                    user: "stellaminjin",
                    likes: 100000,
                }
            ]
        }
    ]
    const handleClick = (id) =>{
        console.log("clicked");
        "location.href=`/forums/${id}`"
        navigate(`/forums/${id}`, {id:id});
    }
    return(
        <>
            <p>forums</p>
            <SearchBar placeholder={"search"}></SearchBar>
            <Table hover borderless className='songs' variant='dark'>
                <tbody>
                    {dummyData.map((forum, idx)=>{
                        return(
                            <tr onClick={()=>handleClick(forum.id)}>
                                <td className='rounded-left'>{idx}</td>
                                <td>{forum.name}</td>
                                <td className='rounded-right'>{forum.numPosts} posts</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </>
    )
}
export default AllForums;