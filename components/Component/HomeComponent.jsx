import React from 'react';
import Navbar from './Navbar';

const HomeComponent = ({ setDiffTheme }) => {
  return (
    <div>
      <Navbar setDiffTheme={setDiffTheme} />
    </div>
  );
};

export default HomeComponent;
