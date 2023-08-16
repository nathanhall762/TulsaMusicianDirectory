// MusicianCard.tsx
import React, { SetStateAction } from 'react';
import styles from '../css/MusicianCard.module.css';

export type Musician = {
  bandcamp?: string;
  facebook?: string;
  genre: string[];
  instagram?: string;
  name: string;
  profileImage: string;
  spotify?: string;
  youtube?: string;
  soundcloud?: string;
  tiktok?: string;
  threads?: string;
};

interface MusicianCardProps {
  musician: Musician;
  setCardSelected: React.Dispatch<SetStateAction<string>>;
}

const MusicianCard: React.FC<MusicianCardProps> = ({
  musician,
  setCardSelected,
}) => {
  const {
    bandcamp,
    facebook,
    genre,
    instagram,
    name,
    profileImage,
    spotify,
    youtube,
    soundcloud,
    tiktok,
    threads,
  } = musician;

  const clickCard = () => {
    setCardSelected(name);
  };

  return (
    <div className={styles.musicianCard} onClick={clickCard}>
      <h2>{name}</h2>
      <img className={styles.profileImage} src={profileImage} alt={name} />
      <p>Genre: {genre.length !== 0 ? genre.join(', ') : 'NA'}</p>
      <div className={styles.socialLinks}>
        {bandcamp && (
          <a href={bandcamp} target='_blank' rel='noopener noreferrer'>
            <i className='fa fa-bandcamp' aria-hidden='true'></i>
          </a>
        )}
        {spotify && (
          <a href={spotify} target='_blank' rel='noopener noreferrer'>
            <i className='fa fa-spotify' aria-hidden='true'></i>
          </a>
        )}
        {youtube && (
          <a href={youtube} target='_blank' rel='noopener noreferrer'>
            <i className='fa fa-youtube' aria-hidden='true'></i>
          </a>
        )}
        {soundcloud && (
          <a href={soundcloud} target='_blank' rel='noopener noreferrer'>
            <i className='fa fa-soundcloud' aria-hidden='true'></i>
          </a>
        )}
        {facebook && (
          <a href={facebook} target='_blank' rel='noopener noreferrer'>
            <i className='fa fa-facebook' aria-hidden='true'></i>
          </a>
        )}
        {instagram && (
          <a href={instagram} target='_blank' rel='noopener noreferrer'>
            <i className='fa fa-instagram' aria-hidden='true'></i>
          </a>
        )}
        {tiktok && (
          <a href={tiktok} target='_blank' rel='noopener noreferrer'>
            <i className='fa fa-tiktok' aria-hidden='true'></i>
          </a>
        )}
        {threads && (
          <a href={threads} target='_blank' rel='noopener noreferrer'>
            {/* Placeholder icon for Threads (since I'm not sure if there's a FontAwesome icon for it yet) */}
            <i className='fa fa-comments' aria-hidden='true'></i>
          </a>
        )}
      </div>
    </div>
  );
};

export default MusicianCard;
