import styled from 'styled-components';
import logo from '../../assets/TMD-logo.png';
import Hamburger from './Hamburger';
import Search from './Search';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {
  const [hamburgerClicked, setHamburgerClicked] = useState(false);
  const [searchclicked, setSearchClicked] = useState(false);
  const location = useLocation();

  return (
    <>
      <HeaderWrapper>
        <Link to='/'>
          <Logo src={logo} alt='TMD logo' />
        </Link>
        <ShortTitle>TMD</ShortTitle>
        <TopHeader>
          <Link to='/'>
            <Title>The Tulsa Musician Directory</Title>
          </Link>
          <NavBar>
            <PageNavigation>
              <About $navSelected={location.pathname === '/about'}>
                <StyledLink to='/about'>
                  <p>About</p>
                </StyledLink>
              </About>
              <Navigation
                $navSelected={
                  location.pathname !== '/about' &&
                  location.pathname !== '/discover'
                }
              >
                <StyledLink to='/'>
                  <p>Directory</p>
                </StyledLink>
              </Navigation>
              <Discover $navSelected={location.pathname === '/discover'}>
                <StyledLink to='/discover'>
                  <p>Discover</p>
                </StyledLink>
              </Discover>
            </PageNavigation>
            <SearchIcon
              className='fa-solid fa-magnifying-glass'
              onClick={() => {
                setSearchClicked(!searchclicked);
                setHamburgerClicked(false);
              }}
            />
            <HamburgerIcon
              className='fa-solid fa-bars'
              onClick={() => {
                setHamburgerClicked(!hamburgerClicked);
                setSearchClicked(false);
              }}
            />
          </NavBar>
        </TopHeader>
        {searchclicked && <Search />}
        {hamburgerClicked && <Hamburger />}
      </HeaderWrapper>
    </>
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
  height: 8vh;
  z-index: 98;
  background-color: var(--color-background-alt);
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.25);
  @media (max-width: 1000px) {
    height: 8vh;
  }
`;

const Logo = styled.img`
  height: 12vh;
  width: 12vh;
  border-radius: 100%;
  position: fixed;
  padding: 0.25em;
  margin-left: 0.5em;
  box-sizing: border-box;
  z-index: 99;
  @media (max-width: 1000px) {
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.25);
    margin-left: 0.5em;
  }
`;

const Title = styled.h1`
  color: var(--color-primary);
  font-size: 25px;
  padding: 0 auto;
  @media (max-width: 1000px) {
    padding-left: 15vw;
  }
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
  padding-left: 13vw;
  margin-right: 0;
  height: 8vh;
  align-items: center;
  @media (max-width: 1000px) {
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
  @media (max-width: 1000px) {
    margin-left: auto;
    min-width: 25%;
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
  margin: 0 10px;
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

const SearchIcon = styled.i`
  color: var(--color-primary);
  font-size: 1.5em;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  z-index: 99;
  margin: 0 10px;
  &:hover {
    transform: scale(1.1);
    opacity: 80%;
  }
`;

const HamburgerIcon = styled.i`
  display: none;
  color: var(--color-primary);
  font-size: 1.5em;
  transition: all 0.2s ease-in-out;
  z-index: 99;
  cursor: pointer;
  margin: 0 10px;
  &:hover {
    transform: scale(1.1);
    opacity: 80%;
  }
  @media (max-width: 1000px) {
    display: block;
  }
`;

export default Header;
