import React, {useEffect, useState} from 'react'
import Tabbing from '../components/Tabbing';
import Header from '../components/Header';

const TopSongs = ({ topSongsShort, topSongsMedium, topSongsLong }) => {
    console.log(topSongsShort);
    console.log(topSongsMedium);
    console.log(topSongsLong);

    return(
        <>
            <Header title={"top songs"}/>
            <div className='main-container'>
                {topSongsShort.items
                && topSongsMedium.items
                && topSongsLong.items
                && <Tabbing short = {topSongsShort.items} medium = {topSongsMedium.items} long = {topSongsLong.items}></Tabbing>}
            </div>
        </>
    )
}
export default TopSongs;