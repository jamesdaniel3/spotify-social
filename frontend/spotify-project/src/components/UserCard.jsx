import React from 'react';
import { Link } from "react-router-dom";
import imageUrl from "../icons/logo-cropped.png";
import '../styles/discover.css';
import Card from 'react-bootstrap/Card';
import axios from "axios";

const UserCard = ({ username, userId }) => {
  const handleAddToRecent = async (e) => {
    e.preventDefault();
    console.log(username, userId);
    if (username) {
      const body = {
        recently_seen: username, // Correctly send username in the body
      };
      try {
        await axios.put(`http://localhost:8888/posts/${userId}`, body); // Ensure `userId` matches the backend parameter
        // Assuming fetchData is declared elsewhere and re-fetches the user data.
        // fetchData();
      } catch (error) {
        console.error("Error updating recently seen:", error);
      }
    }
  };

  return (
    <Card id='user-card'>
      <div onClick={handleAddToRecent}>
        <Link to={`/profile`} className='profile-link'>
          <div className='top-container'>
            <div className="circle-container">
              <img src={imageUrl} alt="User Profile" className="profile-image" />
            </div>
          </div>
          <Card.Body id='card-body'>
            <Card.Title id='card-title'>{username}</Card.Title>
            <Card.Text id='card-text'>
              Profile
            </Card.Text>
          </Card.Body>
        </Link>
      </div>
    </Card>
  );
};

export default UserCard;
