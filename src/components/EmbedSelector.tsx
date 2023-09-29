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

  //   if (Music.bandcamp !== undefined) {
  //     console.log(`${Music.bandcamp.split('.com/')[0]}`);
  //   }
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

  //   if (Music.soundcloud !== undefined) {
  //     console.log(`${soundcloudProfileURL}`);
  //   }
  if (Music.soundcloud) {
    return (
      <div
        className={styles.spotifyEmbed}
        dangerouslySetInnerHTML={{ __html: Music.soundcloud }}
      />
    );
  }

  //   if (Music.youtube) {
  //     const youtubeId = Music.youtube.split('v=')[1];
  //     const ampersandPosition = youtubeId.indexOf('&');
  //     if (ampersandPosition !== -1) {
  //       youtubeId.substring(0, ampersandPosition);
  //     }
  //     return (
  //       <iframe
  //         width="560"
  //         height="315"
  //         src={`https://www.youtube.com/embed/${youtubeId}`}
  //         title="YouTube video player"
  //         frameBorder="0"
  //         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  //         allowFullScreen
  //       ></iframe>
  //     );
  //   }

  return <div style={{ width: '100%', height: '400' }}></div>;
};

export default EmbedSelector;
