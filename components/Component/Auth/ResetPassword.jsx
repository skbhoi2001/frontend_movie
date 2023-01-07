import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { TextField } from '@mui/material';
import Styles from '../../../styles/auth.module.css';
import AuthCommon from './AuthCommon';
import { api_resetPassword } from '../../common/apiOperation';

const ResetPassword = () => {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState('');
  const token = router?.query?.token;
  const userId = router?.query?.uid;

  const handleResetPassword = async () => {
    const reset = await api_resetPassword({ token, userId, newPassword });
    if (reset?.data?.statusId == 1) {
      alert(reset?.data.message);
      router.push('/auth');
    }
  };
  return (
    <div className={Styles.signupContainer}>
      <div className={Styles.sidebarContainer}>
        <AuthCommon />
      </div>
      <div className={Styles.authContainer}>
        <div className={`fontType0 ${Styles.userSigninText}`}>
          Enter New Passord
        </div>
        <TextField
          label='Enter New Password'
          id='outlined-basic'
          variant='outlined'
          onChange={(e) => setNewPassword(e.target.value)}
          className={Styles.textContainer}
        />
        <button
          className={`globalButton ${Styles.authBtn}`}
          onClick={() => handleResetPassword()}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
