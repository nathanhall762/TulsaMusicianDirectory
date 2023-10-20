import { useState } from 'react';
import styled from 'styled-components';

export default () => {
  const [searchText, setSearchtext] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchtext(value);
  };

  return (
    <SearchPanel>
      <SearchTitle>Search For Artists</SearchTitle>
      <SearchBar
        type='text'
        name='search'
        value={searchText}
        onChange={handleInputChange}
      />
      <button>Search</button>
    </SearchPanel>
  );
};

const SearchPanel = styled.div`
  background-color: var(--color-background-alt);
  border-top: var(--color-background-main) solid 3px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 10px;
  margin-top: 4vh;
  @media (max-width: 1000px) {
    margin-top: 0;
  }
`;

const SearchTitle = styled.b`
  text-align: center;
  width: 100%;
`;

const SearchBar = styled.input`
  width: 60%;
`;
