import React, { useState } from 'react';
import './Header.css';
import Profile from './profile';

// icons import
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AppsIcon from '@mui/icons-material/Apps';
import NotificationsIcon from '@mui/icons-material/Notifications';
import TuneIcon from '@mui/icons-material/Tune';



export const Header = () => {

  const [openProfile, setopenProfile] = useState(false);

  const handleOpenProfile = () => {
    setopenProfile(prev => !prev)
  }

  return (
    <>
      <div className="headers">
        <div className="header__left">
          <IconButton>
            <MenuIcon />
          </IconButton>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfixXU_6fVS2xQgZ2SuTXFhJsAB80hcyf6y_tIJlYMMg&s" alt="G-mail" />
        </div>

        <div className="header__middle">
          <SearchIcon />
          <input type="text" placeholder='Search mail..' />
          <TuneIcon />
        </div>

        <div className="header__right">
          <IconButton>
            <AppsIcon />
          </IconButton>
          <IconButton>
            <NotificationsIcon />
          </IconButton>
          <IconButton onClick={handleOpenProfile}>
            <Avatar />
          </IconButton>
        </div>


      </div>
      <Profile openProfile={openProfile} setopenProfile={setopenProfile} />

    </>
  )
}
