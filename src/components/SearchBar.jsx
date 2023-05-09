import React, { useState } from 'react';

function SearchBar(props) {
  const [query, setQuery] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit(query);
  };

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={query} onChange={handleChange} placeholder="Search by name or category" />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;