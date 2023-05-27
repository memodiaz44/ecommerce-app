import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import SearchResultList from './SearchResultList';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`http://3.19.219.106:5000/api/search?query=${searchTerm}`);
      setSearchResults(response.data.results);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <SearchBar onSubmit={handleSubmit} />
      
      {searchResults.length === 0 && searchTerm !== '' && (
        <p>No products found.</p>
      )}

      {searchResults.length !== 0 && (
        <SearchResultList searchResults={searchResults} />
      )}
    </div>
  );
}

export default Search;