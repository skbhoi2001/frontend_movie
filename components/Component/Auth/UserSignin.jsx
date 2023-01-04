import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { api_signIn } from '../../common/apiOperation';
import Styles from '../../../styles/auth.module.css';
import AuthCommon from './AuthCommon';

import { TextField } from '@mui/material';

const UserSignin = () => {
  const [cookieData, setCookieData] = useCookies();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInModel, setSignInModel] = useState(true);
  const [signUpModel, setSignUpModel] = useState(false);

  const handleSignup = () => {
    setSignInModel(false);
    setSignUpModel(true);
  };
  const handleSignin = () => {
    setSignInModel(true);
    setSignUpModel(false);
  };

  const handleLogin = async () => {
    const signin = await api_signIn({ email, password });
    console.log('signin', signin);
    if (signin?.data?.statusId == 1) {
      setCookieData('userid', signin?.data?.user?.id);
      setCookieData('usertoken', signin?.data?.user?.token);
      setCookieData('username', signin?.data?.user?.name);
      setCookieData('useremail', signin?.data?.user?.email);
      setCookieData('userrole', signin?.data?.user?.role);
      setCookieData('userstatus', signin?.data?.user?.isVerified);
      router.push('/');
    }
  };

  return (
    <div className={Styles.signupContainer}>
      <div className={Styles.sidebarContainer}>
        <AuthCommon />
      </div>
      {signInModel && (
        <div className={Styles.authContainer}>
          <div className={`fontType0 ${Styles.userSigninText}`}>
            User Sign-In
          </div>
          <TextField
            label='Email'
            id='outlined-basic'
            variant='outlined'
            onChange={(e) => setEmail(e.target.value)}
            className={Styles.textContainer}
          />
          <TextField
            id='outlined-basic'
            label='Password'
            variant='outlined'
            onChange={(e) => setPassword(e.target.value)}
            className={Styles.textContainer}
          />
          <button
            className={`globalButton ${Styles.authBtn}`}
            onClick={() => handleLogin()}
          >
            Signin
          </button>
          <div className={Styles.forgot_create_acc}>
            <div className='fontType1'>Forgot Password</div>
            <div className='fontType2' onClick={() => handleSignup()}>
              New User - <span className='fontType3'>Create Account</span>
            </div>
          </div>
        </div>
      )}
      {signUpModel && (
        <div className={Styles.authContainer}>
          <div className={`fontType0 ${Styles.userSigninText}`}>
            User Sign-In
          </div>
          <TextField
            label='Email'
            id='outlined-basic'
            variant='outlined'
            onChange={(e) => setEmail(e.target.value)}
            className={Styles.textContainer}
          />
          <TextField
            id='outlined-basic'
            label='Password'
            variant='outlined'
            onChange={(e) => setPassword(e.target.value)}
            className={Styles.textContainer}
          />
          <button
            className={`globalButton ${Styles.authBtn}`}
            onClick={() => handleLogin()}
          >
            Signin
          </button>
          <div className={Styles.forgot_create_acc}>
            <div className='fontType1'>Forgot Password</div>
            <div className='fontType2'>
              New User - <span className='fontType3'>Create Account</span>
            </div>
          </div>
          <a href='/auth/forgotPassword'></a>
        </div>
      )}
    </div>
  );
};

export default UserSignin;
