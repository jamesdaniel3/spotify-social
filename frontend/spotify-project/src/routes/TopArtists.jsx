import React from 'react';
import TabbingArtists from '../components/TabbingArtists';
import '../styles/topArtists.css'; 
import Header from '../components/Header';


const TopArtists = ({ topArtistsShort, topArtistsMedium, topArtistsLong }) => {
  return (
      <>
        <Header title={"top artists"}/>
        <div className='main-container'>
          {topArtistsShort.items
              && topArtistsMedium.items
              && topArtistsLong.items
              && <TabbingArtists short = {topArtistsShort.items} medium = {topArtistsMedium.items} long = {topArtistsLong.items}></TabbingArtists>}
        </div>
      </>
  );
};

export default TopArtists;