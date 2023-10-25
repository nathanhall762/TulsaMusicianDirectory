import styled from 'styled-components';
import { Link } from 'react-router-dom';
import useBearStore from '../../bearStore';

export default () => {
  const setOpenNav = useBearStore((state) => state.setOpenNav);

  return (
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
  );
};

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
  width: 50%;
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
