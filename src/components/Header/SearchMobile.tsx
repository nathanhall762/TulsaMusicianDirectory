import { useState } from 'react';
// import GenreFilters from '../GenreFilters';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import useBearStore from '../../bearStore';

export default () => {
  const setOpenNav = useBearStore((state) => state.setOpenNav);
  const setSearchFilter = useBearStore((state) => state.setSearchFilter);
  const [searchText, setSearchtext] = useState<string>('');
  const location = useLocation();
  // const [windowSize, setWindowSize] = useState<number | null>(null);

  // useEffect(() => {
  //   setWindowSize(window.innerWidth);
  // }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchtext(value);
  };

  const handleSearch = () => {
    setSearchFilter(searchText);
  };

  const keyboardSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') setSearchFilter(searchText);
  };

  const handleClear = () => {
    setSearchFilter('');
    setSearchtext('');
  };

  return (
    <>
      <CloseButton
        className='fa-solid fa-xmark'
        onClick={() => setOpenNav('')}
      />

      <SearchPanel $genrePresent={location.pathname === '/'}>
        <SearchTitle>Search For Artists</SearchTitle>
        <SearchBar
          type='text'
          name='search'
          value={searchText}
          onChange={handleInputChange}
          onKeyDown={keyboardSearch}
        />
        <ButtonContainer>
          <StyledButton onClick={handleSearch}>Search</StyledButton>
          <StyledButton onClick={handleClear}>Clear</StyledButton>
        </ButtonContainer>
        {/* {windowSize !== null && windowSize >= 1000 && <GenreFilters />} */}
      </SearchPanel>
    </>
  );
};

const CloseButton = styled.i`
  position: absolute;
  right: 1em;
  cursor: pointer;
  top: calc(1em + 12vh);
  display: none;
  @media (max-width: 1000px) {
    top: calc(1em + 8vh);
  }
`;

const SearchPanel = styled.div<{ $genrePresent: boolean }>`
  background-color: var(--color-background-alt);
  width: 100%;
  display: none;
  align-items: center;
  gap: 10px;
  justify-content: center;
  z-index: 99;
  height: 8vh;
  /* box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.25); */
  @media (max-width: 1000px) {
    border-top: var(--color-background-main) solid 0.2rem;
    padding-top: 10px;
    flex-direction: column;
    margin-top: 0;
    padding-bottom: 0.5rem;
    height: auto;
    display: flex;
  }
`;

const SearchTitle = styled.b`
  text-align: center;
  display: none;
  @media (max-width: 1000px) {
    display: block;
  }
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

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const StyledButton = styled.button`
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
