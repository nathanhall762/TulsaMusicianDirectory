import { animateScroll as scroll } from 'react-scroll';
import styled from 'styled-components';
import heroImage from '../assets/heroImage.webp';

const Hero = () => {
  return (
    <HeroWrapper className='heroWrapper'>
      <HeroTitle>Music In Tulsa</HeroTitle>
      <HeroSubtitle>Discover Tulsa's Music Scene</HeroSubtitle>
      <ActionButton
        className='actionButton'
        onClick={() => {
          scroll.scrollMore(window.innerHeight * 0.55, {
            duration: 1000,
            smooth: 'quadInOut',
          });
        }}
      >
        Find a Musician
      </ActionButton>
    </HeroWrapper>
  );
};

const HeroWrapper = styled.div`
  height: 50vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url(${heroImage});
  background-size: cover;
  background-position: center;
  border-radius: 0px;
  margin-top: 0;
  margin-left: 0;
  margin-right: 0;
  margin-bottom: 0;
  @media (max-width: 1000px) {
    text-align: center;
  }
`;

const HeroTitle = styled.h1`
  font-size: 7rem;
  color: var(--color-text-primary);
  margin: 0;
  text-shadow: 0 2px 20px #000;
  font-family: 'Lobster';
  text-align: center;

  @media (max-width: 1000px) {
    font-size: 3rem;
  }

  /* @media (max-height: 1000px) {
    font-size: 2rem;
    margin-top: 1rem;
  }

  @media (max-height: 800px) {
    font-size: 1.5rem;
  } */
`;

const HeroSubtitle = styled.h2`
  /* font-size: 3.5rem; */
  color: var(--color-text-primary);
  margin: 0;
  margin-top: 10rem;
  text-shadow: 0 2px 20px #000;
  transform: translateY(2rem);
  @media (max-height: 1000px) {
    margin-top: 2rem;
    /* font-size: 1rem !important; */
  }
  @media (max-width: 360px) {
    margin-bottom: 2rem;
  }
`;

const ActionButton = styled.button`
  background-color: var(--color-text-primary);
  border: none;
  padding: 1rem 2rem;
  border-radius: 2rem;
  font-size: 1.5rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
  cursor: pointer;
  transform: translateY(2rem);

  // on hover, change background color to color-secondary
  &:hover {
    background-color: var(--color-secondary);
    color: var(--color-text-primary);
    box-shadow: 0 0 20px 5px beige;
    transform: scale(1.05) translateY(2rem);
    transition: all var(--animation-speed-medium) ease;
  }

  transition:
    background-color 1s,
    color 1s,
    transform 1s,
    box-shadow 1s;

  // on mobile, make smaller
  @media (max-width: 600px) {
    font-size: 1rem;
    padding: 0.5rem 1rem;
    margin-top: 1rem;
  }
  @media (max-width: 360px) {
    display: none;
  }
`;

export default Hero;
