import React from 'react';
import Table from 'react-bootstrap/Table';
import '../styles/song-list.css'

const SongList = ({data}) => {
  return (
    <div className='tableDiv'>
      <Table borderless className='songs bigger-screens' variant='dark'>
      {/*
      I commented out table header:
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
          {data.map((song, idx)=>{
            return(
              <tr>
                  <td className='rounded-left'>{idx+1}</td>
                  <td>
                    <img src = {song.album.images[0].url}/>
                  </td>
                  <td>{song.name}</td>
                  <td>{song.album.name}</td>
                  <td className='rounded-right'>
                    {song.artists.map((artist, idx)=>{
                        if (idx !==song.artists.length-1){
                          return `${artist.name}, `
                        } else {
                          return `${artist.name}`
                        }
                    })}
                  </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
      <Table borderless className='songs smaller-screens' variant='dark'>
        <tbody>
        {data.map((song, idx)=>{
            return(
              <tr>
                  <td className='rounded-left'>{idx}</td>
                  <td>
                    <img src = {song.album.images[0].url}/>
                  </td>
                  <td>{song.name}</td>
                  <td className='rounded-right'>
                    {song.artists.map((artist, idx)=>{
                        if (idx !==song.artists.length-1){
                          return `${artist.name}, `
                        } else {
                          return `${artist.name}`
                        }
                    })}
                  </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default SongList;