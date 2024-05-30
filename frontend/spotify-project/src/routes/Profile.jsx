import React, { useState } from 'react';
import '../styles/profile.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Header from '../components/Header';
import LockIcon from '../icons/lock-icon.svg';
import Card from 'react-bootstrap/Card';
import imageUrl from "../icons/logo-cropped.png";
import forgeLogo from '../icons/forge-logo.png';


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
      { id: 5, name: 'artist name' },
    ],
    topSongs: [
      { id: 1, title: 'song title' },
      { id: 2, title: 'song title' },
      { id: 3, title: 'song title' },
      { id: 4, title: 'song title' },
      { id: 5, title: 'song title' },
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
      <Header title={"your profile"} />

      <div className="profile-header" style={{ backgroundColor: '#D9D9D9' }}>
        <img className="profile-pic" src={forgeLogo} alt="Forge Logo" />
        <div className="profile-info">
          <h2 className="username">
            {profile.isPrivate && <img src={LockIcon} alt="Lock Icon" />}
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
          <div className="card-container">
            {profile.topArtists.map(artist => (
              <Card key={artist.id} id='user-card'>
                <div className='top-container'>
                  <div className="circle-container">
                    <img src={imageUrl} alt="User Profile" className="profile-image" />
                  </div>
                </div>
                <Card.Body id='card-body'>
                  <Card.Title id='card-title'>{artist.name}</Card.Title>
                  <Card.Text id='card-text'>profile</Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="top-songs">
          <h3>top songs</h3>
          <div className="card-container">
            {profile.topSongs.map(song => (
              <Card key={song.id} id='user-card'>
                <div className='top-container'>
                  <div className="circle-container">
                    <img src={imageUrl} alt="User Profile" className="profile-image" />
                  </div>
                </div>
                <Card.Body id='card-body'>
                  <Card.Title id='card-title'>{song.title}</Card.Title>
                  <Card.Text id='card-text'>artist name</Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
