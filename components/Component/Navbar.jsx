import React, { useState } from 'react';
import Styles from '../../styles/Navbar.module.css';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import Link from 'next/link';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Brightness4Icon from '@mui/icons-material/Brightness4';

const Navbar = ({ setDiffTheme }) => {
  const [cookieData, setCookieData, removeCookie] = useCookies();
  const [themeIcon, setThemeIcon] = useState(false);
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
  const themeUpdate = () => {
    setDiffTheme();
    setThemeIcon(!themeIcon);
  };
  return (
    <div className={Styles.navContainer}>
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
      <button className={Styles.changeColor} onClick={() => themeUpdate()}>
        {!themeIcon ? <DarkModeIcon /> : <Brightness4Icon />}
      </button>
    </div>
  );
};

export default Navbar;
