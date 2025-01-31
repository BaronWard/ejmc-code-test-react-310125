// SearchBar.js
import React, { useState } from 'react';
import launchService from '../../services/launchService';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async (event) => {
    if (event.code === 'Enter') {
      event.preventDefault();
      try {
        const data = await launchService.searchLaunches(searchTerm);
        onSearch(data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="container">
      <form className="search">
        <input
          type="search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search by mission name..."
          onKeyDown={handleSearch}
        />
      </form>
    </div>
  );
};

export default SearchBar;