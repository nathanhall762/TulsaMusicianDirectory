import MusicianCard from './MusicianCard';
import useBearStore from '../../bearStore';
import styled from 'styled-components';
import { Musician } from '../../global';

const CardContainer = () => {
  const musicians = useBearStore((state) => state.musicians);
  const genreFilter = useBearStore((state) => state.genreFilter);
  const searchFilter = useBearStore((state) => state.searchFilter);

  const filterMusicians = (musician: Musician) => {
    if (!searchFilter) return genreFilter.includes(musician.genre[0]);
    return (
      genreFilter.includes(musician.genre[0]) ||
      musician.name.toLowerCase().includes(searchFilter.toLowerCase())
    );
  };

  const filteredMusicians =
    genreFilter.length || searchFilter
      ? musicians.filter(filterMusicians)
      : musicians;

  const sortedMusicians = [...filteredMusicians].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <CardContainerDiv>
      {sortedMusicians.map((musician) => (
        <MusicianCard key={musician.name} musician={musician} />
      ))}
    </CardContainerDiv>
  );
};

const CardContainerDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
  padding: rem;
  text-align: center;
  width: 90%;
`;

export default CardContainer;
