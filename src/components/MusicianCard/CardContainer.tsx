import MusicianCard from './MusicianCard';
import useBearStore from '../../bearStore';
import styled from 'styled-components';
import { Musician } from '../../global';

interface CardContainerProps {
  musicianIds?: string[]; // Optional array of musician IDs
}

const CardContainer = ({ musicianIds }: CardContainerProps) => {
  const musicians = useBearStore((state) => state.musicians);
  const genreFilter = useBearStore((state) => state.genreFilter);
  const searchFilter = useBearStore((state) => state.searchFilter);

  // console.log(musicians);

  if (musicianIds) {
    // console.log(`Musician IDs: ${musicianIds}`);
    // const filteredMusicians = musicians.filter((musician) =>
    //   musicianIds.includes(musician.id)
    // );
  }

  const filterMusicians = (musician: Musician) => {
    // Prioritize filtering by musicianIds if provided and not empty
    if (musicianIds && musicianIds.length > 0) {
      return musicianIds.includes(musician.id);
    }

    // Then check for genre and search filters
    const genreMatch =
      genreFilter.length === 0 || genreFilter.includes(musician.genre[0]);
    const searchMatch =
      !searchFilter ||
      musician.name.toLowerCase().includes(searchFilter.toLowerCase());

    return genreMatch && searchMatch;
  };

  const filteredMusicians = musicians.filter(filterMusicians);

  // const filteredMusicians =
  //   genreFilter.length || searchFilter || musicianIds
  //     ? musicians.filter(filterMusicians)
  //     : musicians;

  const sortedMusicians = [...filteredMusicians].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <CardContainerDiv className='card-container'>
      {sortedMusicians.map((musician) => (
        <MusicianCard
          key={musician.name}
          musician={musician}
          isPending={false}
        />
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
