import React from 'react';
import SearchBar from './SearchBar';
import NavBar from './NavBar';
import '../styles/header.css'

const Header = ({title, searchPlaceholder, forForums}) => {
    if (forForums){
        return (
            <div className='stacked'>
            <div className='header'>
                <div className='navbtn-title'>
                  <NavBar></NavBar>
                  <div className='page-title' style={{marginBottom:0}}><p>{title}</p></div>
                </div>
                {searchPlaceholder && <SearchBar placeholder={searchPlaceholder} />}
            </div>
            </div>
        )
    } else {
        return(
            <div className='header'>
                <div className='navbtn-title'>
                  <NavBar></NavBar>
                  <div className='page-title' style={{marginBottom:0}}><p>{title}</p></div>
                </div>
                {searchPlaceholder && <SearchBar placeholder={searchPlaceholder} />}
            </div>
        )
    }
}
export default Header;