import React, { useEffect, useState } from 'react'
import '../styles/discover.css';

import SearchBar from '../components/SearchBar';
import useAuth from "../utils/useAuth.js";

let count = 0

const DiscoverPage = ({code}) => {
  if (!count){
    const accessToken = useAuth(code);
    count += 1
  }


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
      <p>{code}</p>
    </>
  )
}
export default DiscoverPage;