// MusicianCard.tsx
import React from 'react';
import styles from '../css/MusicianCard.module.css';
import { Link } from 'react-router-dom';

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
  const {
    name,
    music: { bandcamp, spotify, youtube, soundcloud, twitch },
    social: { facebook, instagram, tiktok, threads },
    genre,
    profileImage,
  } = musician;

  const urlName = name.replaceAll(' ', '_').toLowerCase();

  function extractBandcampURL(iframeString: string): string | null {
    const match = iframeString.match(
      /href="(https:\/\/.*?\.bandcamp\.com)\/.*?"/
    );
    return match ? match[1] : null;
  }
  const bandcampURL = extractBandcampURL(bandcamp);

  function extractSoundcloudProfileURL(embedCode: string): string | null {
    const match = embedCode.match(
      /<a href="(https:\/\/soundcloud\.com\/[^"]+)"/
    );
    return match ? match[1] : null;
  }

  const soundcloudProfileURL = extractSoundcloudProfileURL(soundcloud);

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
            />
            <p>Genre: {genre.length !== 0 ? genre.join(', ') : 'NA'}</p>
          </div>
        </Link>
        <div className={styles.socialLinks}>
          {bandcamp && (
            <a
              href={typeof bandcampURL == 'string' ? bandcampURL : ''}
              target='_blank'
              rel='noopener noreferrer'
              className={styles.bandcampLink}
            >
              <i className='fa fa-bandcamp' aria-hidden='true'></i>
            </a>
          )}
          {spotify && (
            <a
              href={spotify}
              target='_blank'
              rel='noopener noreferrer'
              className={styles.spotifyLink}
            >
              <i className='fa fa-spotify' aria-hidden='true'></i>
            </a>
          )}
          {youtube && (
            <a
              href={youtube}
              target='_blank'
              rel='noopener noreferrer'
              className={styles.youtubeLink}
            >
              <i className='fa fa-youtube' aria-hidden='true'></i>
            </a>
          )}
          {soundcloud && (
            <a
              href={
                typeof soundcloudProfileURL == 'string'
                  ? soundcloudProfileURL
                  : ''
              }
              target='_blank'
              rel='noopener noreferrer'
              className={styles.soundcloudLink}
            >
              <i className='fa fa-soundcloud' aria-hidden='true'></i>
            </a>
          )}
          {facebook && (
            <a
              href={facebook}
              target='_blank'
              rel='noopener noreferrer'
              className={styles.facebookLink}
            >
              <i className='fa fa-facebook' aria-hidden='true'></i>
            </a>
          )}
          {instagram && (
            <a
              href={instagram}
              target='_blank'
              rel='noopener noreferrer'
              className={styles.instagramLink}
            >
              <i className='fa fa-instagram' aria-hidden='true'></i>
            </a>
          )}
          {tiktok && (
            <a
              href={tiktok}
              target='_blank'
              rel='noopener noreferrer'
              className={styles.tiktokLink}
            >
              <i className='fa fa-tiktok' aria-hidden='true'></i>
            </a>
          )}
          {threads && (
            <a
              href={threads}
              target='_blank'
              rel='noopener noreferrer'
              className={styles.threadsLink}
            >
              {/* Placeholder icon for Threads (since I'm not sure if there's a FontAwesome icon for it yet) */}
              <i className='fa fa-threads' aria-hidden='true'></i>
            </a>
          )}
          {twitch && (
            <a
              href={twitch}
              target='_blank'
              rel='noopener noreferrer'
              className={styles.twitchLink}
            >
              <i className='fa fa-twitch' aria-hidden='true'></i>
            </a>
          )}
        </div>
      </div>
    </>
  );
};

export default MusicianCard;
