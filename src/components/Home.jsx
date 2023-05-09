import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import '../stylesheets/Home.css';

function Home({ products }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);

  const categories = [...new Set(products.map((product) => product.category))];

  const handleClick = (category) => {
    setSelectedCategory(category);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  let productsToDisplay =
    selectedCategory === null
      ? filteredProducts
      : filteredProducts.filter((product) => product.category === selectedCategory);

  if (searchQuery !== '') {
    productsToDisplay = productsToDisplay.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  return (
    <div className="home-container">
      <h2>Categories</h2>
      <ul>
        <li>
          <Link to="/" onClick={() => handleClick(null)}>
            All
          </Link>
        </li>
        {categories.map((category) => (
          <li key={category}>
            <Link to="/" onClick={() => handleClick(category)}>
              {category}
            </Link>
          </li>
        ))}
      </ul>
      <SearchBar onSubmit={handleSearch} />
      <div className="products-container">
        {productsToDisplay && productsToDisplay.length > 0 ? (
          productsToDisplay.map((product) => (
            <Link key={product.id} to={`/products`}>
              <div className="product">
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.price}</p>
              </div>
            </Link>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
}

export default Home;
