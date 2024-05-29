import React from 'react';
import Table from 'react-bootstrap/Table';
import '../styles/song-list.css'

const SongList = ({data}) => {
    const handleImageClick = (url) => {
        window.open(url, '_blank');
    };

  return (
    <div className='tableDiv'>
      <Table borderless className='songs bigger-screens' variant='dark'>
        <tbody>
          {data.map((song, idx)=>{
            return(
              <tr>
                  <td className='rounded-left'>{idx+1}</td>
                  <td>
                    <img src = {song.album.images[0].url}
                         onClick={() => handleImageClick(song.album.external_urls.spotify)}/>
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
                    <img src = {song.album.images[0].url}
                         onClick={() => handleImageClick(song.album.external_urls.spotify)}
                    />
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