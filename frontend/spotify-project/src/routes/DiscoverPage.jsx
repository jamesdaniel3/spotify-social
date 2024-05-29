import React, { useState, useEffect } from 'react';
import axios, { all } from "axios";

import '../styles/discover.css';
import UserCard from '../components/UserCard';
import NavBar from '../components/NavBar.jsx';
import SearchBar from '../components/SearchBar';

import ErrorIcon from '../icons/search-error-icon.png'

const DiscoverPage = () => { 
  const [searchTerm, setSearchTerm] = useState("");
  const [allData, setAllData] = useState([]); //array of user data 

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8888/posts");
      setAllData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    // console.log(allData);
  }, []);


  const filteredData = allData.filter((val) => {
    if (searchTerm === "") {
      return val;
    } else if (val.display_name && val.display_name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return val;
    }
    return null;
  });

  return(
    <>
      <div className='discover-page'>
        <div className='header'>
          <div className='left-section'>
            <div className='discover-title'>discover</div>
          </div>

          <div className='center-section'>
            <SearchBar 
              placeholder='Search users' 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm} 
            />
          </div>

          <div></div>
        </div>
        <div className='discover-body'>
          {searchTerm && (
            <div>
              {filteredData.length > 0 ? (
                <div>
                  <div className='discover-subtitle'>top users</div>
                  <div className='card-container'>
                  </div>
                  
                  {filteredData.map((val, key) => (
            
                    <UserCard username={val.display_name} key={key} />
                    
                  ))}
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
    </>
  )
}

export default DiscoverPage;
