import React, { useState } from 'react'
import './Login.css';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../Backend/firebase'
import { useDispatch } from 'react-redux';
import { userLogin } from '../../Redux/Slice/userReducer';

const Login = () => {

  const [error, setError] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState(''
  )
  const [loading, setLoading] = useState(false);

  const dispacth = useDispatch()

  const errored = (error) => {
    return error.split(':')[1]
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      setEmail('');
      setPassword('');

      dispacth(userLogin({

        email: userCredential.user.email

      }));

      setLoading(false);

    } catch (error) {

      setEmail('');
      setPassword('');
      setError(error.message);
      setLoading(false);
    }
  }



  return (
    <div className="login_screen">
      <img className="login__screen__image" src="/favicon_gmail.png" alt="" />

      <form onSubmit={handleLogin}>
        <h5>Login with your Credential</h5>
        <input type="email" required value={email} placeholder='Email...' onChange={(e) => setEmail(e.target.value)} />
        <input type="password" required value={password} placeholder='Password...' onChange={(e) => setPassword(e.target.value)} />
        <button className='login__button' type="submit">{loading ? 'Loading' : 'Login'}</button>

        {error && <span>
          {errored(error)}
        </span>}

        <span>New User ? <a href="/SignIn">SignIn</a></span>
      </form>

    </div>
  )
}

export default Login;