import { Checkbox, IconButton } from '@mui/material';
import React from 'react';
import './EmailRow.css';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import LabelImportantOutlinedIcon from '@mui/icons-material/LabelImportantOutlined';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { selectedMail } from '../../../Redux/Slice/composeReducer';

const EmailRow = ({ title, subject, description, time, id }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleMailDispatch = () => {

    dispatch(selectedMail({
      id,
      title,
      subject,
      description,
      time
    }))

    navigate('/mail')
  }




  return (
    <div onClick={handleMailDispatch} className='emailrow'>
      <div className="emailrow__options">
        <Checkbox />
        <IconButton>
          <StarBorderOutlinedIcon />
        </IconButton>
        <IconButton>
          <LabelImportantOutlinedIcon />
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
    </div>
  );
};

export default EmailRow;
