import React, {useEffect, useState} from 'react'
import SongList from '../components/SongList';
import Header from '../components/Header';

const LikedSongs = ({likedSongs}) => {
    console.log(likedSongs);
    return(
        <>
            <Header title={"liked songs"} searchPlaceholder={"search songs"}/>
            <div className='main-container'>
                <p>Liked Songs</p>
            </div>
        </>
    )
}
export default LikedSongs;
