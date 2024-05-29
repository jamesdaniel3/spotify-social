import React, { useEffect, useState } from 'react'
import '../styles/discover.css';

import UserCard from '../components/UserCard';
import Header from '../components/Header.jsx';

let count = 0

const DiscoverPage = () => {

  const userCards = Array.from({ length: 10 }, (_, index) => <UserCard key={index} />);

  return(
    <>
      <Header title={"discover"} searchPlaceholder={"search users"}/>
    <div className='main-container'>
      <div className='discover-page'>
        <div className='discover-body'>
          <div className='discover-subtitle'>recent searches</div>
          <div className='card-container'>
            {/* on click link to profile  */}
            { userCards }
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
export default DiscoverPage;