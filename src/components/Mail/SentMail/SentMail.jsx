import React from 'react'
import './SentMail.css';

import CloseIcon from '@mui/icons-material/Close';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { Button, IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { closeCompose } from '../../../Redux/Slice/composeReducer';
import { useForm } from 'react-hook-form';
import useSentEmails from '../../customHooks/sentEmails';


const SentMail = () => {

  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { sendEmail } = useSentEmails()


  const handleClose = () => {
    dispatch(closeCompose())
  }



  const onSubmit = async (data) => {

    const result = await sendEmail(data);

    if (result.success) {
      handleClose();
    }
  }


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