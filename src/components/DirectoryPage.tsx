import CardContainer from './MusicianCard/CardContainer';
import AddButtons from './MusicianCard/AddButtons';
import GenreFilters from './GenreFilters';
import styled from 'styled-components';

const DirectoryPage = () => {
  return (
    <div>
      <GenreFilters />
      <Spacer />
      <CardContainer />
      <AddButtons />
    </div>
  );
};

const Spacer = styled.div`
  height: 4vh;
  z-index: 98;
  @media (max-width: 1000px) {
    display: none;
  }
`;

export default DirectoryPage;
