import React, {useEffect, useState} from 'react'
import Tabbing from '../components/Tabbing';
import Header from '../components/Header';
import LoadingIcon from '../icons/loading-icon.png';

const TopSongs = ({ topSongsShort, topSongsMedium, topSongsLong }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if the data is loaded
        if (topSongsShort.items && topSongsMedium.items && topSongsLong.items) {
        setLoading(false);
        }
    }, [topSongsShort, topSongsMedium, topSongsLong]);
    
    // console.log(topSongsMedium)
    return(
        <>
            <Header title={"top songs"}/>
            <div className='main-container'>
                {loading ? (
                    <div className='loading-container'>
                        <img src={LoadingIcon} alt='Loading Icon' />
                        <p>Loading...</p>
                    </div>) : (
                        <Tabbing
                            short={topSongsShort.items}
                            medium={topSongsMedium.items}
                            long={topSongsLong.items}></Tabbing>)}
            </div>
        </>
    )
}
export default TopSongs;