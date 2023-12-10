import LinkItem from './LinkItemPage';
import styled from 'styled-components';
import { Musician } from '../../global';

interface MusicianCardProps {
  musician: Musician;
}

const LinkContainerBody = styled.div`
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  padding: 0 10px;
`;

const LinkContainer: React.FC<MusicianCardProps> = ({ musician }) => {
  const {
    music: { bandcamp, spotify, youtube, soundcloud, twitch },
    social: { facebook, instagram, tiktok, threads },
  } = musician;

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
      <LinkContainerBody>
        <LinkItem
          url={bandcampURL}
          iconClassName='fa fa-bandcamp'
          styleClassName='bandcamp'
        />
        <LinkItem
          url={spotify}
          iconClassName='fa fa-spotify'
          styleClassName='spotify'
        />
        <LinkItem
          url={youtube}
          iconClassName='fa fa-youtube'
          styleClassName='youtube'
        />
        <LinkItem
          url={soundcloudProfileURL}
          iconClassName='fa fa-soundcloud'
          styleClassName='soundcloud'
        />
        <LinkItem
          url={facebook}
          iconClassName='fa fa-facebook'
          styleClassName='facebook'
        />
        <LinkItem
          url={instagram}
          iconClassName='fa fa-instagram'
          styleClassName='instagram'
        />
        <LinkItem
          url={tiktok}
          iconClassName='fa-brands fa-tiktok'
          styleClassName='tiktok'
        />
        <LinkItem
          url={threads}
          iconClassName='fa-brands fa-threads'
          styleClassName='threads'
        />
        <LinkItem
          url={twitch}
          iconClassName='fa fa-twitch'
          styleClassName='twitch'
        />
      </LinkContainerBody>
    </>
  );
};

export default LinkContainer;
