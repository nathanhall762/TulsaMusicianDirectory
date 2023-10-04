import { useParams } from 'react-router-dom';
import styles from '../css/MusicianPage.module.css';
import EmbedSelector from './EmbedSelector';
import { useNavigate } from 'react-router-dom';
import useBearStore from '../bearStore';

const MusicianPage = () => {
  const musicians = useBearStore((state) => state.musicians);
  const { musicianId } = useParams();
  const navigate = useNavigate();

  if (musicians.length === 0) {
    return <p>...Loading</p>;
  }

  // match name in url to name in musicians array
  const musicianName = musicianId?.replaceAll('_', ' ');
  const musician = musicians.find((x) => musicianName === x.name.toLowerCase());

  if (!musician) {
    // FIXME
    return <p>WE NEED A 404</p>;
  }

  // destructure matched musician object
  const {
    name,
    music: { bandcamp, spotify, youtube, soundcloud, twitch },
    social: { facebook, instagram, tiktok, threads },
    genre,
    profileImage,
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
      <div className={styles.musicianPage}>
        <button onClick={() => navigate(-1)}>Go Back</button>
        <div className={styles.pageHeader}>
          <div className={styles.nameAndPhoto}>
            <img
              className={styles.profileImage}
              src={profileImage}
              alt={name}
              loading='lazy'
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
                  className={styles.bandcamp}
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
