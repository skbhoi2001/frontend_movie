import React, { useState } from 'react';
import { api_verifyUser } from '../common/apiOperation';
import { getSessionStorageData } from '../common/sessionStorageData';

const UserOtpVerify = () => {
  const userId = getSessionStorageData('signupData');
  const [otp, setOtp] = useState('');
  const handleOtpSubmit = async () => {
    const otpVerify = await api_verifyUser({
      userId: userId?.data?.res?._id,
      OTP: otp,
    });
    console.log('otpVerify', otpVerify);
  };
  return (
    <div>
      <input type='number' onChange={(e) => setOtp(e.target.value)} />
      <button onClick={() => handleOtpSubmit()}>Submit</button>
    </div>
  );
};

export default UserOtpVerify;
