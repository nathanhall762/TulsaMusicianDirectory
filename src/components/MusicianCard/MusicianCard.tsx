import { useNavigate } from 'react-router-dom';
import LinkContainer from './LinkContainer';
import styled from 'styled-components';
import { Musician } from '../../types';

interface MusicianCardProps {
  musician: Musician;
}

const MusicianCard: React.FC<MusicianCardProps> = ({ musician }) => {
  const { name, genre, profileImage } = musician;
  const navigate = useNavigate();

  const urlName = name.replaceAll(' ', '_').toLowerCase();

  return (
    <>
      <MusicianCardBody
        backgroundImage={profileImage}
        onClick={() => navigate(urlName)}
      >
        <CardTitle>{name}</CardTitle>
        <ImageContainer>
          <CardImage src={profileImage} alt={name} loading='lazy' />
        </ImageContainer>
        <Genres>Genre: {genre.length !== 0 ? genre.join(', ') : 'NA'}</Genres>
        <LinkContainer musician={musician} />
      </MusicianCardBody>
    </>
  );
};

export const CardImage = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  box-shadow: 0px 0px 0.5rem var(--color-primary);
  transition: all var(--animation-speed-medium) ease;
`;

const ImageContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  padding: 0px 10px;
  width: 100%;
  justify-content: center;
`;

export const CardTitle = styled.h2`
  display: flex;
  box-sizing: border-box;
  padding: 0px 10px;
  width: 100%;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
  min-height: 72px;
  transition: all var(--animation-speed-medium) ease;
`;

export const Genres = styled.p`
  transition: color var(--animation-speed-medium) ease;
  height: 50px;
  box-sizing: border-box;
  padding: 0 10px;
  width: 100%;
  color: var(--color-text-secondary);
  transition: all var(--animation-speed-medium) ease;
  margin-top: 10px;
`;

const MusicianCardBody = styled.div<{ backgroundImage: string }>`
  /* border: 1px solid var(--color-border); */
  padding: 0px 0px;
  border-radius: 20px;
  width: 270px;
  display: flex;
  align-items: center;
  flex-direction: column;
  transition: all var(--animation-speed-medium) ease;
  box-shadow: none;
  margin: 0.3rem;
  align-self: stretch;
  height: 400px;
  justify-content: space-around;
  background-color: var(--other-color);
  position: relative;
  overflow: hidden;

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
    border-radius: 20px;
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

  &:hover::before {
    filter: blur(5px); // If you want to adjust the blur on hover
  }

  &:hover::after {
    opacity: 0.5; // Fades out the overlay on hover
  }

  &:hover {
    text-decoration: none;
    box-shadow: 0px 0px 10px var(--color-accent);
    cursor: pointer;
    overflow: visible;
    border: none;
  }
  &:hover ${CardTitle} {
    color: var(--color-accent);
    text-shadow:
      1px 1px 0 var(--color-background-alt),
      1px -1px 0 var(--color-background-alt),
      -1px 1px 0 var(--color-background-alt),
      -1px -1px 0 var(--color-background-alt);
    transform: scale(1.05);
    padding-top: 5px;
    z-index: 1;
  }
  &:hover ${CardImage} {
    box-shadow: 0px 0px 10px var(--color-accent);
    transform: scale(1.05);
    margin-top: 5px;
  }
  &:hover ${Genres} {
    color: var(--color-accent);
    text-shadow:
      1px 1px 0 var(--color-background-main),
      1px -1px 0 var(--color-background-main),
      -1px 1px 0 var(--color-background-main),
      -1px -1px 0 var(--color-background-main);
    transform: scale(1.05);
    margin-top: 10px;
  }
`;

export default MusicianCard;
