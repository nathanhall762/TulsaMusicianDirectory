import styled, { keyframes } from 'styled-components';
import recommendationRequest from './recommendationRequest';
import CardContainer from '../MusicianCard/CardContainer';
import { useState } from 'react';

export default () => {
  const genreNames = [
    'Hip-Hop',
    'Pop',
    'Country',
    'Latin',
    'Rock',
    'R&B',
    'Dance/Electronic',
    'Indie',
    'Jazz',
    'Folk & Acoustic',
    'Ambient',
    'Alternative',
    'Classical',
    'Soul',
    'Punk',
    'Blues',
    'Afro',
    'Metal',
    'Funk & Disco',
  ];

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [recommendations, setRecommendations] = useState<string[] | null>(null);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const toggleGenre = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    console.log(selectedGenres);
    await (() => new Promise((resolve) => setTimeout(resolve, 2000)))();
    setIsLoading(false);
    console.log('done');

    // recommendationRequest(selectedGenres)
    //   .then((response) => {
    //     // this is an array of [spotify IDs, match value]
    //     console.log(`Response Recs: `, response);

    //     // match spotify IDs to firestore IDs
    //     // from musicians global state
    //     // this code is attrocious
    //     // pls help
    //     const musicRecs: [string] = response.map((artist: [string, string]) => {
    //       const correctMusician = musicians.find((musician) =>
    //         musician.music.spotify.includes(artist[0])
    //       );
    //       return correctMusician?.id;
    //     });

    //     // set the musicianIds to the response
    //     setMusicianIds(musicRecs);
    //     setRecommendationLoading(false);
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching recommendations', error);
    //     setLoadingMessage('Error fetching recommendations. Please try again.');
    //   });
  };

  if (recommendations) {
    return <CardContainer musicianIds={recommendations} />;
  } else if (isLoading) {
    return (
      <ButtonBox>
        <LoadingMessage>Loading Your Recommendations</LoadingMessage>
        <Loader />
      </ButtonBox>
    );
  } else {
    return (
      <>
        <ManualInstructionMessage>Select Genres</ManualInstructionMessage>
        <GenreButtonBox>
          {genreNames.map((genreName) => (
            <StyledGenreButton
              key={genreName}
              onClick={() => toggleGenre(genreName)}
              isSelected={selectedGenres.includes(genreName)}
            >
              {genreName}
            </StyledGenreButton>
          ))}
        </GenreButtonBox>
        <SubmitButton
          onClick={handleSubmit}
          isEnabled={selectedGenres.length > 0}
        >
          Submit
        </SubmitButton>
      </>
    );
  }
};

const SubmitButton = styled.button<{ isEnabled: boolean }>`
  background-color: var(--color-secondary) !important;
  box-shadow: 0 0 5px var(--color-primary);
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  font-weight: bold;
  margin: 1rem;
  padding: 0.5rem 1rem;
  transition: all 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    background-color: var(--color-background-main) !important;
    color: var(--color-text-primary) !important;
    box-shadow: 0 0 0px var(--color-secondary);
  }
  ${({ isEnabled }) =>
    isEnabled
      ? `
    background-color: var(--color-primary) !important;
    color: var(--color-text-primary) !important;
    `
      : `
    background-color: var(--color-background-main) !important;
    color: var(--color-text-primary) !important;
    box-shadow: 0 0 0px var(--color-secondary);
    `}
`;

const ManualInstructionMessage = styled.h2`
  color: var(--color-text-primary);
`;

const GenreButtonBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
  width: 80%;
  @media (max-width: 1000px) {
    width: 100%;
  }
`;

const StyledGenreButton = styled.button<{ isSelected: boolean }>`
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0.5rem;
  padding: 0.5rem 1rem;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  ${({ isSelected }) =>
    isSelected
      ? `
    background-color: var(--color-accent) !important;
    color: var(--color-text-primary) !important;
    `
      : `
    background-color: var(--color-background-main) !important;
    color: var(--color-text-primary) !important;
    `}
  &:hover {
    background-color: var(--color-accent) !important;
    color: var(--color-text-primary) !important;
  }
`;

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

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Loader = styled.div`
  border: 5px solid var(--color-background-main); /* Light grey */
  border-top: 5px solid var(--color-accent); /* Blue */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${rotate} 2s linear infinite;
  margin: 20px auto;
`;

const LoadingMessage = styled.p`
  font-size: 1.2rem;
  font-weight: 700;
  margin: 1rem;
`;
