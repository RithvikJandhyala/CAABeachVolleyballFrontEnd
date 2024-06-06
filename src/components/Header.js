import React, {} from 'react';
import './Navbar.css';
import { IconContext } from 'react-icons';
import pic from "./images/CAA.png";

function Header(props) {
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
            <h1 className='header'>
               <img src = {pic} className = 'caa2' alt = ""/>
              Tennis Platform
            </h1>
               
        </div>         
      </IconContext.Provider>
    </>
  );
}

export default Header;
