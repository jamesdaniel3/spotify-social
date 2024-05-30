import React from 'react';
import { Link } from "react-router-dom";
import imageUrl from "../icons/logo-cropped.png";
import '../styles/discover.css';
import Card from 'react-bootstrap/Card';
import axios from "axios";

const UserCard = ({ username, userId, currentUserId }) => {
  const handleAddToRecent = async (e) => {
    e.preventDefault();
    console.log(username, userId, currentUserId);
    try {
      if (username) {
        const body = {
          clickedUserId: userId,
        }
        await axios.put(`http://localhost:8888/posts/${currentUserId}`, body); 
      }; 
          // Assuming fetchData is declared elsewhere and re-fetches the user data.
          // fetchData();
        } catch (error) {
          console.error("Error updating recently seen:", error);
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
