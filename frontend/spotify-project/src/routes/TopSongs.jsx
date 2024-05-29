import React, {useEffect, useState} from 'react'
import Tabbing from '../components/Tabbing';
import Header from '../components/Header';

const TopSongs = ({ topSongsShort, topSongsMedium, topSongsLong }) => {
    console.log(topSongsShort);
    console.log(topSongsMedium);
    console.log(topSongsLong);
    // fetch liked songs data
    const dummyData = {short: [], medium: [], long: []} // assuming we can access short, medium, long term from one piece of data
    return(
        <>
            <Header title={"top songs"}/>
            <div className='main-container'>
                <Tabbing short = {dummyData.short} medium = {dummyData.medium} long = {dummyData.long}></Tabbing>
            </div>
        </>
    )
}
export default TopSongs;