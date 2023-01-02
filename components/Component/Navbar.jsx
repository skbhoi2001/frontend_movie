import React from 'react';
import Styles from '../../styles/Navbar.module.css';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';

const Navbar = () => {
  const [cookieData, setCookieData, removeCookie] = useCookies();
  const router = useRouter();
  const handleLogout = async () => {
    await removeCookie('userstatus', { path: '/' });
    await removeCookie('userrole', { path: '/' });
    await removeCookie('username', { path: '/' });
    await removeCookie('useremail', { path: '/' });
    await removeCookie('usertoken', { path: '/' });
    await removeCookie('userid', { path: '/' });
    router.push('/');
  };
  return (
    <div>
      <div>Movie Database</div>
      <div>
        {cookieData?.usertoken && cookieData?.userstatus ? (
          <div>
            <div>Welcome</div>
            <button onClick={() => handleLogout()}>Logout</button>
          </div>
        ) : (
          <a href='/auth/signup'>Signup</a>
        )}
      </div>
    </div>
  );
};

export default Navbar;
