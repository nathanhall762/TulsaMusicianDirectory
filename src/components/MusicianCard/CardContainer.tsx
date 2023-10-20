import MusicianCard from './MusicianCard';
import useBearStore from '../../bearStore';
import styled from 'styled-components';

const CardContainer = () => {
  const musicians = useBearStore((state) => state.musicians);
  const genreFilter = useBearStore((state) => state.genreFilter);

  const filteredMusicians = genreFilter.length
    ? musicians.filter((musician) => genreFilter.includes(musician.genre[0]))
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
  padding: 2rem;
  text-align: center;
`;

export default CardContainer;
