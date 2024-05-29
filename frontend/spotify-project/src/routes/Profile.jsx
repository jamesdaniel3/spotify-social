import React, { useState } from 'react';
import '../styles/profile.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const Profile = ({ profileInfo }) => {
  console.log('Profile data:', profileInfo);
  const [profile, setProfile] = useState({
    username: 'meetforge',
    bio: 'based in cville | muscially inclined.',
    favoriteGenres: 'indie, rock, pop',
    followers: 11,
    following: 30,
    topArtists: [
      { id: 1, name: 'artist name' },
      { id: 2, name: 'artist name' },
      { id: 3, name: 'artist name' },
      { id: 4, name: 'artist name' },
    ],
    topSongs: [
      { id: 1, title: 'song title' },
      { id: 2, title: 'song title' },
      { id: 3, title: 'song title' },
      { id: 4, title: 'song title' },
    ],
    likedSongs: [
      { id: 1, title: 'liked song title' },
      { id: 2, title: 'liked song title' },
    ],
    isPrivate: true,
    displayTopArtists: true,
    displayLikedSongs: true,
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: checked,
    }));
  };

  const handleSave = () => {
    console.log('Profile updated:', profile);
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-header" style={{ backgroundColor: '#D9D9D9' }}>
        <img className="profile-pic" src="forge-logo.png" alt="Forge Logo" />
        <div className="profile-info">
          <h2 className="username">
            {profile.isPrivate && <span className="lock-icon">🔒</span>}
            {profile.username}
          </h2>
          <p>{profile.followers} followers {profile.following} following</p>
          <p>{profile.bio}</p>
          <p>favorite genres: {profile.favoriteGenres}</p>
          <button className="edit-button" onClick={() => setIsEditing(true)}>
          edit profile
        </button>
        </div>
      </div>
      

      <Modal show={isEditing} onHide={() => setIsEditing(false)} dialogClassName="dark-modal">
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
            <Form.Control
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              name="username"
              value={profile.username}
              onChange={handleInputChange}
            />
          </InputGroup>

          <Form.Label htmlFor="basic-url">Bio</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              as="textarea"
              aria-label="Bio"
              name="bio"
              value={profile.bio}
              onChange={handleInputChange}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Favorite Genres"
              aria-label="Favorite Genres"
              name="favoriteGenres"
              value={profile.favoriteGenres}
              onChange={handleInputChange}
            />
          </InputGroup>

          <Form.Check
            type="checkbox"
            id="displayTopArtists"
            label="Display Top Artists"
            checked={profile.displayTopArtists}
            onChange={handleCheckboxChange}
            name="displayTopArtists"
            className="custom-checkbox"
          />
          <Form.Check
            type="checkbox"
            id="displayLikedSongs"
            label="Display Liked Songs"
            checked={profile.displayLikedSongs}
            onChange={handleCheckboxChange}
            name="displayLikedSongs"
            className="custom-checkbox"
          />
          <Form.Check
            type="checkbox"
            id="isPrivate"
            label="Make Profile Private"
            checked={profile.isPrivate}
            onChange={handleCheckboxChange}
            name="isPrivate"
            className="custom-checkbox"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsEditing(false)}>
            close
          </Button>
          <Button className="save-button" onClick={handleSave}>
            save changes
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="profile-content">
        <div className="top-artists">
          <h3>top artists</h3>
          <div className="artist-list">
            {profile.displayTopArtists && profile.topArtists.map((artist) => (
              <div className="artist-item" key={artist.id}>
                <div className="artist-pic"></div>
                <p>{artist.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="top-songs">
          <h3>top songs</h3>
          <div className="song-list">
            {profile.displayLikedSongs && profile.topSongs.map((song) => (
              <div className="song-item" key={song.id}>
                <div className="song-pic"></div>
                <p>{song.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
