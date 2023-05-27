import React, { useContext } from 'react';
import { UserContext } from './UserProvider';
import Product from './Product';

const Products = () => {
  const { products, addToCart, addToCartUser } = useContext(UserContext);

  return (
    <div>
      <h2>Products</h2>
      {products && products.map((product) => (
        <Product
          key={product.id}
          product={product}
          addToCart={addToCart}
          addToCartUser={addToCartUser} // Pass the addToCartUser function as a prop
          category={product.category} // Pass the category as a prop
        />
      ))}
    </div>
  );
};

export default Products;
