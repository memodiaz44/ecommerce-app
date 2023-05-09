import React from "react";
import '../stylesheets/Products.css'

const Product = ({ product, addToCart, category }) => {
    if (!product) {
      return null;
    }
  
    if (category && product.category !== category) {
      return null;
    }
  
    return (
      <div className="products">
        <img src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
        <p>{product.price}</p>
        <button onClick={() => addToCart(product)}>Add to cart</button>
      </div>
    );
  };

  export default Product;