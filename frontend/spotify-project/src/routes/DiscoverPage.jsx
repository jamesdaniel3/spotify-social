import React, { useState, useEffect } from 'react';
import axios from "axios";
import '../styles/discover.css';
import UserCard from '../components/UserCard';
import Header from '../components/Header.jsx';
import ErrorIcon from '../icons/search-error-icon.png';

const DiscoverPage = ({ profileInfo }) => { 
  const [searchTerm, setSearchTerm] = useState("");
  const [allData, setAllData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8888/posts");
      setAllData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const createProfile = async () => {
    console.log(profileInfo.id);
    console.log(profileInfo.display_name);
    console.log(profileInfo.followers.total);
    const id = profileInfo.id;
    const display_name = profileInfo.display_name;
    const followers = profileInfo.followers.total;
    try {
      if (id && display_name && followers) {
        const body = {
          id: id,
          display_name: display_name,
          followers: followers,
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
      console.log(result);

      if (result.data.length === 0) {
        console.log("doesn't exist");
        createProfile();
      } else {
        console.log("exists");
      }
    } catch (error) {
      console.error("Error checking for user:", error);
    }
  };

  useEffect(() => {
    fetchData();
    checkForUser();
  }, []);

  const filteredData = allData.filter((val) => {
    if (searchTerm === "") {
      return val;
    } else if (val.display_name && val.display_name.toLowerCase().includes(searchTerm.toLowerCase())) {
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
                        <UserCard username={val.display_name} key={val.id} userId={val.id} />
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
              <div className='discover-subtitle'>recent searches</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DiscoverPage;
