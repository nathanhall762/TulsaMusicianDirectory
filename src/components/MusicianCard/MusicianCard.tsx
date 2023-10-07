import React from 'react';
import { useNavigate } from 'react-router-dom';
import LinkContainer from './LinkContainer';
import styled from 'styled-components';

const CardImage = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  box-shadow: 0px 0px 0.5rem var(--color-primary);
  transition: box-shadow 0.4s ease;
`;

const CardTitle = styled.h2`
  transition: color 0.4s ease;
  color: var(--color-primary);
`;

const Genres = styled.p`
  transition: color 0.4s ease;
  color: var(--color-text-secondary);
`;

const MusicianCardBody = styled.div<{ backgroundImage: string }>`
  border: 1px solid var(--color-border);
  padding: 0px 20px;
  border-radius: 5px;
  width: 250px;
  display: flex;
  align-items: center;
  flex-direction: column;
  transition: box-shadow background-color 0.4s ease;
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
      filter 0.4s ease,
      opacity 0.4s ease;
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

  &:hover::before {
    filter: blur(5px); // If you want to adjust the blur on hover
  }

  &:hover::after {
    opacity: 0; // Fades out the overlay on hover
  }

  &:hover {
    text-decoration: none;
    box-shadow: 0px 0px 10px var(--color-accent);
    cursor: pointer;
    overflow: visible;
  }
  &:hover ${CardTitle} {
    color: var(--color-accent);
  }
  &:hover ${CardImage} {
    box-shadow: 0px 0px 10px var(--color-accent);
  }
  &:hover ${Genres} {
    color: var(--color-accent);
  }
`;

export type Musician = {
  name: string;
  music: {
    bandcamp: string;
    spotify: string;
    youtube: string;
    soundcloud: string;
    twitch: string;
  };
  social: {
    facebook: string;
    instagram: string;
    tiktok: string;
    threads: string;
  };
  genre: string[];
  profileImage: string;
};

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
        <CardImage src={profileImage} alt={name} loading='lazy' />
        <Genres>Genre: {genre.length !== 0 ? genre.join(', ') : 'NA'}</Genres>
        <LinkContainer musician={musician} />
      </MusicianCardBody>
    </>
  );
};

export default MusicianCard;
