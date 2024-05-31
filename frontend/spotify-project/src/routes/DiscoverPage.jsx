import React, { useState, useEffect } from 'react';
import axios from "axios";
import '../styles/discover.css';
import UserCard from '../components/UserCard';
import Header from '../components/Header.jsx';
import ErrorIcon from '../icons/search-error-icon.png';
import LoadingIcon from '../icons/loading-icon.png';

const DiscoverPage = ({ profileInfo }) => { 
  const [searchTerm, setSearchTerm] = useState("");
  const [allData, setAllData] = useState([]);
  const [currentUserData, setCurrentUserData] = useState({});
  const [recentlySeenUsers, setRecentlySeenUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userMap, setUserMap] = useState({}); // Initialize userMap state



  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8888/posts");
      setAllData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const createProfile = async () => {
    const id = profileInfo.id;
    const display_name = profileInfo.display_name;
    const followers = profileInfo.followers.total;
    let profilePicture = '';
    
    if (profileInfo.images.length === 0) {
      profilePicture = `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png`;
    } else {
      profilePicture = profileInfo.images[0];
    }
    
    try {
      if (id && display_name && followers) {
        const body = {
          id: id,
          display_name: display_name,
          followers: followers,
          profilePicture: profilePicture
        };
        await axios.post(`http://localhost:8888/user`, body);
      }
    } catch (error) {
      console.error("Error creating profile:", error);
    }
  };


  const checkForUser = async () => {
    const id = profileInfo.id;

    try {
      const result = await axios.get(`http://localhost:8888/user/${id}`);
      setCurrentUserData(result.data);

      if (result.data.length === 0) {
        createProfile();
      } else {
        fetchRecentlySeenUsers(result.data.recently_seen);
      }
    } catch (error) {
      console.error("Error checking for user:", error);
    }
  };

  const fetchRecentlySeenUsers = async (recentlySeen) => {
    try {
      setLoading(true);
      const newUserMap = {}; // Initialize a new userMap object

      if(recentlySeen[0] === ""){
        recentlySeen = recentlySeen.slice(1, recentlySeen.length)
      }

      // Fetch user data for each user ID in recentlySeen
      await Promise.all(recentlySeen.map(async (userId) => {
        const response = await axios.get(`http://localhost:8888/user/${userId}`);
        newUserMap[userId] = response.data; // Store response data in the newUserMap object
      }));

      setUserMap(newUserMap); // Update the userMap state with the newUserMap object
      setRecentlySeenUsers(recentlySeen); // Set the recentlySeenUsers state
    } catch (error) {
      console.error("Error fetching recently seen users:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchData();
    checkForUser();
  }, []);


  const filteredData = allData.filter((val) => {
    if (searchTerm === "") {
      return val;
    } else if (val.display_name.toLowerCase() && val.display_name.toLowerCase().includes(searchTerm.toLowerCase()) && !val.private_page) {
      return val;
    }
    return null;
  });

  return (
    <>
      <Header title={"discover"} searchPlaceholder={"search users"} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      <div className='main-container'>
        <div className='discover-page'>
          <div className='discover-body'>
            {searchTerm && (
              <div>
                {filteredData.length > 0 ? (
                  <div>
                    <div className='discover-subtitle'>top users</div>
                    <div className='card-container'>
                      {filteredData.map((val) => (
                        <UserCard key={val.id} username={val.display_name} userId={val.id} currentUserId={profileInfo.id}
                          profilePicture={val.profilePicture} />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className='error-container'>
                    <div className='error-container-inner'>
                      <img src={ErrorIcon} alt="Error Icon" className="error-image" />
                      <div className='no-results'>No users found with name: {searchTerm}</div>
                    </div>
                  </div>
                )}
              </div>
            )}
            {!searchTerm && (
              <div>
                <div className='discover-subtitle'>recent searches</div>
                
                  {loading ? (
                    <div className='loading-container'>
                      <img src={LoadingIcon} alt='Loading Icon' style={{height:"8rem", width:"8rem"}}/>
                      <p>Loading...</p>
                    </div>
                    
                  ) : (
                    recentlySeenUsers.length > 0 ? (
                        <div className='card-container'>  
                          {recentlySeenUsers.map((userId, index) => (
                            <UserCard key={index} username={userMap[userId].display_name} userId={userId} currentUserId={profileInfo.id}
                              profilePicture={userMap[userId].profilePicture} />
                          ))}
                        </div>
                      ) : (
                        <p>No recent searches.</p>
                      )
                  )}
                </div>
              
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DiscoverPage;
