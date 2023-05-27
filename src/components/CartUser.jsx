import React, { useContext } from 'react';
import { UserContext } from '../App';
import '../stylesheets/Cart.css';
import Pay from './Pay';

function CartUser({ cartuser, removeFromCart }) {
  const { user } = useContext(UserContext);
  const total = cartuser.reduce((acc, product) => acc + product.price, 0);

  if (!user) {
    return <p>Please log in to access the cart.</p>;
  }

  return (
    <div className="cart-container">
      <h2>Cart</h2>
      {cartuser.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cartuser.map((product) => (
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

export default CartUser;
