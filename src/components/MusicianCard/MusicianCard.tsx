import React from 'react';
import styles from '../../css/MusicianCard.module.css';
import { Link } from 'react-router-dom';
import LinkContainer from './LinkContainer';
import { Musician } from '../../types';

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
        <LinkContainer musician={musician} title='' />
      </div>
    </>
  );
};

export default MusicianCard;
