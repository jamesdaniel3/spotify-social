import React, { useEffect, useState } from 'react'
import '../styles/discover.css';

import searchIconFocus from '../icons/search-icon-focus.png';
import searchIcon from '../icons/search-icon.png';

const DiscoverPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  return(
    <>
      <div className='discover-page'>
        <div className='header'>
          <div className='left-section'>
            <div className='discover-title'>discover</div>
          </div>

          <div className='center-section'>
            <div className='search-container'>
              <img src={isFocused ? searchIconFocus : searchIcon} className='search-icon' />
              <input
                maxLength="100"
                placeholder='Search users'
                className='search-box'
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
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