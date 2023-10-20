import { useState } from 'react';
import GenreFilters from '../GenreFilters';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

export default () => {
  const [searchText, setSearchtext] = useState<string>('');
  const location = useLocation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchtext(value);
  };
  console.log(location.pathname === '/');
  return (
    <SearchPanel $genrePresent={location.pathname === '/'}>
      <SearchTitle>Search For Artists</SearchTitle>
      <SearchBar
        type='text'
        name='search'
        value={searchText}
        onChange={handleInputChange}
      />
      <SearchButton>Search</SearchButton>
      {window.innerWidth < 1000 && <GenreFilters />}
    </SearchPanel>
  );
};

const SearchPanel = styled.div<{ $genrePresent: boolean }>`
  background-color: var(--color-background-alt);
  border-top: var(--color-background-main) solid 3px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  /* margin-top: 4vh; */
  ${(props) => (props.$genrePresent ? 'margin-top: 4vh;' : 'margin-top: 0;')}
  flex-direction: row;
  justify-content: center;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.25);
  @media (max-width: 1000px) {
    flex-direction: column;
    margin-top: 0;
  }
`;

const SearchTitle = styled.b`
  text-align: center;
`;

const SearchBar = styled.input`
  width: 60%;
  width: 20rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: none;
  background-color: var(--color-background-main);
  color: var(--color-text-primary);
  font-size: 0.75;
  border: 1px solid var(--color-text-primary);
  &:focus {
    outline: none;
    background-color: var(--color-background-alt);
  }
  @media (max-width: 768px) {
    width: 15rem;
  }
  &:hover {
    background-color: var(--color-background-alt);
  }
`;

const SearchButton = styled.button`
  background-color: var(--color-accent);
  color: var(--color-text-inverse);
  font-size: 0.75;
  font-weight: 700;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: none;
  transition: all var(--animation-speed-fast) ease;
  &:hover {
    cursor: pointer;
    background-color: var(--color-background-main);
  }
`;
