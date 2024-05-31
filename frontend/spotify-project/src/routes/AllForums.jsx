import React, {useEffect, useState} from 'react'
import axios from "axios";
import SearchBar from '../components/SearchBar'
import Table from 'react-bootstrap/Table';
import '../styles/song-list.css'
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import ForumPostModal from '../components/ForumPostModal';

const AllForums = ({profileInfo,}) => {
    console.log(profileInfo)
    const [forums, setForums] = useState([]);
    useEffect(() => {
        fetchForums();
        sortForums();
      }, []);
    const fetchForums = async () => {
        try {
            const response = await axios.get("http://localhost:8888/forums");
            setForums(response.data);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };
    // order data by number of posts in a forum
    const sortForums = async () => {
        forums && forums.sort((a,b)=> a.threads.length-b.threads.length)
    }
    
    const navigate = useNavigate();
    const handleClick = (name, threads, id) =>{
        navigate(`/forums/${name}`, { state: {
            forumID:id,
            name:name,
        } });
    }
    return(
        <>
            <Header title={"forums"}/>
            <div className='main-container'>
                <Table borderless className='songs' variant='dark'>
                    <tbody>
                        {forums && forums.map((forum, idx)=>{
                            return(
                                <tr onClick={()=>handleClick(forum.name, forum.threads, forum.id)} key={idx}>
                                    <td className='rounded-left'>{idx+1}</td>
                                    <td>{forum.name}</td>
                                    <td className='rounded-right'>{forum.threads ? forum.threads.length : 0} posts</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        </>
    )
}
export default AllForums;