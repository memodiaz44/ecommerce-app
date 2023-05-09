import React from 'react';
import '../stylesheets/Cart.css';
import Pay from './Pay';

function Cart({ cart, removeFromCart }) {
  const total = cart.reduce((acc, product) => acc + product.price, 0);

  return (
    <div className="cart-container">
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map((product) => (
              <li key={product.id}>
                <img src={product.image} alt={product.name} style={{ width: '200px', height: '200px' }} />
                {product.name} - ${product.price}
                <button onClick={() => removeFromCart(product)}>Remove</button>
              </li>
            ))}
          </ul>
          <p>Total: ${total}</p>
          <Pay amount={total} />
        </>
      )}
    </div>
  );
}


export default Cart;
