import React from "react";

function SearchResultItem(props) {
  const { name, price, image } = props;

  return (
    <li>
      <h3>{name}</h3>
      <img src={image} alt={name} />
      <p>${price.toFixed(2)}</p>
    </li>
  );
}

export default SearchResultItem;