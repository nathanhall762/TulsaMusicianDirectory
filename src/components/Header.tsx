import { useState } from 'react';
import styled from 'styled-components';

const genres = [
  'Rock',
  'Americana',
  'Folk',
  'Electronic',
  'Rap',
  'Metal',
  'Bluegrass',
];

type NavSelect = 'About' | 'Directory' | 'Discover';

const Header = () => {
  const [navSelected, setNavSelected] = useState<NavSelect>('Directory');

  const handleNavigation = (e: any) => {
    setNavSelected(e.target.textContent);
  };

  return (
    <div>
      <Logo src='src/assets/TMD-logo.png' alt='TMD logo' />
      <TopHeader>
        <Title>The Tulsa Musician Directory</Title>
        <NavBar>
          <PageNavigation>
            <Navigation
              onClick={handleNavigation}
              $navSelected={navSelected === 'About'}
            >
              <p>About</p>
            </Navigation>
            <Navigation
              onClick={handleNavigation}
              $navSelected={navSelected === 'Directory'}
            >
              <p>Directory</p>
            </Navigation>
            <Navigation
              onClick={handleNavigation}
              $navSelected={navSelected === 'Discover'}
            >
              <p>Discover</p>
            </Navigation>
          </PageNavigation>
          <Search className='fa-solid fa-magnifying-glass'></Search>
        </NavBar>
      </TopHeader>
      <BottomHeader>
        <GenreList>
          <Genre>Tulsa</Genre>
          {genres.map((genre) => (
            <Genre>{genre}</Genre>
          ))}
        </GenreList>
      </BottomHeader>
    </div>
  );
};

const Logo = styled.img`
  height: 120px;
  width: 120px;
  border-radius: 100%;
  position: absolute;
  // top: 10%;
  // left: 10%;
`;

const Title = styled.h1`
  font-size: 30px;
  color: var(--color-primary);
`;

const TopHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 200px;
  margin-left: auto;
  margin-right: 0;
  background-color: var(--color-background-alt);
`;

const NavBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 33%;
  margin: 0 10px;
`;

const PageNavigation = styled.ul`
  display: flex;
  align-items: center;
  background-color: var(--color-secondary);
  height: 2.5rem;
  border-radius: 25px;
  list-style: none;
  padding: 0;
`;

const Navigation = styled.li<{ $navSelected: boolean }>`
  padding: 0 1em;
  text-align: center;
  height: 100%;
  display: flex;
  align-items: center;
  transition: all 0.2s ease-in-out;
  width: 4em;
  &:hover {
    transform: scale(1.1);
    opacity: 80%;
  }
  ${(props) => props.$navSelected && 'background-color: black'}
`;

const Search = styled.i`
  color: var(--color-primary);
  font-size: 1.5em;
`;

const BottomHeader = styled.div`
  background-color: var(--color-secondary);
  padding: 0.5em 0;
`;

const GenreList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0 0 0 200px;
  padding: 0;
`;

const Genre = styled.li`
  border-radius: 25px;
  margin: 0 0.5em;
  background-color: var(--color-accent);
  padding: 0 0.75em;
`;

export default Header;
