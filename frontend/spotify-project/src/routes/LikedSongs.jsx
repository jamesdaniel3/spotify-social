import React, {useEffect, useState} from 'react'
import SongList from '../components/SongList';

const LikedSongs = () => {
    const dummyData = [];
    return(
        <>
            <p>Liked Songs</p>
            <SongList data={dummyData}></SongList>
        </>
    )
}
export default LikedSongs;
