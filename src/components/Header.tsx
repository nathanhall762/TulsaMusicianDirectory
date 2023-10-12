import { useState } from 'react';
import styled from 'styled-components';
import logo from '../assets/TMD-logo.png';
import { Link, useLocation } from 'react-router-dom';

const genres = [
  'Rock',
  'Americana',
  'Folk',
  'Electronic',
  'Rap',
  'Metal',
  'Bluegrass',
];

const Header = () => {
  const [genreFilter, setGenreFilter] = useState<string[]>([]);
  const location = useLocation;

  const handleGenreToggle = (e: any) => {
    const genre = e.target.textContent;
    if (genreFilter.includes(genre)) {
      setGenreFilter(genreFilter.filter((g) => g !== genre));
      return;
    }
    setGenreFilter([...genreFilter, genre]);
  };

  return (
    <HeaderWrapper>
      <Link to='/'>
        <Logo src={logo} alt='TMD logo' />
      </Link>
      <Link to='/'>
        <ShortTitle>TMD</ShortTitle>
      </Link>
      <TopHeader>
        <Link to='/'>
          <Title>The Tulsa Musician Directory</Title>
        </Link>
        <NavBar>
          <PageNavigation>
            <About $navSelected={location().pathname === '/about'}>
              <StyledLink to='/about'>
                <p>About</p>
              </StyledLink>
            </About>
            <Navigation
              $navSelected={
                location().pathname !== '/about' &&
                location().pathname !== '/discover'
              }
            >
              <StyledLink to='/'>
                <p>Directory</p>
              </StyledLink>
            </Navigation>
            <Discover $navSelected={location().pathname === '/discover'}>
              <StyledLink to='/discover'>
                <p>Discover</p>
              </StyledLink>
            </Discover>
          </PageNavigation>
          <Search className='fa-solid fa-magnifying-glass' />
          <Hamburger className='fa-solid fa-bars' />
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
    </HeaderWrapper>
  );
};

const StyledLink = styled(Link)`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderWrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 12vh;
  z-index: 5;
  background-color: var(--color-background-alt);
  // bottom box shadow
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.25);
  @media (max-width: 1000px) {
    height: 8vh;
  }
`;

const Logo = styled.img`
  height: 12vh;
  width: 12vh;
  border-radius: 100%;
  position: absolute;
  padding: 0.25em;
  margin-left: 1em;
  box-sizing: border-box;
  @media (max-width: 1000px) {
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.25);
    /* height: 65px;
    width: 65px; */
    margin-left: 0.5em;
    /* padding: 0; */
  }
`;

const Title = styled.h1`
  color: var(--color-primary);
  font-size: 25px;
  padding: 0 auto;
  @media (max-width: 800px) {
    display: none;
  }
`;

const ShortTitle = styled.h1`
  color: var(--color-primary);
  padding: 0;
  margin: 0;
  text-align: center;
  display: none;
  font-size: 20px;
  width: 100vw;
  height: 100%;
  position: absolute;
  justify-content: center;
  align-items: center;
  @media (max-width: 800px) {
    display: flex;
  }
`;

const TopHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 0 0 min(9em, 15%);
  margin-right: 0;
  height: 8vh;
  align-items: center;
  @media (max-width: 1000px) {
    padding-left: 100px;
    height: 8vh;
    width: 100vw;
    padding: 0;
  }
`;

const NavBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  min-width: 33%;
  margin: 0 10px;
  @media (max-width: 1000px) {
    margin-left: auto;
  }
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
  @media (max-width: 1000px) {
    display: none;
  }
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
    cursor: pointer;
    background-color: var(--color-background-main);
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

const Hamburger = styled.i`
  display: none;
  color: var(--color-primary);
  font-size: 1.5em;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.1);
    opacity: 80%;
  }
  @media (max-width: 1000px) {
    display: block;
  }
`;

const BottomHeader = styled.div`
  background-color: var(--color-secondary);
  padding: 0 0 0 min(9em, 15%);
  height: 4vh;
  display: flex;
  align-items: center;
  @media (max-width: 1000px) {
    display: none;
  }
`;

const GenreList = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0 0 0 0;
  font-size: 15px;
  justify-content: start;
`;

const Genre = styled.li<{ $genreSelected: boolean }>`
  border-radius: 25px;
  margin: 0 0.1em;
  background-color: var(--color-background-alt);
  padding: 0 0.75em;
  transition: all var(--animation-speed-fast) ease-in-out;
  &:hover {
    /* opacity: 80%; */
    cursor: pointer;
    transform: scale(0.95);
  }
  ${(props) => props.$genreSelected && 'background-color: var(--color-accent);'}
`;

export default Header;
