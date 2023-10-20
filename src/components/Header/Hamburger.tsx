import styled from 'styled-components';

export default () => {
  return (
    <NavList>
      <li>About</li>
      <li>Directory</li>
      <li>Discover</li>
    </NavList>
  );
};

const NavList = styled.ul`
  background-color: var(--color-background-alt);
`;
