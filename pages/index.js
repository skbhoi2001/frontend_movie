import Head from 'next/head';
import Image from 'next/image';
import HomeComponent from '../components/Component/HomeComponent';
import styles from '../styles/Home.module.css';
import useCustomTheme from 'react-switch-theme';

const colors = {
  light: {
    background: '#E6E6E6',
    color: '#545454',
  },
  dark: {
    background: '#545454',
    color: '#E6E6E6',
  },
};
const themeOptions = {
  colors,
  activeMode: 'light',
  // offlineStorageKey: "react-random-key"
};

export default function Home() {
  const [theme, setDiffTheme] = useCustomTheme(themeOptions);
  return (
    <div>
      <HomeComponent setDiffTheme={setDiffTheme} />
    </div>
  );
}
