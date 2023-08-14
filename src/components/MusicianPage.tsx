// MusicianPage.tsx
import React, { SetStateAction } from 'react';
import styles from '../css/MusicianPage.module.css';

export type Musician = {
  bandcamp?: string;
  facebook?: string;
  genre: string[];
  instagram?: string;
  name: string;
  profileImage: string;
  spotify?: string;
  spotifyID?: string;
};

interface MusicianPageProps {
  musician: Musician;
  setCardSelected: React.Dispatch<SetStateAction<string>>;
}

const MusicianPage: React.FC<MusicianPageProps> = ({
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
    spotifyID,
  } = musician;

  console.log(profileImage);

  const spotifyEmbed = `https://open.spotify.com/embed/artist/${spotifyID}?utm_source=generator`;

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
            <iframe
              className={styles.smallSpotifyPlayer}
              src={spotifyEmbed}
              width='100%'
              height='152'
              frameBorder='0'
              allowFullScreen={false}
              //   allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
              loading='lazy'
            ></iframe>
            <p>Genre: {genre.length !== 0 ? genre.join(', ') : 'NA'}</p>
            <div className={styles.socialLinks}>
              {bandcamp && (
                <a href={bandcamp} target='_blank' rel='noopener noreferrer'>
                  <i className='fa fa-bandcamp' aria-hidden='true'></i>
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
              {spotify && (
                <a href={spotify} target='_blank' rel='noopener noreferrer'>
                  <i className='fa fa-spotify' aria-hidden='true'></i>
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
