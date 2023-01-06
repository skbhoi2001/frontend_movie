import React from 'react';
import Styles from '../../styles/Navbar.module.css';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import Link from 'next/link';

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
    <div className={Styles.navContainer}>
      {/* <div>Movie Database</div>
      <div>
        {cookieData?.usertoken && cookieData?.userstatus ? (
          <div>
            <div>Welcome</div>
            <button onClick={() => handleLogout()}>Logout</button>
          </div>
        ) : (
          <a href='/auth/signup'>Signup</a>
        )}
      </div> */}
      <div>REVIEW_ME</div>
      <div>
        <input className={Styles.searchInput} type='text' />
        <button className={Styles.buttonSearch}>Search</button>
      </div>
      <div className={Styles.NavDataContainer}>
        <div>Movies</div>
        <div>Actor</div>
        {cookieData?.usertoken && cookieData?.userstatus ? (
          <div onClick={() => handleLogout()}>Logout</div>
        ) : (
          <Link href='/auth'>Account</Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
