import { Checkbox, IconButton } from '@mui/material';
import React from 'react';
import './EmailRow.css';
import CircleIcon from '@mui/icons-material/Circle';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { selectedMail } from '../../../Redux/Slice/composeReducer';
import useUnReadDeleteEmails from '../../customHooks/deleteUnreadEmails';

const EmailRow = ({ title, subject, description, time, id, unreadEmail }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { unreadDeleteMail } = useUnReadDeleteEmails();

  const handleMailDispatch = async () => {

    dispatch(selectedMail({
      id,
      title,
      subject,
      description,
      time
    }));

    navigate('/mail')

    if (unreadEmail) {
      await unreadDeleteMail(unreadEmail.id)
    }

  }


  return (
    <div onClick={handleMailDispatch} className='emailrow'>
      <div className="emailrow__options">
        <Checkbox />
        <IconButton>
          <StarBorderOutlinedIcon />
        </IconButton>
        <IconButton>
          {unreadEmail && <CircleIcon className='unread' />}
        </IconButton>

      </div>

      <h3 className="emailrow__title">
        {title}
      </h3>

      <div className="emailrow__message">
        <h4>
          {subject} -
          <span className="emailrow__description">{description}</span>
        </h4>
      </div>

      <p className="emailrow__time">
        {time}
      </p>

    </div >
  );
};

export default EmailRow;
