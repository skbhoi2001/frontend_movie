import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { api_createUser } from '../../common/apiOperation';
import { setSessionStorageData } from '../../common/sessionStorageData';
import Styles from '../../../styles/auth.module.css';
import AuthCommon from './AuthCommon';

const UserSignup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    const signup = await api_createUser({ name, email, password });
    console.log('signup', signup);
    if (signup?.data?.statusId == 1) {
      setSessionStorageData('signupData', signup?.data?.user?.id);
      router.push('/auth/otpVerify');
    }
  };

  return (
    <div>
      <a href='/auth/signin'>Signin</a>
      <input type='text' onChange={(e) => setName(e.target.value)} />
      <input type='email' onChange={(e) => setEmail(e.target.value)} />
      <input type='password' onChange={(e) => setPassword(e.target.value)} />
      <button onClick={() => handleSignup()}>Signup</button>
    </div>
  );
};

export default UserSignup;
