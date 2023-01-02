import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { api_signIn } from '../../common/apiOperation';

const UserSignin = () => {
  const [cookieData, setCookieData] = useCookies();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    <div>
      <input type='text' onChange={(e) => setEmail(e.target.value)} />
      <input type='text' onChange={(e) => setPassword(e.target.value)} />
      <button onClick={() => handleLogin()}>Signin</button>
      <a href='/auth/forgotPassword'>Forgot Password</a>
    </div>
  );
};

export default UserSignin;
