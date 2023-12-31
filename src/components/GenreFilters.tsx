import styled from 'styled-components';
import useBearStore from '../bearStore';
import { useState } from 'react';

const GenreFilters = () => {
  const musicians = useBearStore((state) => state.musicians);
  const genreFilter = useBearStore((state) => state.genreFilter);
  const setGenreFilter = useBearStore((state) => state.setGenreFilter);
  const searchFilter = useBearStore((state) => state.searchFilter);
  const setSearchFilter = useBearStore((state) => state.setSearchFilter);
  const [orderedGenres, setOrderedGenres] = useState<string[]>([]);

  const genreFrequency: { [key: string]: number } = {};
  musicians.forEach((musician) => {
    const genre = musician.genre[0];
    if (genreFrequency[genre]) {
      genreFrequency[genre]++;
    } else {
      genreFrequency[genre] = 1;
    }
  });

  const sortedGenres = Object.keys(genreFrequency).sort(
    (a, b) => genreFrequency[b] - genreFrequency[a]
  );

  const genresDynamic = Array.from(new Set(sortedGenres));

  const filters = searchFilter
    ? [searchFilter, ...genresDynamic]
    : genresDynamic;

  const handleGenreToggle = (e: any) => {
    const genre = e.target.textContent;

    if (genre === searchFilter) {
      setSearchFilter('');
      return;
    }
    if (genreFilter.includes(genre)) {
      setGenreFilter(genreFilter.filter((g) => g !== genre));
      setOrderedGenres(orderedGenres.filter((g) => g !== genre)); // Remove genre from ordered list
      return;
    }
    setGenreFilter([...genreFilter, genre]);
    setOrderedGenres([genre, ...orderedGenres]); // Add genre to the start of the ordered list
  };

  return (
    <BottomHeader className='genreFilter'>
      <GenreList>
        <GenreBase $genreSelected={true}>Tulsa</GenreBase>
        {filters.map((genre) => (
          <Genre
            onClick={handleGenreToggle}
            key={genre}
            $genreSelected={
              genreFilter.includes(genre) || genre === searchFilter
            }
            $order={orderedGenres.indexOf(genre)} // Set order based on its position in orderedGenres
          >
            {genre}
          </Genre>
        ))}
      </GenreList>
    </BottomHeader>
  );
};

const BottomHeader = styled.div`
  background-color: var(--color-secondary);
  /* height: 4vh; */
  display: flex;
  align-items: center;
  top: 8vh;
  z-index: 97;
  /* width: 100vw; */
  position: sticky;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.25);
  overflow: auto;
  padding: 0 0 0 12vh;
  @media (max-width: 600px) {
    position: sticky;
    padding: 0;
  }
`;

const GenreList = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  font-size: 15px;
  width: auto;
  justify-content: start;
  margin: 0.5rem 0;
  /* @media (max-width: 1000px) {
    margin: 0 5%;
  } */
`;

const GenreBase = styled.li<{ $genreSelected: boolean }>`
  border-radius: 25px;
  margin: 0 0.1em;
  background-color: var(--color-background-alt);
  padding: 0 0.75em;
  transition: all var(--animation-speed-fast) ease-in-out;
  z-index: 99;
  height: 1.5em;
  width: max-content;
  font-size: 1rem;
  &:hover {
    cursor: pointer;
    transform: scale(0.95);
  }
  ${(props) => props.$genreSelected && 'background-color: var(--color-accent);'}
`;

const Genre = styled(GenreBase)<{ $order: number }>`
  order: ${(props) => (props.$order === -1 ? 5 : props.$order)};
  display: block;
`;

export default GenreFilters;
