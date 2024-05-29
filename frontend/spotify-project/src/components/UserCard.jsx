import React from 'react'
import { Link } from "react-router-dom";

import imageUrl from "../icons/logo-cropped.png"
import '../styles/discover.css';

import Card from 'react-bootstrap/Card';


const UserCard = ({ username, key }) => {
  
  const handleAddToRecent = () => {
    console.log(username)
  }

  return (
    <Card id='user-card'>
      <Link key={key} to={`/profile`} className='profile-link'
      onClick={handleAddToRecent}>
        {/* ${username}` */}
        <div className='top-container'>
          <div className="circle-container">
            <img src={imageUrl} alt="User Profile" className="profile-image" />
          </div>
        </div>
        
        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
        <Card.Body id='card-body'>
          <Card.Title id='card-title'>{username}</Card.Title>
          <Card.Text id='card-text'>
            Profile
          </Card.Text>
      </Card.Body>
      </Link>
    </Card>

  )
}

export default UserCard