import React from 'react';
import Table from 'react-bootstrap/Table';
import '../styles/song-list.css'

const SongList = (props) => {
    const dummyData = [
        {
            title: "The Adults Are Talking",
            img: "https://upload.wikimedia.org/wikipedia/en/f/f8/The_Strokes_-_The_New_Abnormal.png",
            album: "The New Abnormal",
            artist: "The Strokes"
        },
        {
            title: "Gnaw",
            img: "https://i.scdn.co/image/ab67616d0000b27352d77e720679ad0b4a95c784",
            album: "Race",
            artist: "Alex G"
        },
        {
            title: "Duck Or Ape",
            img: "https://i.scdn.co/image/ab67616d0000b273d72f734a66c2b545facd7517",
            album: "I Can't Handle Change",
            artist: "Roar"
        },
    ]
  return (
    <Table borderless className='songs' variant='dark'>
      {/*
      maybe delete the header?
      <thead>
        <tr className='head'>
          <th>#</th>
          <th>Title</th>
          <th>Album</th>
          <th>Artist</th>
        </tr>
      </thead>
      */}
      <tbody>
        {dummyData.map((song, idx)=>{
            return(
                <tr>
                    <td className='rounded-left'>{idx}</td>
                    <td>
                      <img src = {song.img}/>
                        {song.title}
                    </td>
                    <td>{song.album}</td>
                    <td className='rounded-right'>{song.artist}</td>
                </tr>
            )
        })}
      </tbody>
    </Table>
  );
}

export default SongList;