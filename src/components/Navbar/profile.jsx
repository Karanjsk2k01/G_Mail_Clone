import './profile.css'
import { Avatar, Button, IconButton } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import extractNameFromEmail from '../../Utils/extractNameFromEmail';
import { signOut } from 'firebase/auth';
import { auth } from '../../Backend/firebase';
import { userLogout } from '../../Redux/Slice/userReducer';

const Profile = ({ openProfile, setopenProfile }) => {

  const emailValue = useSelector(state => state.user.user)
  const dispatch = useDispatch()
  const profileName = extractNameFromEmail(emailValue.email)

  const handleOpen = () => {
    setopenProfile(prev => !prev)
  }

  const signOutHandler = (e) => {
    e.preventDefault();

    dispatch(userLogout())
    signOut(auth);

  }

  return (
    <div className={`${openProfile ? 'profile__active' : 'profile__deactive'}  `}>

      <div className="profile__email">

        <span className='email_section'>{emailValue.email}</span>
        <div className="profile__email__close">
          <IconButton onClick={handleOpen} >
            <CloseIcon />
          </IconButton>
        </div>

      </div>
      <div className="profile__container">

        <div className="profile__avatar">
          <Avatar className='avatar' />
        </div>

        <div className="profile__message">
          <span className='email_section'>Hi</span>
          <span className='email_section'>{profileName}</span>
        </div>
      </div>
      <div className="profile__button">

        <Button startIcon={<ExitToAppIcon className='icon' />} className="profile__button_MU" onClick={signOutHandler}>Sign Out</Button>
      </div>

    </div >
  )
}

export default Profile