import React, { useEffect, useState } from 'react'
import '../styles/discover.css';

import SearchBar from '../components/SearchBar';

const DiscoverPage = () => {

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
    </>
  )
}
export default DiscoverPage;