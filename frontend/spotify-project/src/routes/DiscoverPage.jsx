import React, { useState, useEffect } from 'react';
import axios, { all } from "axios";

import '../styles/discover.css';
import UserCard from '../components/UserCard';
import NavBar from '../components/NavBar.jsx';
import SearchBar from '../components/SearchBar';

const DiscoverPage = () => {

  const initialUsers = [
    { display_name: 'John Doe', id: 1 },
    { display_name: 'Jane Smith', id: 2 },
    { display_name: 'rob Smith', id: 3 }
  ];
  
  const [searchTerm, setSearchTerm] = useState("");
  const [allData, setAllData] = useState(initialUsers); //array of user data 

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
    console.log(allData);
    allData.push
  }, []);


  // const userCards = Array.from({ length: 14 }, (_, index) => <UserCard key={index} />);

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
          <div className='discover-subtitle'>recent searches</div>

          <div className='card-container'>
            {filteredData.length > 0 ? (
              filteredData.map((val, key) => (
                <UserCard username={val.display_name}/>
              ))
            ) : (
              <div className='no-results'>None found</div>
            )}

          </div>
        </div>
      </div>
    </>
  )
}

export default DiscoverPage;
