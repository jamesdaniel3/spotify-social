import React, {useEffect, useState} from 'react'
import Tabbing from '../components/Tabbing';
const TopSongs = () => {
    // fetch liked songs data
    const data = {short: [], medium: [], long: []} // assuming we can access short, medium, long term from one piece of data
    return(
        <>
            <Tabbing short = {data.short} medium = {data.medium} long = {data.long}></Tabbing>
        </>
    )
}
export default TopSongs;