import styled from 'styled-components';
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

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const toggleGenre = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleSubmit = () => {
    console.log(selectedGenres);
  };

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
