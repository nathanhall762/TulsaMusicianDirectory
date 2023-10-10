import React from 'react';

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
  const height = '100%';

  if (Music.spotify && Music.spotify.includes('spotify.com/artist/')) {
    const spotifyId = Music.spotify.split('artist/')[1];
    return (
      <iframe
        src={`https://open.spotify.com/embed/artist/${spotifyId}`}
        width={width}
        height={height}
        frameBorder='0'
        allow='encrypted-media'
        title='Spotify'
      ></iframe>
    );
  }
  if (Music.bandcamp) {
    return (
      <iframe
        title='Bandcamp'
        width={width}
        height={height}
        src={`https://bandcamp.com/EmbeddedPlayer/${
          Music.bandcamp.split('.com/')[1]
        }`}
        seamless
      ></iframe>
    );
  }
  if (Music.soundcloud) {
    return (
      <div
        dangerouslySetInnerHTML={{ __html: Music.soundcloud }}
      />
    );
  }
  return <div style={{ width: width, height: height }}></div>;
};

export default EmbedSelector;
