import React, { useState } from 'react'
import './SignIn.css';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../Backend/firebase';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {

  const [error, setError] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState(''
  )
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const errored = (error) => {
    return error.split(':')[1]
  }

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      setEmail('');
      setPassword('');

      setLoading(false);

      setTimeout(() => {

        if (userCredential) {
          navigate('/login')
        }

      }, 3000);

    } catch (error) {

      setEmail('');
      setPassword('');
      setError(error.message);
      setLoading(false);
    }
  }

  return (
    <div className="SignIn_screen">
      <img className="SignIn__screen__image" src="/favicon_gmail.png" alt="" />
      <form onSubmit={handleSignIn}>
        <h5>Create User</h5>
        <input type="email" value={email} placeholder='Email...' onChange={(e) => setEmail(e.target.value)} />
        <input type="password" value={password} placeholder='Password...' onChange={(e) => setPassword(e.target.value)} />
        <button className='SignIn__button' type="submit">{loading ? 'Loading' : 'SignIn'}</button>

        {error && <span>
          {errored(error)}
        </span>}

        <span>Already a User ? <a href="/login">login</a></span>
      </form>

    </div>
  )
}

export default SignIn