import React from 'react';
import styles from '../css/EmbedSelector.module.css';

type Props = {
  Music: {
    bandcamp?: string;
    spotify?: string;
    soundcloud?: string;
    youtube?: string;
  };
};

const EmbedSelector: React.FC<Props> = ({ Music }) => {
  const width = '100%';
  const height = '400';

  if (Music.spotify && Music.spotify.includes('spotify.com/artist/')) {
    const spotifyId = Music.spotify.split('artist/')[1];
    return (
      <iframe
        className={styles.spotifyEmbed}
        src={`https://open.spotify.com/embed/artist/${spotifyId}`}
        width={width}
        height={height}
        frameBorder='0'
        // allowTransparency={true}
        allow='encrypted-media'
        title='Spotify'
        loading='lazy'
      ></iframe>
    );
  }
  if (Music.bandcamp) {
    return (
      <iframe
        title='Bandcamp'
        style={{ border: 0, width: '100%', height: '120px' }}
        src={`https://bandcamp.com/EmbeddedPlayer/${
          Music.bandcamp.split('.com/')[1]
        }`}
        seamless
        loading='lazy'
      ></iframe>
    );
  }
  if (Music.soundcloud) {
    return (
      <div
        className={styles.spotifyEmbed}
        dangerouslySetInnerHTML={{ __html: Music.soundcloud }}
      />
    );
  }
  return <div style={{ width: '100%', height: '400' }}></div>;
};

export default EmbedSelector;
