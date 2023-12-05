import { useNavigate } from 'react-router-dom';
import LinkContainer from './LinkContainer';
import styled from 'styled-components';
import { Musician } from '../../global';

import TurntableArm from '../../assets/turntable-arm.png';

import React, { useState, useEffect } from 'react';

interface MusicianCardProps {
  musician: Musician;
}

const MusicianCard: React.FC<MusicianCardProps> = ({ musician }) => {
  const { name, genre, profileImage } = musician;
  const navigate = useNavigate();

  const urlName = name.replaceAll(' ', '_').toLowerCase();


  // stuff for animating the image
  const [isHovered, setIsHovered] = useState(false);
const [rotation, setRotation] = useState(0);

  useEffect(() => {
    let animationFrameId;

    if (isHovered) {
      const startTime = performance.now();

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        setRotation((elapsed / 5000) * 360); // 5000ms is the duration of one rotation
        animationFrameId = requestAnimationFrame(animate);
      };

      animate(performance.now());
    } else {
      cancelAnimationFrame(animationFrameId);
      setRotation(0); // Reset rotation to 0 when hover state is removed
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered]);

  return (
    <>
      <MusicianCardBody
        $backgroundImage={profileImage}
        onClick={() => navigate(urlName)}
      >
        <CardTitle>{name}</CardTitle>
        <ImageContainer>
        <CardImage
          src={profileImage}
          alt={name}
          loading='lazy'
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isHovered ? 'none' : 'transform 1s' // Add transition when hover state is removed
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
        </ImageContainer>
        <NeedleArmContainer>
          <NeedleArm />
        </NeedleArmContainer>
        <Genres>Genre: {genre.length !== 0 ? genre.join(', ') : 'NA'}</Genres>
        <LinkContainer musician={musician} />
      </MusicianCardBody>
    </>
  );
};

const CardImage = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  box-shadow: 0px 0px 0.5rem var(--color-primary);
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
  color: beige;
  min-height: 72px;
  transition: all var(--animation-speed-medium-slow) ease;
`;

export const Genres = styled.p`
  transition: color var(--animation-speed-medium-slow) ease;
  height: 50px;
  box-sizing: border-box;
  padding: 0 10px;
  width: 100%;
  color: beige;
  transition: all var(--animation-speed-medium-slow) ease;
  margin-top: 10px;
`;

// needle arm stuff, ignore
const NeedleArmContainer = styled.div`
  width: 75px;
  height: 250px;
  position: absolute;
  top: 25%;
  right: -3%;
  transform: translateX(-50%);
  pointer-events: none;
`;

const NeedleArm = styled.div`
  background-image: url(${TurntableArm});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
  transform-origin: top center;
  transform: rotate(0deg);
  transition: transform 1s;
`;

const MusicianCardBody = styled.div<{ $backgroundImage: string }>`
  /* border: 1px solid var(--color-border); */
  padding-left: 4rem;
  padding-right: 4rem;
  border-radius: 20px;
  width: 270px;
  display: flex;
  align-items: center;
  flex-direction: column;
  transition: all var(--animation-speed-medium) ease;
  box-shadow: none;
  margin: 1.25rem;
  align-self: stretch;
  height: 450px;
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
    background-image: url(${(props) => props.$backgroundImage});
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
    color: #EBAD21;
    text-shadow:
      1px 1px 0 var(--color-background-alt),
      1px -1px 0 var(--color-background-alt),
      -1px 1px 0 var(--color-background-alt),
      -1px -1px 0 var(--color-background-alt);
    transform: scale(1.2);
    padding-top: 5px;
    z-index: 1;
  }
  &:hover ${CardImage} {
    scale: 1.1;
    animation: rotate 10s linear infinite;
  }
  &:hover ${Genres} {
    color: #EBAD21;
    text-shadow:
      1px 1px 0 var(--color-background-main),
      1px -1px 0 var(--color-background-main),
      -1px 1px 0 var(--color-background-main),
      -1px -1px 0 var(--color-background-main);
    transform: scale(1.2);
    margin-top: 10px;
  }

  &:hover ${NeedleArm} {
    transform: rotate(15deg);
  }

`;

export default MusicianCard;
