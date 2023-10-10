import { useParams } from 'react-router-dom';
// import styles from '../css/MusicianPage.module.css';
import EmbedSelector from './EmbedSelector';
import { Link } from 'react-router-dom';
import useBearStore from '../../bearStore';
import LinkContainer from './LinkContainerPage';
import { styled } from 'styled-components';
import { CardTitle, Genres, CardImage } from '../MusicianCard/MusicianCard';

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
      <MusicianPageBody>
        <MusicianPageContainerA>
          <Link to='/'>
            <BackButton>Go Back</BackButton>
          </Link>
          <CardImage src={profileImage} alt={name} loading='lazy' />
          <CardTitle>{name}</CardTitle>
          <Genres>Genre: {genre.length !== 0 ? genre.join(', ') : 'NA'}</Genres>
          <LinkContainer musician={musician}></LinkContainer>
        </MusicianPageContainerA>
        <MusicianPageContainerB>
          <EmbedContainer>
            <EmbedSelector Music={music} />
          </EmbedContainer>
        </MusicianPageContainerB>
      </MusicianPageBody>
    </>
  );
};

const EmbedContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
  @media (max-width: 768px) {
    padding: 0;
  }
  & > div {
    justify-content: center;
  }
`;

const MusicianPageBody = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-basis: 100%;
  box-sizing: border-box;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const MusicianPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-sizing: border-box;
  justify-content: center;
  padding: 2rem;
`;

const MusicianPageContainerA = styled(MusicianPageContainer)`
  justify-content: center;
  width: 30%;
  background-color: var(--color-background-alt);
  @media (max-width: 768px) {
    /* background-color: var(--color-background-main); */
    width: 100%;
  }
`;

const MusicianPageContainerB = styled(MusicianPageContainer)`
  justify-content: space-around;
  width: 70%;
  @media (max-width: 768px) {
    width: 100%;
    padding: 0;
    justify-content: start;
  }
`;

const BackButton = styled.button`
  background-color: var(--color-primary);
  color: var(--color-text-primary);
  border: none;
  border-radius: 5px;
  padding: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--animation-speed-medium) ease;
  margin-bottom: 1rem;
  position: absolute;
  top: 1rem;
  left: 1rem;
  &:hover {
    background-color: var(--color-background-alt);
  }
  @media (max-width: 768px) {
    visibility: hidden;
  }
`;

export default MusicianPage;
