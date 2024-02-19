import React from 'react'
import './Mail.css'
import { IconButton } from '@mui/material';



// icon import
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import MailIcon from '@mui/icons-material/Mail';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import PrintIcon from '@mui/icons-material/Print';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useDeleteEmails from '../customHooks/deleteEmails';


const Mail = () => {

  const navigate = useNavigate();
  const emailValue = useSelector(state => state.compose.selectMail);

  const { deleteMail } = useDeleteEmails();

  const handleDeleteMail = async () => {
    await deleteMail()
  }

  return (
    <div className="mail">
      <div className="mail__tools">
        <div className="mail__toolsleft">

          <IconButton onClick={() => { navigate('/') }}  >
            <ArrowBackIcon />
          </IconButton>

          <IconButton onClick={handleDeleteMail}>
            <DeleteIcon />
          </IconButton>

          <IconButton>
            <MailIcon />
          </IconButton>

          <IconButton>
            <WatchLaterIcon />
          </IconButton>

          <IconButton>
            <MoreVertIcon />
          </IconButton>

        </div>
        <div className="mail__toolsRight">

          <IconButton>
            <UnfoldMoreIcon />
          </IconButton>

          <IconButton>
            <PrintIcon />
          </IconButton>

          <IconButton>
            <ExitToAppIcon />
          </IconButton>

        </div>

      </div>

      <div className="mail_body">

        <div className="mail__bodyheader">
          <h2>{emailValue.subject}</h2>
          <LabelImportantIcon className='mail__important' />
          <p>{emailValue.title}</p>
          <p className='mail__time'>{emailValue.time}</p>
        </div>

        <div className="mail__message">
          <p>{emailValue.description}</p>
        </div>
      </div>

    </div>
  )
}

export default Mail;