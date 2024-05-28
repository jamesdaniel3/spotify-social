import React, { useEffect, useState } from 'react'
import searchIconFocus from '../icons/search-icon-focus.png';
import searchIcon from '../icons/search-icon.png';
import '../styles/search.css';



const SearchBar = ({placeholder, handleSearch}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      console.log("entered");
      //some handle search functionality - handleSearch(searchTerm);
      //if they enter then itll call ur handle function 
    }
  };

  return (
    <div className='search-container'>
      <button className='search-icon-container'>
        <img src={isFocused ? searchIconFocus : searchIcon} className='search-icon' alt='Search Icon'/>
        {/* onClick={handleSearch(searchTerm)} */}
        <div className='icon-tooltip'>Search</div>
      </button>

      <input
        maxLength="50"
        placeholder={placeholder}
        className='search-box'
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyPress}
      />
    </div>
  )
}

export default SearchBar