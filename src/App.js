import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Products from './components/Products';
import Cart from './components/Cart';
import NotFound from './components/NotFound';
import Phone from './imagerpod/image1.png';
import Mac from './imagerpod/image2.png';
import Airpod from './imagerpod/image3.png';
import Applewatch from './imagerpod/image4.png';
import Galaxy22 from './imagerpod/image5.png';
import Galaxywatch from './imagerpod/image6.png';
import GalaxyZ from './imagerpod/image7.png';
import Ps5 from './imagerpod/image8.png';
import SonyX from './imagerpod/image9.png';
import Surface from './imagerpod/image10.png';
import Xbox from './imagerpod/image11.png';



function App() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Iphone 14', price: 799.99, image: Phone,  category: 'apple' },
    { id: 2, name: 'Macbook pro 13', price: 599.99, image: Mac,  category: 'apple' },
    { id: 3, name: 'Airpods', price: 279.99, image: Airpod,  category: 'apple' },
    { id: 4, name: 'Apple watch', price: 249.99, image: Applewatch ,  category: 'apple' },
    { id: 5, name: 'Galaxy 22', price: 700.99, image: Galaxy22,  category: 'samsung' },
    { id: 6, name: 'Galaxy watch', price: 299.99, image: Galaxywatch,  category: 'samsung' },
    { id: 7, name: 'Galaxy Z Fold', price: 999.99, image: GalaxyZ,  category: 'samsung' },
    { id: 8, name: 'PS 5', price: 399.99, image: Ps5,  category: 'sony' },
    { id: 9, name: 'Sony Xperia pro', price: 899.99, image: SonyX,  category: 'sony' },
    { id: 10, name: 'Surface studio', price: 1299.99, image: Surface,  category: 'microsoft' },
    { id: 11, name: 'Xbox series x', price: 449.99, image: Xbox,  category: 'microsoft' },
  ]);


  const [cart, setCart] = useState([]);
  console.log(setProducts);
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (product) => {
    const newCart = cart.filter((item) => item.id !== product.id);
    setCart(newCart);
  };

  return (
    <Router>
      <div className="App">
        <header>
          <h1 className='title'>E-SHOP</h1>
          <div className='items'>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/products">Products</Link>
              </li>
              <li>
                <Link to="/cart">Cart ({cart.length})</Link>
              </li>
            </ul>
          </nav>
          </div>
        </header>
        <main>
          <Routes>
        
          <Route exact path="/" element={<Home products={products} />} />

            <Route path="/products" element={<Products products={products} addToCart={addToCart} />} />
            <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
