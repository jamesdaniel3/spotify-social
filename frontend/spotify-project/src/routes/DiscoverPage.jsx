import React, { useEffect, useState } from 'react'
import '../styles/discover.css';

import searchIcon from '../icons/search-icon.png';

const DiscoverPage = () => {
    
  const [searchTerm, setSearchTerm] = useState("");
  return(
    <>
      <div className='discover-page'>
        <div className='header'>
          <div className='left-section'>
            <button>...</button>
            <div className='discover-title'>discover</div>
          </div>

          <div className='center-section'>
            <div className='search-container'>
              <img src={searchIcon} className='search-icon'/>
            <input
              maxLength="100"
              placeholder='Search users'
              className='search-box'
              type="text"
              value={searchTerm} 
              onChange={(e) => {
                setSearchTerm(e.target.value); }}
              />
            </div>
            

          </div>

            <div>
              
            </div>
          
        </div>
        
      </div>
    </>
  )
}
export default DiscoverPage;