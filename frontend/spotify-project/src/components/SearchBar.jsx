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
      //some handle search (handleSearch) functionality 
      //if if they enter then itll call ur handle function 
    }
  };

  return (
    <div className='search-container'>
      <img src={isFocused ? searchIconFocus : searchIcon} className='search-icon' />
      <input
        maxLength="100"
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