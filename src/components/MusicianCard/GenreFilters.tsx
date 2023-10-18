import styled from 'styled-components';
import useBearStore from '../../bearStore';

const genres = [
  'Rock',
  'Americana',
  'Folk',
  'Electronic',
  'Rap',
  'Metal',
  'Bluegrass',
];
const genreFilters = () => {
  const genreFilter = useBearStore((state) => state.genreFilter);
  const setGenreFilter = useBearStore((state) => state.setGenreFilter);

  const handleGenreToggle = (e: any) => {
    const genre = e.target.textContent;
    if (genreFilter.includes(genre)) {
      setGenreFilter(genreFilter.filter((g) => g !== genre));
      return;
    }
    setGenreFilter([...genreFilter, genre]);
  };
  console.log(genreFilter);
  return (
    <BottomHeader>
      <GenreList>
        <Genre $genreSelected={true}>Tulsa</Genre>
        {genres.map((genre) => (
          <Genre
            onClick={handleGenreToggle}
            $genreSelected={genreFilter.includes(genre)}
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
  padding: 0 0 0 min(9em, 15%);
  height: 4vh;
  display: flex;
  align-items: center;
  top: 8vh;
  z-index: 97;
  width: 100vw;
  position: fixed;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.25);
  @media (max-width: 1000px) {
    display: none;
  }
`;

const GenreList = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0 0 0 0;
  font-size: 15px;
  justify-content: start;
`;

const Genre = styled.li<{ $genreSelected: boolean }>`
  border-radius: 25px;
  margin: 0 0.1em;
  background-color: var(--color-background-alt);
  padding: 0 0.75em;
  transition: all var(--animation-speed-fast) ease-in-out;
  &:hover {
    /* opacity: 80%; */
    cursor: pointer;
    transform: scale(0.95);
  }
  ${(props) => props.$genreSelected && 'background-color: var(--color-accent);'}
`;

export default genreFilters;
