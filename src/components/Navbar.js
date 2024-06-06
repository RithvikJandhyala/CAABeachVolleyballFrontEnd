import React, { useState} from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import './Profile.css';
import { IconContext } from 'react-icons';
import pic from "./images/CAA.png";
import IdleModal from '../pages/IdleModal';
import { useIdleTimer } from 'react-idle-timer';
import Profile from './Profile.js';
import {useNavigate} from "react-router-dom";

function Navbar(props) {
  const [sidebar, setSidebar] = useState(false);
  const [openProfile,setOpenProfile] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const [idle, setIdle] = useState(false);
  const navigate=useNavigate();
  const handleIdle = () => {setIdle(true);};
  useIdleTimer({
    timeout: 1000 * 300,
    onIdle: handleIdle,
  });
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar' 
        //ref={menuRef}
        >
        <IdleModal idle={idle} setIdle={setIdle}></IdleModal>
            <h1 className='header' style={{marginBottom:'0rem', width: 600}}>
              <FaIcons.FaBars className='menu-bars' onClick={showSidebar} />{' '}
              <img src = {pic} className = 'caa' onClick={()=>{ (localStorage.role !== 'Admin')? navigate('/home') : navigate('/all-players')}} alt="" style={{  
                width:80,height:32, maxWidth: "40%",
                maxHeight: "40",marginRight: '2%',marginLeft: '2%',top:'-2px',position: 'relative',cursor:'pointer'
              }}/>
              
               {(localStorage.role === "Admin")? 'Beach Volleyball Admin' : 'Beach Volleyball'} 
            </h1>
            <div style={{width: 45,height:45, marginRight: 20,cursor: 'pointer',color:'white',fontSize:20}} className = "icon-button"onClick = {()=> setOpenProfile
            ((prev) => !prev)} >{localStorage.firstName !== undefined?localStorage.firstName.substring(0,1)+""+localStorage.lastName.substring(0,1):""}
            </div>
            {openProfile &&  <Profile/>}   
           
                
        </div>
        
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar} style={{paddingLeft:'1rem'}}>
            <li className='navbar-toggle'>
              <Link to='#' className='x-button'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                
                  <Link to={item.path} >
                  <div style={{marginTop:12,marginLeft:5}}>{item.icon}</div>
                    <span style={{marginTop:7}}>{item.title}</span>
                  </Link>
                 
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
