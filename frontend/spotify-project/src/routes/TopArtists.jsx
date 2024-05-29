import React from 'react';
import TabbingArtists from '../components/TabbingArtists';
import '../styles/topArtists.css'; 
import Header from '../components/Header';
import Tabbing from "../components/Tabbing.jsx";


const TopArtists = ({ topArtistsShort, topArtistsMedium, topArtistsLong }) => {
  console.log(topArtistsShort);
  console.log(topArtistsMedium);
  console.log(topArtistsLong);


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