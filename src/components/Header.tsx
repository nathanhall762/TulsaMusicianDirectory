import { useState } from 'react';
import styles from '../css/Login.module.css';
import Login from './Login';

const Header = () => {
  const [isAccordionOpen, setAccordionOpen] = useState(false);
  const toggleAccordion = () => {
    setAccordionOpen(!isAccordionOpen);
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.heading} onClick={toggleAccordion}>
        <h1>The Tulsa Musician Directory</h1>
        <p>{isAccordionOpen ? 'show less' : 'add to the directory'}</p>
      </div>
      <div
        id='intro-accordion'
        className={
          isAccordionOpen ? styles.accordionOpen : styles.accordionClosed
        }
      >
        <ul>
          How to support:
          <li>
            Discover local bands by exploring the directory and listening to
            music previews.
          </li>
          <li>
            Use the social links to follow and engage with artist content.
          </li>
          <li>Use the music links to stream the artists' music.</li>
          <li>
            Help build a working directory of Tulsa musicians by signing up to
            add bands/musicians!
          </li>
        </ul>
        <Login />
      </div>
    </div>
  );
};

export default Header;
