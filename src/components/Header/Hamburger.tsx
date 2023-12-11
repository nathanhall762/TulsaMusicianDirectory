import styled from 'styled-components';
import { Link } from 'react-router-dom';
import useBearStore from '../../bearStore';

export default () => {
  const setOpenNav = useBearStore((state) => state.setOpenNav);

  return (
    <>
      <CloseButton
        className='fa-solid fa-xmark'
        onClick={() => setOpenNav('')}
      />
      <NavList>
        <NavItem>
          <StyledLink to='/about' onClick={() => setOpenNav('')}>
            About
          </StyledLink>
        </NavItem>
        <NavItem>
          <StyledLink to='/' onClick={() => setOpenNav('')}>
            Directory
          </StyledLink>
        </NavItem>
        <NavItem>
          <StyledLink to='/discover' onClick={() => setOpenNav('')}>
            Discover
          </StyledLink>
        </NavItem>
      </NavList>
    </>
  );
};

const CloseButton = styled.i`
  position: absolute;
  right: 1em;
  top: calc(1em + 8vh);
  cursor: pointer;
`;

const NavList = styled.ul`
  background-color: var(--color-background-alt);
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: var(--color-background-main) solid 3px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.25);
`;

const NavItem = styled.li`
  width: 100%;
  height: 5rem;
  display: flex;
  align-items: center;
  background-color: var(--color-background-main);
  margin-bottom: 0.1rem;
  border-radius: 15px;
`;

const StyledLink = styled(Link)`
  padding: 10px 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-inverse);
  :hover {
    color: var(--color-accent);
  }
`;
