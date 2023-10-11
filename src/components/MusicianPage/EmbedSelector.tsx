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
      // <iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1610328087&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/rodwave" title="Rod Wave" target="_blank" style="color: #cccccc; text-decoration: none;">Rod Wave</a> · <a href="https://soundcloud.com/rodwave/track-13" title="Great Gatsby" target="_blank" style="color: #cccccc; text-decoration: none;">Great Gatsby</a></div>

      <div dangerouslySetInnerHTML={{ __html: Music.soundcloud }} />
    );
  }
  return <div style={{ width: width, height: height }}></div>;
};

export default EmbedSelector;
