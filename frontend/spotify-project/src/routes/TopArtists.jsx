import React from 'react';
import TabbingArtists from '../components/TabbingArtists';
import '../styles/topArtists.css'; 
import Header from '../components/Header';


const TopArtists = ({ topArtistsShort, topArtistsMedium, topArtistsLong }) => {
  console.log(topArtistsShort);
  console.log(topArtistsMedium);
  console.log(topArtistsLong);

  // Placeholder data
  const data = {
    short: [
      { name: 'Aurora', image: 'https://via.placeholder.com/100' },
      { name: 'The Beatles', image: 'https://via.placeholder.com/100' },
    ],
    medium: [
      { name: 'Fleet Foxes', image: 'https://via.placeholder.com/100' },
      { name: 'Michael Jackson', image: 'https://via.placeholder.com/100' },
    ],
    long: [
      { name: 'Alex G', image: 'https://via.placeholder.com/100' },
      { name: 'Aurora', image: 'https://via.placeholder.com/100' },
    ],
  };

  return (
    <>
    <Header title={"top artists"}/>
    <div className="top-artists-page">
      <TabbingArtists short={data.short} medium={data.medium} long={data.long} />
    </div>

    </>

  );
};

export default TopArtists;