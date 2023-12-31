import styled from 'styled-components';
import logo from '../../assets/TMD-logo.webp';
import Hamburger from './Hamburger';
import Search from './Search';
import { Link, useLocation } from 'react-router-dom';
import useBearStore from '../../bearStore';
import SearchMobile from './SearchMobile';

const Header = () => {
  const openNav = useBearStore((state) => state.openNav);
  const setOpenNav = useBearStore((state) => state.setOpenNav);
  const location = useLocation();

  return (
    <>
      <HeaderWrapper className='header-wrapper'>
        <Link to='/' aria-label='Homepage'>
          <Logo className='logo' src={logo} alt='TMD logo' />
        </Link>
        <ShortTitleWrapper className='short-title-wrapper'>
          <ShortTitle className='short-title'>Music In Tulsa</ShortTitle>
        </ShortTitleWrapper>
        <TopHeader className='top-header'>
          <TitleWrapper className='title-link'>
            <Link to='/' aria-label='Music In Tulsa'>
              <Title className='title'>Music In Tulsa</Title>
            </Link>
            <Link to='/' aria-label='The Tulsa Musician Directory'>
              <h2>The Tulsa Musician Directory</h2>
            </Link>
          </TitleWrapper>
          <NavBar className='navbar'>
            {openNav === 'search' && <DesktopSearch />}
            {location.pathname === '/' && (
              <SearchIcon
                className='fa-solid fa-magnifying-glass'
                onClick={() => {
                  setOpenNav(openNav === 'search' ? '' : 'search');
                }}
              />
            )}
            <PageNavigation>
              <About $navSelected={location.pathname === '/about'}>
                <StyledLink to='/about' aria-label='About Page'>
                  <p>About</p>
                </StyledLink>
              </About>
              <Navigation
                $navSelected={
                  location.pathname !== '/about' &&
                  location.pathname !== '/discover'
                }
              >
                <StyledLink to='/' aria-label='Directory'>
                  <p>Directory</p>
                </StyledLink>
              </Navigation>
              <Discover $navSelected={location.pathname === '/discover'}>
                <StyledLink to='/discover' aria-label='Discover Page'>
                  <p>Discover</p>
                </StyledLink>
              </Discover>
            </PageNavigation>

            <HamburgerIcon
              className='fa-solid fa-bars'
              onClick={() => {
                setOpenNav(openNav === 'hamburger' ? '' : 'hamburger');
              }}
            />
          </NavBar>
        </TopHeader>
        {openNav === 'hamburger' && <Hamburger />}
        {openNav === 'search' && <SearchMobile />}
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
    height: 8vh;
    width: 8vh;
  }
`;

const TitleWrapper = styled.div`
  @media (max-width: 800px) {
    display: none;
  }
  display: flex;
  align-items: center;
  @media (max-width: 1000px) {
    padding-left: 15vh;
  }
  &:hover {
    h2 {
      opacity: 100%;
    }
  }
  h2 {
    display: flex;
    font-size: 1.3rem;
    color: var(--color-text-primary);
    padding: 0;
    margin: 0 0 0 2rem;
    opacity: 80%;
    transition: all var(--animation-speed-medium) ease-in-out;
    @media (max-width: 1100px) {
      display: none;
    }
  }
`;

const Title = styled.h1`
  color: var(--color-primary);
  font-size: 2.5rem;
  padding: 0;
  @media (max-width: 800px) {
    display: none;
  }
`;

const ShortTitleWrapper = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
`;

const ShortTitle = styled.h1`
  padding: 0;
  margin: 0;
  text-align: center;
  display: none;
  font-size: 20px;
  height: 100%;
  position: absolute;
  justify-content: center;
  align-items: center;
  color: var(--color-text-primary);
  @media (max-width: 800px) {
    display: flex;
  }
`;

const TopHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 15vh;
  margin-right: 0;
  height: 8vh;
  align-items: center;
  @media (max-width: 1000px) {
    width: 100vw;
    padding: 0;
  }
`;

export const NavBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  min-width: 33%;
  @media (max-width: 1000px) {
    margin-left: auto;
    min-width: 25%;
  }
`;

export const PageNavigation = styled.ul`
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

export const Navigation = styled.li<{ $navSelected: boolean }>`
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
  ${(props) => props.$navSelected && 'background-color: var(--color-accent);'}
`;

export const About = styled(Navigation)`
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
`;

export const Discover = styled(Navigation)`
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

const DesktopSearch = styled(Search)`
  display: none;
  @media (max-width: 1000px) {
    display: block;
  }
`;

// const MobileSearch = styled(Search)`
//   display: block;
//   @media (max-width: 1000px) {
//     display: none;
//   }
// `;

export default Header;
