import React, { useEffect, useState } from 'react'
import '../styles/discover.css';

import SearchBar from '../components/SearchBar';
import useAuth from "../utils/useAuth.js";

let count = 0
import UserCard from '../components/UserCard';

const DiscoverPage = ({code}) => {
  if (!count){
    const accessToken = useAuth(code);
    count += 1
  }

  const userCards = Array.from({ length: 12 }, (_, index) => <UserCard key={index} />);


  return(
    <>
      <div className='discover-page'>
        <div className='header'>
          <div className='left-section'>
            <div className='discover-title'>discover</div>
          </div>

          <div className='center-section'>
            <SearchBar placeholder='Search users' />
          </div>

            <div>

            </div>

            </div>
          
        </div>

        <div className='discover-body'>
          <div className='discover-subtitle'>recent searches</div>

          <div className='card-container'>
            { userCards }

          </div>
          
        </div>
        
      </div>
      <p>{code}</p>
    </>
  )
}
export default DiscoverPage;