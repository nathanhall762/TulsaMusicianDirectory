// MusicianPage.tsx
import React, { SetStateAction } from 'react';
import styles from '../css/MusicianPage.module.css';
import EmbedSelector from './EmbedSelector';
import { Musician } from '../types';

interface MusicianPageProps {
  musician: Musician;
  setCardSelected: React.Dispatch<SetStateAction<string>>;
}

const MusicianPage: React.FC<MusicianPageProps> = ({
  musician,
  setCardSelected,
}) => {
  const {
    name,
    music: { bandcamp, spotify, youtube, soundcloud, twitch },
    social: { facebook, instagram, tiktok, threads },
    genre,
    profileImage,
  } = musician;

  // const spotifyEmbed = `https://open.spotify.com/embed/artist/5V0MlUE1Bft0mbLlND7FJz?utm_source=generator`;

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

  const clickCard = () => {
    setCardSelected('');
  };

  return (
    <>
      <div className={styles.musicianPage}>
        <button onClick={clickCard}>Go Back</button>
        <div className={styles.pageHeader}>
          <div className={styles.nameAndPhoto}>
            <img
              className={styles.profileImage}
              src={profileImage}
              alt={name}
            />
            <h2>{name}</h2>
          </div>
          <div className={styles.keyInfo}>
            <EmbedSelector Music={musician.music} />
            <p>Genre: {genre.length !== 0 ? genre.join(', ') : 'NA'}</p>
            <div className={styles.socialLinks}>
              <h4>Music:</h4>
              {bandcamp && (
                <a
                  href={typeof bandcampURL == 'string' ? bandcampURL : ''}
                  target='_blank'
                  rel='noopener noreferrer'
                >
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
                <a
                  href={
                    typeof soundcloudProfileURL == 'string'
                      ? soundcloudProfileURL
                      : ''
                  }
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <i className='fa fa-soundcloud' aria-hidden='true'></i>
                </a>
              )}
              {twitch && (
                <a href={twitch} target='_blank' rel='noopener noreferrer'>
                  <i className='fa fa-twitch' aria-hidden='true'></i>
                </a>
              )}
            </div>

            <div className={styles.socialLinks}>
              <h4>Social:</h4>
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
                  {/* Not sure about the icon for Threads, using a placeholder */}
                  <i className='fa fa-threads' aria-hidden='true'></i>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MusicianPage;
