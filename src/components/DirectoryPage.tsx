import CardContainer from './MusicianCard/CardContainer';
import AddButtons from './MusicianCard/AddButtons';
import GenreFilters from './GenreFilters';
import styled from 'styled-components';

// adding the hero section
import Hero from './Hero';

const DirectoryPage = () => {
  return (
    <div>
      {window.innerWidth >= 1000 && <GenreFilters />}
      <Spacer />
      <Hero />
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
