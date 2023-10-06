import React from 'react';
import styles from '../../css/MusicianCard.module.css';
import LinkItem from './LinkItem';
import { Musician } from '../../types';

interface LinkContainerProps {
  musician: Musician;
  title: string;
}

const LinkContainer: React.FC<LinkContainerProps> = ({ musician, title }) => {
  const {
    music: { bandcamp, spotify, youtube, soundcloud, twitch },
    social: { facebook, instagram, tiktok, threads },
  } = musician;

  function extractBandcampURL(iframeString: string): string {
    const match = iframeString.match(
      /href="(https:\/\/.*?\.bandcamp\.com)\/.*?"/
    );
    return match ? match[1] : '';
  }
  const bandcampURL = extractBandcampURL(bandcamp);

  function extractSoundcloudProfileURL(embedCode: string): string {
    const match = embedCode.match(
      /<a href="(https:\/\/soundcloud\.com\/[^"]+)"/
    );
    return match ? match[1] : '';
  }
  const soundcloudProfileURL = extractSoundcloudProfileURL(soundcloud);

  return (
    <>
      {title && <h4>{title}</h4>}
      <div className={styles.socialLinks}>
        <LinkItem
          url={bandcampURL}
          iconClassName='fa fa-bandcamp'
          styleClassName={styles.bandcampLink}
        />
        <LinkItem
          url={spotify}
          iconClassName='fa fa-spotify'
          styleClassName={styles.spotifyLink}
        />
        <LinkItem
          url={youtube}
          iconClassName='fa fa-youtube'
          styleClassName={styles.youtubeLink}
        />
        <LinkItem
          url={soundcloudProfileURL}
          iconClassName='fa fa-soundcloud'
          styleClassName={styles.soundcloudLink}
        />
        <LinkItem
          url={facebook}
          iconClassName='fa fa-facebook'
          styleClassName={styles.facebookLink}
        />
        <LinkItem
          url={instagram}
          iconClassName='fa fa-instagram'
          styleClassName={styles.instagramLink}
        />
        <LinkItem
          url={tiktok}
          iconClassName='fa fa-tiktok'
          styleClassName={styles.tiktokLink}
        />
        <LinkItem
          url={threads}
          iconClassName='fa fa-threads'
          styleClassName={styles.threadsLink}
        />
        <LinkItem
          url={twitch}
          iconClassName='fa fa-twitch'
          styleClassName={styles.twitchLink}
        />
      </div>
    </>
  );
};

export default LinkContainer;
