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

const UHeader = () => {
  const [navSelected, setNavSelected] = useState<NavSelect>('Directory');
  const [genreFilter, setGenreFilter] = useState<string[]>([]);

  const handleNavigation = (e: any) => {
    setNavSelected(e.target.textContent);
  };

  const handleGenreToggle = (e: any) => {
    const genre = e.target.textContent;
    if (genreFilter.includes(genre)) {
      setGenreFilter(genreFilter.filter((g) => g !== genre));
      return;
    }
    setGenreFilter([...genreFilter, genre]);
  };

  return (
    <div>
      <Logo src='src/assets/TMD-logo.png' alt='TMD logo' />
      <TopHeader>
        <Title>The Tulsa Musician Directory</Title>
        <NavBar>
          <PageNavigation>
            <About
              onClick={handleNavigation}
              $navSelected={navSelected === 'About'}
            >
              <p>About</p>
            </About>
            <Navigation
              onClick={handleNavigation}
              $navSelected={navSelected === 'Directory'}
            >
              <p>Directory</p>
            </Navigation>
            <Discover
              onClick={handleNavigation}
              $navSelected={navSelected === 'Discover'}
            >
              <p>Discover</p>
            </Discover>
          </PageNavigation>
          <Search className='fa-solid fa-magnifying-glass' />
        </NavBar>
      </TopHeader>
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
    </div>
  );
};

const Header = styled(UHeader)`
  background-color: var(--color-background-alt);
  postion: static;
  top: 0;
`;

const Logo = styled.img`
  height: 100px;
  width: 100px;
  border-radius: 100%;
  position: absolute;
  margin: 0.75em;
`;

const Title = styled.h1`
  font-size: 25px;
  color: var(--color-primary);
`;

const TopHeader = styled.div`
  margin-left: 120px;
  gap: 0;
  display: flex;
  justify-content: space-around;
  padding: 0.25em 0 0.25em 0;
  margin-right: 0;
`;

const NavBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
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
  font-size: 15px;
  font-weight: bold;
`;

const Navigation = styled.li<{ $navSelected: boolean }>`
  padding: 0 1em;
  text-align: center;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;
  width: 4em;
  &:hover {
    transform: scale(1.1);
    opacity: 80%;
  }
  ${(props) => props.$navSelected && 'background-color: black;'}
`;

const About = styled(Navigation)`
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
`;

const Discover = styled(Navigation)`
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
`;

const Search = styled.i`
  color: var(--color-primary);
  font-size: 1.5em;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.1);
    opacity: 80%;
  }
`;

const BottomHeader = styled.div`
  background-color: var(--color-secondary);
  padding: 0.25em 0 0.25em 10em;
`;

const GenreList = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0 0 0 0;
  font-size: 15px;
`;

const Genre = styled.li<{ $genreSelected: boolean }>`
  border-radius: 25px;
  margin: 0 0.5em;
  background-color: var(--color-accent);
  padding: 0 0.75em;
  &:hover {
    opacity: 80%;
  }
  ${(props) => props.$genreSelected && 'background-color: black;'}
`;

export default Header;
