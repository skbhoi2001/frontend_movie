import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import {
  api_createUser,
  api_forgotPassword,
  api_resendEmailVerifification,
  api_signIn,
  api_verifyUser,
} from '../../common/apiOperation';
import Styles from '../../../styles/auth.module.css';
import AuthCommon from './AuthCommon';

import { TextField } from '@mui/material';
import {
  getSessionStorageData,
  setSessionStorageData,
} from '../../common/sessionStorageData';

const UserAuth = () => {
  const [cookieData, setCookieData] = useCookies();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInModel, setSignInModel] = useState(true);
  const [signUpModel, setSignUpModel] = useState(false);
  const [otpModal, setOtpModal] = useState(false);
  const [forgotModal, setForgotModal] = useState(false);
  const [otp, setOtp] = useState('');
  const userId = getSessionStorageData('signupData');

  const handleSignupUi = () => {
    setSignInModel(false);
    setSignUpModel(true);
  };
  const handleSigninUi = () => {
    setSignInModel(true);
    setSignUpModel(false);
  };
  const handleForgotui = () => {
    setSignUpModel(false);
    setSignInModel(false);
    setOtpModal(false);
    setForgotModal(true);
  };
  const handleOtpUi = () => {
    setSignUpModel(false);
    setSignInModel(false);
    setOtpModal(true);
  };
  const handleOtpSubmit = async () => {
    const otpVerify = await api_verifyUser({
      userId: userId,
      OTP: otp,
    });
    if (otpVerify?.data?.statusId == 1) {
      setCookieData('userid', otpVerify?.data?.user?.id);
      setCookieData('usertoken', otpVerify?.data?.user?.token);
      setCookieData('username', otpVerify?.data?.user?.name);
      setCookieData('useremail', otpVerify?.data?.user?.email);
      setCookieData('userrole', otpVerify?.data?.user?.role);
      setCookieData('userstatus', otpVerify?.data?.user?.isVerified);
      router.push('/');
    }
  };

  const handleLogin = async () => {
    const signin = await api_signIn({ email, password });
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
  const handleSignup = async () => {
    const signup = await api_createUser({ name, email, password });
    if (signup?.data?.statusId == 1) {
      setSessionStorageData('signupData', signup?.data?.user?.id);
      handleOtpUi();
    }
  };

  const handleSendForgotLink = async () => {
    const handle = await api_forgotPassword({ email });
    if (handle?.data?.statusId == 1) {
      alert(handle?.data?.message);
      router.push('/');
    }
  };
  const handleResend = async () => {
    const resend = await api_resendEmailVerifification({ userId });
    if (resend?.data?.statusId == 1) {
      alert(resend?.data?.message);
    } else {
      alert(resend?.message);
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
            <div
              className='fontType1'
              style={{ cursor: 'pointer' }}
              onClick={() => handleForgotui()}
            >
              Forgot Password
            </div>
            <div
              className='fontType2'
              style={{ cursor: 'pointer' }}
              onClick={() => handleSignupUi()}
            >
              New User - <span className='fontType3'>Create Account</span>
            </div>
          </div>
        </div>
      )}
      {signUpModel && (
        <div className={Styles.authContainer}>
          <div className={`fontType0 ${Styles.userSigninText}`}>
            User Sign-Up
          </div>
          <TextField
            label='Full Name'
            id='outlined-basic'
            variant='outlined'
            onChange={(e) => setName(e.target.value)}
            className={Styles.textContainer}
          />
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
            onClick={() => handleSignup()}
          >
            Signin
          </button>

          <div className={Styles.forgot_create_acc}>
            <div className='fontType1'>Forgot Password</div>
            <div
              className='fontType2'
              style={{ cursor: 'pointer' }}
              onClick={() => handleSigninUi()}
            >
              Existing User - <span className='fontType3'>Signin</span>
            </div>
          </div>
          <a href='/auth/forgotPassword'></a>
        </div>
      )}
      {otpModal && (
        <div className={Styles.authContainer}>
          <div className={`fontType0 ${Styles.userSigninText}`}>OTP</div>
          <TextField
            label='Enter Otp'
            id='outlined-basic'
            variant='outlined'
            onChange={(e) => setOtp(e.target.value)}
            className={Styles.textContainer}
          />
          <button
            className={`globalButton ${Styles.authBtn}`}
            onClick={() => handleOtpSubmit()}
          >
            Submit
          </button>
          <div
            className='fontType3'
            style={{ cursor: 'pointer' }}
            onClick={() => handleResend()}
          >
            Resend Verification Token
          </div>
        </div>
      )}
      {forgotModal && (
        <div className={Styles.authContainer}>
          <div className={`fontType0 ${Styles.userSigninText}`}>
            Forgot Password
          </div>
          <TextField
            label='Enter Email'
            id='outlined-basic'
            variant='outlined'
            onChange={(e) => setEmail(e.target.value)}
            className={Styles.textContainer}
          />
          <button
            className={`globalButton ${Styles.authBtn}`}
            onClick={() => handleSendForgotLink()}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default UserAuth;
