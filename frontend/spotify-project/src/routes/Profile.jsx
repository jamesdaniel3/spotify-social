import React, {useEffect, useState} from 'react';
import '../styles/profile.css';
import ArtistList from '../components/ArtistList';
import SongList from "../components/SongList.jsx";
import axios from "axios";

const Profile = ({ profileInfo, topArtistsShort, topSongsShort}) => {
  const [firebaseInfo, setFirebaseInfo] = useState({});

  if(topArtistsShort.items && topSongsShort.items){
    topArtistsShort.items = topArtistsShort.items.slice(0, 5);
    topSongsShort.items = topSongsShort.items.slice(0, 5);
  }

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
          <h2 style={{justifyContent: "center"}}>Current Favorites</h2>
          <div className="top-artists">
            {topArtistsShort.items && <ArtistList data={topArtistsShort.items} />}
          </div>
          <div className="top-songs">
            {topSongsShort.items && <SongList data={topSongsShort.items} />}
          </div>
        </div>


      </>
  );
};

export default Profile;