import React from 'react'
import './SentMail.css';

import CloseIcon from '@mui/icons-material/Close';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { Button, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { closeCompose } from '../../../Redux/Slice/composeReducer';
import { useForm } from 'react-hook-form';
import { auth, db } from '../../../Backend/firebase'
import { collection, addDoc, doc } from 'firebase/firestore';


const SentMail = () => {

  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors } } = useForm();
  const emailValue = useSelector(state => state.user.user.email);

  const getCurrentTimestamp = () => {
    const currentDate = new Date();
    return currentDate.toISOString();
  };

  const handleClose = () => {
    dispatch(closeCompose())
  }



  const onSubmit = async (data) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userId = user.uid;
        const userDocRef = doc(db, 'users', userId);
        const emailCollectionRef = collection(userDocRef, 'emails');

        const docRef = await addDoc(emailCollectionRef, {
          to: data.to,
          subject: data.subject,
          message: data.message,
          timestamp: getCurrentTimestamp()
        });

        console.log("Document written with ID: ", docRef.id);
        dispatch(closeCompose());
      } else {
        // Handle case where no user is signed in
        console.error("No user signed in");
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };



  return (

    <div className='SentMail'>
      <div className="SentMail__header">
        <h3>New Message</h3>
        <IconButton>
          <CloseIcon className='SentMail__close' onClick={handleClose} />
        </IconButton>

      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name='to'
          type="email"
          placeholder="To"
          className='to'
          {...register("to", { required: "Recipient is required" })}
        />
        {errors.to && <div className='error_message'>{errors.to.message}</div>}

        <input
          name='subject'
          type="text"
          className='subject'
          placeholder="Subject"
          {...register("subject", { required: "Subject is required" })}
        />
        {errors.subject && <div className='error_message'>{errors.subject.message}</div>}

        <input
          name="message"
          type="text"
          placeholder="Message"
          className="SentMail__message"
          {...register("message", { required: "Message is required" })}
        />
        {errors.message && <div className='error_message'>{errors.message.message}</div>}

        <div className="SentMail__options">
          <Button
            startIcon={<KeyboardDoubleArrowRightIcon className='startIcon' />}
            className='sentMail__sent'
            type='submit'
          >Sent Mail</Button>
        </div>
      </form>

    </div>
  )
}

export default SentMail