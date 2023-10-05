import React from 'react';
import styles from '../../css/MusicianCard.module.css';
import { Link } from 'react-router-dom';
import LinkContainer from './LinkContainer';

export type Musician = {
  name: string;
  music: {
    bandcamp: string;
    spotify: string;
    youtube: string;
    soundcloud: string;
    twitch: string;
  };
  social: {
    facebook: string;
    instagram: string;
    tiktok: string;
    threads: string;
  };
  genre: string[];
  profileImage: string;
};

interface MusicianCardProps {
  musician: Musician;
}

const MusicianCard: React.FC<MusicianCardProps> = ({ musician }) => {
  const { name, genre, profileImage } = musician;

  const urlName = name.replaceAll(' ', '_').toLowerCase();

  return (
    <>
      <div className={styles.musicianCard}>
        <Link to={urlName}>
          <div className={styles.name}>
            <h2>{name}</h2>
          </div>
          <div className={styles.keyInfo}>
            <img
              className={styles.profileImage}
              src={profileImage}
              alt={name}
              loading='lazy'
            />
            <p>Genre: {genre.length !== 0 ? genre.join(', ') : 'NA'}</p>
          </div>
        </Link>
        <LinkContainer musician={musician} />
      </div>
    </>
  );
};

export default MusicianCard;
