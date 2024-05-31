import React, {useEffect, useState} from 'react'
import LikedSongList from '../components/LikedSongList';
import Header from '../components/Header';
import LoadingIcon from '../icons/loading-icon.png';


const LikedSongs = ({ likedSongs }) => {
     const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if the data is loaded
        if (likedSongs.items ) {
        setLoading(false);
        }
    }, [likedSongs]);

    return(
        <>
            <Header title={"recently liked songs"} />
            <div className='main-container'>
                {loading ? (
                    <div className='loading-container'>
                        <img src={LoadingIcon} alt='Loading Icon' />
                        <p>Loading...</p>
                    </div>
                ) : (
                    <LikedSongList data={likedSongs.items}></LikedSongList>)}
            </div>
        </>
    )
}
export default LikedSongs;

