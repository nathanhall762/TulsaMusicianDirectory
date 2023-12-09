import { animateScroll as scroll } from 'react-scroll';
import styled from 'styled-components';
import heroImage from '../assets/heroImage.webp';

const Hero = () => {
    return (
        <HeroWrapper>
            <HeroTitle>Music In Tulsa</HeroTitle>
            <HeroSubtitle>Discover Tulsa's Music Scene</HeroSubtitle>
            <ActionButton onClick={() => {
              scroll.scrollMore(window.innerHeight * 0.55, {
              duration: 1000,
              smooth: 'quadInOut',
              });
            }}>
            Find a Musician
            </ActionButton>
        </HeroWrapper>
    )
}

const HeroWrapper = styled.div`
    height: 50vh;
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-image: url(${heroImage});
    background-size: cover;
    background-position: center;
    border-radius: 2rem;
    margin-top: 2rem;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 2rem;
`;

const HeroTitle = styled.h1`
    font-size: 7rem;
    color: beige;
    margin: 0;
    text-shadow: 0 2px 20px #000;
    font-family: 'Lobster';

    // on mobile, make font-size smaller
    @media (max-width: 600px) {
        font-size: 3rem;
    }
`;

const HeroSubtitle = styled.h2`
    font-size: 3.5rem;
    color: beige;
    margin: 0;
    margin-top: 10rem;
    text-shadow: 0 2px 20px #000;
    // shift down a little
    transform: translateY(2rem);
    font-family: 'Lobster';

    // on mobile, make font-size smaller
    @media (max-width: 600px) {
        font-size: 1.5rem;
    }
    // on mobile shorter screens, reduce margin-top
    @media (max-height: 700px) {
        margin-top: 5rem;
    }
`;

const ActionButton = styled.button`
    background-color: beige;
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
        color: beige;
        box-shadow: 0 0 20px 5px beige;
        transform: scale(1.05) translateY(2rem);
        transition: background-color 1s, color 1s, transform 1s, box-shadow 1s;
    }

    transition: background-color 1s, color 1s, transform 1s, box-shadow 1s;

    // on mobile, make smaller
    @media (max-width: 600px) {
        font-size: 1rem;
        padding: 0.5rem 1rem;
    }

`;

export default Hero;