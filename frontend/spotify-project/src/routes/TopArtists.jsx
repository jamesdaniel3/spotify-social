import React from 'react';
import TabbingArtists from '../components/TabbingArtists';
import '../styles/topArtists.css'; // Ensure the correct path to your CSS file

const TopArtists = ( {artists}) => {
  console.log(artists[0]);
  console.log(artists[1]);
  console.log(artists[2]);

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
    <div className="top-artists-page">
      <h1 className="page-title">Top Artists</h1>
      <TabbingArtists short={data.short} medium={data.medium} long={data.long} />
    </div>
  );
};

export default TopArtists;
