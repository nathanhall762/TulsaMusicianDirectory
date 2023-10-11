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

  console.log(navSelected);

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
            <Navigation onClick={handleNavigation}>About</Navigation>
            <Navigation onClick={handleNavigation}>Directory</Navigation>
            <Navigation onClick={handleNavigation}>Discover</Navigation>
          </PageNavigation>
          <SearchIcon>Search</SearchIcon>
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
  gap: 20px;
`;

const PageNavigation = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--color-secondary);
  height: 2.5rem;
  border-radius: 25px;
`;

const Navigation = styled.div`
  padding: 0 1em;
  &:hover {
    opacity: 50%;
  }
`;

const SearchIcon = styled.span``;

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

const Directory = styled(Genre)`
  border-left: solid;
  border-right: solid;
`;

export default Header;
