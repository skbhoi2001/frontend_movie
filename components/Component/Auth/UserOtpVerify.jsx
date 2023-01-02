import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { api_verifyUser } from '../../common/apiOperation';
import { getSessionStorageData } from '../../common/sessionStorageData';

const UserOtpVerify = () => {
  const [cookieData, setCookieData] = useCookies();
  const userId = getSessionStorageData('signupData');
  const router = useRouter();
  const [otp, setOtp] = useState('');
  console.log('userId', userId);
  const handleOtpSubmit = async () => {
    const otpVerify = await api_verifyUser({
      userId: userId,
      OTP: otp,
    });
    console.log('otpVerify', otpVerify);
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
  return (
    <div>
      <input type='number' onChange={(e) => setOtp(e.target.value)} />
      <button onClick={() => handleOtpSubmit()}>Submit</button>
    </div>
  );
};

export default UserOtpVerify;
