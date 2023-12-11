import { useParams } from 'react-router-dom';
// import styles from '../css/MusicianPage.module.css';
import EmbedSelector from './EmbedSelector';
import { Link } from 'react-router-dom';
import useBearStore from '../../bearStore';
import LinkContainer from './LinkContainerPage';
import { styled } from 'styled-components';
import {
  CardTitle as CardTitleBase,
  Genres,
  CardImage,
} from '../MusicianCard/MusicianCard';
import { AddButton, AddButtonContainer } from '../MusicianCard/AddButtons';
// import { useState } from 'react';

const EditPage = () => {
  const musicians = useBearStore((state) => state.musicians);
  const { musicianId } = useParams();
  const user = useBearStore((state) => state.user);

  // const [isAddButtonHovered, setIsAddButtonHovered] = useState(false);
  // const [isApproveButtonHovered, setIsApproveButtonHovered] = useState(false);

  // FIXME: in case of musicians never loading
  if (musicians.length === 0) {
    return (
      <>
        <Link to='/' aria-label='homepage'>
          <BackButton>Go Back</BackButton>
        </Link>
        <LoadingMessage>
          ...Finding Artist. (If this take more than a few seconds, we might be
          having troubles on our end. Check back soon!)
        </LoadingMessage>
      </>
    );
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
        <MusicianPageContainerA backgroundImage={profileImage}>
          <Link to='/' aria-label='homepage'>
            <BackButton>Go Back</BackButton>
          </Link>
          <CardImage src={profileImage} alt={name} loading='lazy' />
          <CardTitle>{name}</CardTitle>
          <EmbedContainerA>
            <EmbedSelector Music={music} />
          </EmbedContainerA>
          <Genres>Genre: {genre.length !== 0 ? genre.join(', ') : 'NA'}</Genres>
          <LinkContainer musician={musician}></LinkContainer>
        </MusicianPageContainerA>
        <MusicianPageContainerB backgroundImage={profileImage}>
          <EmbedContainer>
            <EmbedSelector Music={music} />
          </EmbedContainer>
        </MusicianPageContainerB>
      </MusicianPageBody>
      <AddButtonContainer>
        {/* show button link to MusicianApprovePage if user is admin */}
        {user?.isAdmin ? (
          // <Link to='/approvemusician' aria-label='approve musician'>
          <AddButton
            $backgroundColor='var(--color-primary)'
            // onMouseEnter={() => setIsApproveButtonHovered(true)}
            // onMouseLeave={() => setIsApproveButtonHovered(false)}
            aria-label='approve musician'
          >
            {/* {isApproveButtonHovered ? (
              'Approve Musician'
            ) : (
              <i className='fa-solid fa-trash' aria-hidden='true' />
            )} */}
          </AddButton>
        ) : // </Link>
        null}
        {/* show add musician button only if logged in */}
        <Link to='/addmusician' aria-label='add musician to directory'>
          <AddButton
            $backgroundColor='var(--color-accent)'
            // onMouseEnter={() => setIsAddButtonHovered(true)}
            // onMouseLeave={() => setIsAddButtonHovered(false)}
            aria-label='suggest edits'
          >
            <i className='fa-solid fa-edit' aria-hidden='true' />
            <span>Suggest Edits</span>
          </AddButton>
        </Link>
      </AddButtonContainer>
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
`;

const EmbedContainerA = styled(EmbedContainer)`
  max-height: 20vh;
  @media (min-width: 768px) {
    display: none;
  }
`;

const MusicianPageBody = styled.div`
  display: flex;
  width: 100vw;
  height: 92vh;
  flex-basis: 100%;
  box-sizing: border-box;
  /* position: fixed; */
  /* top: 12vh; */
  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: end;
    overflow: hidden;
    height: 92vh;
  }
`;

const MusicianPageContainer = styled.div<{ backgroundImage: string }>`
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
    background-color: var(--color-background-main);
    width: 100%;
    height: 100%;
    justify-content: space-around;
  }
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transition:
      filter var(--animation-speed-medium) ease,
      opacity var(--animation-speed-medium) ease;
    z-index: -1;
  }

  &::before {
    background-image: url(${(props) => props.backgroundImage});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    filter: blur(5px);
  }

  &::after {
    background-color: rgba(0, 0, 0, 0.8);
    opacity: 1;
  }
`;

const MusicianPageContainerB = styled(MusicianPageContainer)`
  justify-content: space-around;
  width: 70%;
  box-shadow: inset 0px 0px 10px 0px var(--color-shadow);
  @media (max-width: 768px) {
    display: none;
    width: 100%;
    padding: 0;
    justify-content: start;
    box-shadow: none;
    background-color: var(--color-background-main);
  }
`;

export const BackButton = styled.button`
  background-color: var(--color-accent);
  color: var(--color-text-primary);
  border: none;
  border-radius: 5px;
  padding: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--animation-speed-medium) ease;
  margin-bottom: 1rem;
  display: flex;
  align-self: start;
  position: absolute;
  top: 15vh;
  left: 1rem;
  &:hover {
    background-color: var(--color-background-alt);
  }
  @media (max-width: 768px) {
    visibility: hidden;
  }
`;

const CardTitle = styled(CardTitleBase)`
  padding: 1rem;
`;

const LoadingMessage = styled.h3`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 90vw;
  margin: 5rem;
  text-align: center;
`;

export default EditPage;
