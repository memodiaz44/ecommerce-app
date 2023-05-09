import React from "react";
import SearchResultItem from "./SearchResultItem";

function SearchResultList(props) {
  const { searchResults } = props;

  if (searchResults === null) {
    return <p>Loading...</p>; // or any other loading state you want to display
  }

  if (searchResults.length === 0) {
    return <p>No results found.</p>;
  }

  return (
    <ul>
      {searchResults.map((result) => (
        <SearchResultItem
          key={result.id}
          name={result.name}
          price={result.price}
          image={result.image}
        />
      ))}
    </ul>
  );
}

export default SearchResultList;
  
  
  
