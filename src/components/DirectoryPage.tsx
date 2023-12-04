import CardContainer from './MusicianCard/CardContainer';
import AddButtons from './MusicianCard/AddButtons';
import GenreFilters from './GenreFilters';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

const DirectoryPage = () => {
  const [windowSize, setWindowSize] = useState<number | null>(null);

  useEffect(() => {
    setWindowSize(window.innerWidth);
  }, []);

  return (
    <div>
      {windowSize !== null && windowSize >= 1000 && <GenreFilters />}
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
