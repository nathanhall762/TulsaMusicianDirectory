import styled from 'styled-components';
import SpotifyRecs from './SpotifyRecs';
import ManualRecs from './ManualRecs';
import React, { useState } from 'react';

interface DiscoverPageProps {
  defaultSelectedMode: 'Spotify' | 'Manual';
}

const DiscoverPage: React.FC<DiscoverPageProps> = ({ defaultSelectedMode }) => {
  const [selectedMode, setSelectedMode] = useState<'Spotify' | 'Manual'>(
    defaultSelectedMode
  );

  return (
    <>
      <Title>Discover</Title>
      <DiscoverPageLanding>
        <PageNavigation>
          <ModeSelectButton
            className={selectedMode === 'Spotify' ? 'selected' : ''}
            onClick={() => setSelectedMode('Spotify')}
          >
            <StyledLink>
              <p>Spotify</p>
            </StyledLink>
          </ModeSelectButton>
          <ModeSelectButton
            className={selectedMode === 'Manual' ? 'selected' : ''}
            onClick={() => setSelectedMode('Manual')}
          >
            <StyledLink>
              <p>Manual</p>
            </StyledLink>
          </ModeSelectButton>
        </PageNavigation>
      </DiscoverPageLanding>

      {selectedMode === 'Spotify' && (
        <SpotifyLogin>
          <ButtonBox>
            <SpotifyRecs />
          </ButtonBox>
        </SpotifyLogin>
      )}
      {selectedMode === 'Manual' && (
        <ManualInput>
          <ButtonBox>
            <ManualRecs />
          </ButtonBox>
        </ManualInput>
      )}
    </>
  );
};

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-direction: column;
  button {
    background-color: var(--color-accent);
    color: var(--color-text-inverse);
    font-size: 1rem;
    font-weight: 700;
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: none;
    transition: all var(--animation-speed-fast) ease;
    &:hover {
      cursor: pointer;
      background-color: var(--color-background-main);
    }
  }
`;

const StyledLink = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  text-align: center;
  color: var(--color-accent);
`;

const DiscoverPageLanding = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  width: 100%;
  height: 80%;
`;

export const PageNavigation = styled.ul`
  display: flex;
  align-items: center;
  background-color: var(--color-accent);
  height: 2.5rem;
  border-radius: 25px;
  list-style: none;
  padding: 0;
  font-size: 15px;
  font-weight: bold;
  margin: 0 10px;
`;

export const ModeSelectButton = styled.div`
  border-radius: 25px;
  padding: 0 1em;
  text-align: center;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;
  width: 4em;
  &:hover {
    /* transform: scale(1.1); */
    cursor: pointer;
    background-color: var(--color-primary) !important;
    color: var(--color-secondary) !important;
  }
  &.selected {
    transform: scale(1.1);
    cursor: pointer;
    background-color: var(--color-primary);
    color: var(--color-secondary);
  }
`;

const ManualInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-background-alt);
  border-radius: 25px;
  margin: 5rem;
  text-align: center;
  padding: 2rem;
  @media (max-width: 1000px) {
    margin: 3rem 1rem;
    padding: 2rem 0;
  }
`;

const SpotifyLogin = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-background-alt);
  border-radius: 25px;
  margin: 5rem;
  text-align: center;
  padding: 2rem;
  @media (max-width: 1000px) {
    margin: 3rem 1rem;
    padding: 2rem 0;
  }
`;

export default DiscoverPage;
