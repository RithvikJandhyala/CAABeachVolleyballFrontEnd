import React from 'react'
import {useNavigate} from "react-router-dom";
import './Profile.css';
import * as RiIcons from 'react-icons/ri';
import * as BiIcons from 'react-icons/bi';
const Profile = () => {
  const navigate=useNavigate();
  return (
    <div className='flex flex-col dropDownProfile'>
        <div className='flex flex col gap-4'>
          <h6 className='text'>
            <div style={{color: "black"}} className="text-center">{localStorage.firstName+" "+ localStorage.lastName }</div>
            <div className = "dropdown-button" onClick={()=>{navigate('/help')}}>
              <BiIcons.BiHelpCircle style = {{marginRight:3}} />
             Help
            </div>
            <div className = "dropdown-button" onClick={()=>{navigate('/'); localStorage.clear()}}>
              <RiIcons.RiLogoutBoxRLine />
                Log Out
            </div>
          </h6>
        </div>
    </div>
  )
}



export default Profile