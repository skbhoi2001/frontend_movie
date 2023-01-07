import { Link } from '@mui/material';
import React from 'react';
import Styles from '../../../styles/Admin/Admin.module.css';

const AdminNav = () => {
  return (
    <div className={Styles.navContainer}>
      <Link className={Styles.linksName} href='/admin'>
        Home
      </Link>
      <Link className={Styles.linksName} href='/admin/movie'>
        Movie
      </Link>
      <Link className={Styles.linksName} href='/admin/actor'>
        Actors
      </Link>
      <Link className={Styles.linksName} href='/admin/user'>
        User
      </Link>
    </div>
  );
};

export default AdminNav;
