/* eslint-disable */

import React, { useState, useEffect } from 'react';
import '../stylesheets/Products.css'
import Product from './Product';
import axios from 'axios';

function Products({ products, addToCart }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategorySelectChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredProducts = products.filter((product) => {
    if (!searchTerm && !selectedCategory) {
      return true;
    }
    if (searchTerm && !selectedCategory) {
      return product.name.toLowerCase().includes(searchTerm.toLowerCase());
    }
    if (!searchTerm && selectedCategory) {
      return product.category === selectedCategory;
    }
    return (
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      product.category === selectedCategory
    );
  });

  const categories = Array.from(new Set(products.map((product) => product.category)));

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search products"
          value={searchTerm}
          onChange={handleSearchInputChange}
        />
        <select value={selectedCategory} onChange={handleCategorySelectChange}>
          <option value="">All categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button onClick={() => addToCart(product)}>Add to cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
}


export default Products;
