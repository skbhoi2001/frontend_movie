import Image from 'next/image';
import React from 'react';
import movieAuth from '../../../public/img/movieBack.jpg';
import Styles from '../../../styles/auth.module.css';

const AuthCommon = () => {
  return (
    <Image
      src={movieAuth}
      className={Styles.image1}
      alt='Picture of the author'
      width=''
      height=''
    />
  );
};

export default AuthCommon;
