import React from 'react';

const SongList = ({data}) => {
    return (
        <>
            {data.map((song)=>{
                return (
                    <>
                        <p>{song.title}</p>
                        <p>{song.album}</p>
                        <p>{song.img}</p>
                        <p>{song.artist}</p>
                    </>
                )
            })}
        </>
    )
}
export default SongList;