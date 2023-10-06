import { useParams } from 'react-router-dom';
import styles from '../css/MusicianPage.module.css';
import EmbedSelector from './EmbedSelector';
import { Link } from 'react-router-dom';
import useBearStore from '../bearStore';
import LinkContainer from './MusicianCard/LinkContainer';

const MusicianPage = () => {
  const musicians = useBearStore((state) => state.musicians);
  const { musicianId } = useParams();

  // FIXME: in case of musicians never loading
  if (musicians.length === 0) {
    return <p>...Loading</p>;
  }

  // match name in url to name in musicians array
  const musicianName = musicianId?.replaceAll('_', ' ');
  const musician = musicians.find((x) => musicianName === x.name.toLowerCase());

  if (!musician) {
    throw new Response('Not Found', { status: 404 });
  }

  // destructure matched musician object
  const { name, music, genre, profileImage } = musician;

  return (
    <>
      <div className={styles.musicianPage}>
        <Link to='/'>
          <button>Go Back</button>
        </Link>
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
            <EmbedSelector Music={music} />
            <p>Genre: {genre.length !== 0 ? genre.join(', ') : 'NA'}</p>
            <LinkContainer musician={musician} title='Music:' />
            <LinkContainer musician={musician} title='Social:' />
          </div>
        </div>
      </div>
    </>
  );
};

export default MusicianPage;
