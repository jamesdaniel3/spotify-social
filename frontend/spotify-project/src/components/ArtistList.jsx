import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/artistList.css'; // Ensure the correct path to your CSS file

const ArtistList = ({ data }) => {
  return (
    <div className="container mt-4">
      <div className="row no-gutters artist-list">
        {data.map((artist, index) => (
          <div key={artist.id || index} className="col-6 col-sm-4 col-md-3 col-lg-2 mb-4">
            <div className="artist-card">
              <img src={artist.image} alt={artist.name} className="artist-image" />
              <div className="artist-name">{artist.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtistList;