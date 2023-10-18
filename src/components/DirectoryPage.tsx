import CardContainer from './MusicianCard/CardContainer';
import AddButtons from './MusicianCard/AddButtons';
// import Header from './Header';
import GenreFilters from './MusicianCard/GenreFilters';
import styled from 'styled-components';

const DirectoryPage = () => {

  return (
    <div>
      <Spacer />
      <GenreFilters />
      <CardContainer />
      <AddButtons />
    </div>
  );
};

export const Spacer = styled.div`
  height: 12vh;
  z-index: 98;
  @media (max-width: 1000px) {
    height: 8vh;
  }
`;

export default DirectoryPage;
