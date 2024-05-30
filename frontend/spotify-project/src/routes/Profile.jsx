import React, {useEffect, useState} from 'react';
import '../styles/profile.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from "axios";

const Profile = ({ profileInfo }) => {
  const [firebaseInfo, setFirebaseInfo] = useState({});

  const handleImageClick = (url) => {
    window.open(url, '_blank');
  };

  useEffect(() => {
    const checkForUser = async () => {
      const id = profileInfo.id;

      try {
        const result = await axios.get(`http://localhost:8888/user/${id}`);
        setFirebaseInfo(result.data);
      } catch (error) {
        console.error("Error checking for user:", error);
      }
    };

    if(profileInfo){
      checkForUser()

      if(profileInfo.images.length === 0){
        profileInfo.images.push("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png")
      }

    }

  }, [profileInfo])

  console.log('Profile data:', profileInfo);
  console.log('Firebase data:', firebaseInfo)


  if(!firebaseInfo || !profileInfo){
    return <></>
  }

  return (
      <>
        <div className="profile-container">
          <div className={"profile-header"}>
            <img
                src={profileInfo.images[0]}
                alt={"profile picture"}
                className="profile-pic"
                onClick={() => handleImageClick(profileInfo.external_urls.spotify)}
            />
          </div>
          <div className={"profile-info"}>
            <h2 className={"username"} style={{color: "white"}}>{firebaseInfo.display_name}</h2>
            <p style={{color: "white"}}>{profileInfo.followers.total} followers</p>
          </div>
        </div>

        <div className="profile-content">
          <div className="top-artists">

          </div>
          <div className="top-songs">

          </div>
        </div>


      </>
  );
};

export default Profile;