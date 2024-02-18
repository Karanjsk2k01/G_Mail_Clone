import './App.css';
import Mail from './components/Mail/Mail';
import SignIn from './components/Auth/SignIn'
import EmailList from './components/Mail/EmailList/EmailList';
import { Header } from './components/Navbar/Header';
import Siderbar from './components/Sidebar/Siderbar';
import { Routes, Route, Navigate } from 'react-router-dom';
import SentMail from './components/Mail/SentMail/SentMail';
import { useDispatch, useSelector } from 'react-redux';
import Login from './components/Auth/Login';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Backend/firebase';
import { userLogin } from './Redux/Slice/userReducer';

function App() {
  const isOpen = useSelector(state => state.compose.isOpen);
  const user = useSelector(state => state.user.user);

  const dispatch = useDispatch()

  useEffect(() => {

    onAuthStateChanged(auth, (user) => {

      if (user) {
        dispatch(userLogin({
          email: user.email
        }))
      }
      else {
        return;
      }

    })
  }, [])

  return (
    <>
      <div className='app'>
        {user && <Header />}
        <div className='app_body'>
          {user && <Siderbar />}
          <Routes>
            {user ? (
              <>
                <Route path='/mail' element={<Mail />} />
                <Route path='/' element={<EmailList />} />
                <Route path='/login' element={<Navigate to="/" />} />
                <Route path='/Signin' element={<Navigate to="/" />} />
              </>
            ) : (
              <>
                <Route path='/mail' element={<Navigate to="/login" />} />
                <Route path='/' element={<Navigate to="/login" />} />
              </>
            )}
            {!user && <Route path='/login' element={<Login />} />}
            {!user && <Route path='/Signin' element={<SignIn />} />}
          </Routes>
          {isOpen && <SentMail />}
        </div>

      </div>
    </>
  );
}

export default App;
