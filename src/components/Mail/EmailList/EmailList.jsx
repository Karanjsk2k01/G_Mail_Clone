import React, { useEffect, useState } from 'react';
import './EmailList.css';


import { Checkbox, IconButton } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import RedoIcon from '@mui/icons-material/Redo';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import KeyboardHideIcon from '@mui/icons-material/KeyboardHide';
import SettingsIcon from '@mui/icons-material/Settings';
import Section from '../MailSection/Section';
import InboxIcon from '@mui/icons-material/Inbox';
import PeopleIcon from '@mui/icons-material/People';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import EmailRow from './EmailRow';


//firebase import
import { db } from '../../../Backend/firebase'
import { collection, onSnapshot } from "firebase/firestore";


const EmailList = () => {

  const [emails, setEmails] = useState([])

  useEffect(() => {

    const emailRef = collection(db, 'emails');

    const unsubcribe = onSnapshot(emailRef, (snap) => {

      const fetchedEmail = [];

      snap.forEach((doc) => {
        fetchedEmail.push({ id: doc.id, ...doc.data() })
      })

      setEmails(fetchedEmail)

    })


    return (() => {
      unsubcribe();
    })


  }, [])


  return (
    <div className='emaillist'>
      <div className="emaillist__container">
        <div className="emaillist__settings">
          <div className="emaillist__settingsLeft">
            <Checkbox />
            <IconButton>
              <ArrowDropDownIcon />
            </IconButton>
            <IconButton>
              <RedoIcon />
            </IconButton>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </div>
          <div className="emaillist__settingsRight">
            <IconButton>
              <ChevronLeftIcon />
            </IconButton>
            <IconButton>
              <ChevronRightIcon />
            </IconButton>
            <IconButton>
              <KeyboardHideIcon />
            </IconButton>
            <IconButton>
              <SettingsIcon />
            </IconButton>
          </div>
        </div>
        <div className="emailist__section">
          <Section Icon={InboxIcon} Title="Primary" Color="red" selected />
          <Section Icon={PeopleIcon} Title="Social" Color="#1A73E8" />
          <Section Icon={LocalOfferIcon} Title="Promotions" Color="green" />
        </div>
      </div>


      <div className="email_list">
        {emails.length > 0 ? (
          emails.map((item) => (
            <EmailRow
              key={item.id}
              id={item.id}
              title={item.to}
              subject={item.subject}
              description={item.message}
              time={item.timestamp}
            />
          ))
        ) : (
          <div className="no_emails">
            <img src="/No_Email.png" alt="image" />
            <h4>No Emails for you!!</h4>
          </div>

        )}
      </div>

    </div>
  );
};

export default EmailList;
