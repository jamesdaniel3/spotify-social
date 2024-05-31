import React, { useState, useEffect } from 'react';
import TabbingArtists from '../components/TabbingArtists';
import '../styles/topArtists.css';
import Header from '../components/Header';
import LoadingIcon from '../icons/loading-icon.png';

const TopArtists = ({ topArtistsShort, topArtistsMedium, topArtistsLong }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the data is loaded
    if (topArtistsShort.items && topArtistsMedium.items && topArtistsLong.items) {
      setLoading(false);
    }
  }, [topArtistsShort, topArtistsMedium, topArtistsLong]);

  return (
    <>
      <Header title={"top artists"} />
      <div className='main-container'>
        {loading ? (
          <div className='loading-container'>
            <img src={LoadingIcon} alt='Loading Icon'/>
            <p>Loading...</p>
          </div>
        ) : (
          <TabbingArtists
            short={topArtistsShort.items}
            medium={topArtistsMedium.items}
            long={topArtistsLong.items}
          />
        )}
      </div>
    </>
  );
};

export default TopArtists;
