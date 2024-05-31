import React, {useEffect, useState} from 'react'
import LikedSongList from '../components/LikedSongList';
import Header from '../components/Header';

const LikedSongs = ({likedSongs}) => {
    return(
        <>
            <Header title={"recently liked songs"} searchPlaceholder={"search songs"}/>
            <div className='main-container'>
                {likedSongs.items && <LikedSongList data = {likedSongs.items}></LikedSongList>}
            </div>
        </>
    )
}
export default LikedSongs;

