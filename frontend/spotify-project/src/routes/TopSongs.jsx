import React, {useEffect, useState} from 'react'
import Tabbing from '../components/Tabbing';
const TopSongs = ({ topSongsShort, topSongsMedium, topSongsLong }) => {
    console.log(topSongsShort);
    console.log(topSongsMedium);
    console.log(topSongsLong);
    // fetch liked songs data
    const dummyData = {short: [], medium: [], long: []} // assuming we can access short, medium, long term from one piece of data
    return(
        <>
            <p>Top Songs</p>
            <Tabbing short = {dummyData.short} medium = {dummyData.medium} long = {dummyData.long}></Tabbing>
        </>
    )
}
export default TopSongs;