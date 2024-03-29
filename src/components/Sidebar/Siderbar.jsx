import React from 'react'
import './Sidebar.css';
import SidebarOptions from './SidebarOptions/SidebarOptions';


// icons package

import AddIcon from '@mui/icons-material/Add';
import { Button, IconButton } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import StarIcon from '@mui/icons-material/Star';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import NearMeIcon from '@mui/icons-material/NearMe';
import NoteIcon from '@mui/icons-material/Note';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PersonIcon from '@mui/icons-material/Person';
import DuoIcon from '@mui/icons-material/Duo';
import PhoneIcon from '@mui/icons-material/Phone';
import { useDispatch } from 'react-redux';
import { openCompose } from '../../Redux/Slice/composeReducer';
import useGetEmails from '../customHooks/getEmails';

const Siderbar = () => {

  const dispatch = useDispatch()

  const handleMenuClick = () => {
    dispatch(openCompose())
  }

  const [emails, unreadEmail] = useGetEmails()

  return (
    <div className='Sidebar' >
      <Button startIcon={<AddIcon className='sidebar__compose__icon' />} className='sidebar__compose'
        onClick={handleMenuClick}
      >
        Compose
      </Button>

      <div className="sidebar__options">
        <SidebarOptions Icon={InboxIcon} title='Inbox' number={
          unreadEmail.length || 0
        } selected={true} />
        <SidebarOptions Icon={StarIcon} title='Starred' number={54} />
        <SidebarOptions Icon={AccessTimeIcon} title='Snooze' number={54} />
        <SidebarOptions Icon={LabelImportantIcon} title='Important' number={54} />
        <SidebarOptions Icon={NearMeIcon} title='Sent' number={54} />
        <SidebarOptions Icon={NoteIcon} title='Draft' number={54} />
        <SidebarOptions Icon={ExpandMoreIcon} title='More' />
      </div>


      <div className="sidebar__footer">
        <div className="sidebar__footerIcons">
          <IconButton>
            <PersonIcon />
          </IconButton>
          <IconButton>
            <DuoIcon />
          </IconButton>
          <IconButton>
            <PhoneIcon />
          </IconButton>
        </div>
      </div>
    </div>
  )
}

export default Siderbar;