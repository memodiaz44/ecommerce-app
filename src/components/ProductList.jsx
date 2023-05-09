/* eslint-disable */

import { useState, useEffect } from 'react';
import { getAllProducts } from './api';



function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const allProducts = await getAllProducts();
      setProducts(allProducts);
    }
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>
      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>Price: {product.price}</p>
          <p>Description: {product.description}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductList;