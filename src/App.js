/* eslint-disable */

import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css';

import Home from './components/Home';
import Products from './components/Products';
import Cart from './components/Cart';
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';
import NotFound from './components/NotFound';
import Dashboard from './components/Dashboard';
import CartUser from './components/CartUser';
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
import axios from 'axios';

export const UserContext = React.createContext()


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

  

  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartUser, setCartUser] = useState([]);
  const [error, setError] = useState('');



  const api = axios.create({
    baseURL: 'http://3.19.219.106:5000',
    withCredentials: true // Send cookies along with requests
  });




 // ...

const addToCart = (product) => {
  if (user) {
    // User is logged in, add to cartUser
    setCartUser([...cartUser, product]);
  } else {
    // User is not logged in, add to cart
    setCart([...cart, product]);
  }
};

// ...



const addToCartUser = (product) => {
  setCartUser([...cartUser, product]);

  if (user) {
    // User is logged in, save cart data to the backend
    api.post('/api/cart', { product })
      .then((response) => {
        console.log('Cart data saved successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error saving cart data:', error);
      });
  }
};


  const removeFromCart = (product) => {
    const newCart = cart.filter((item) => item.id !== product.id);
    setCart(newCart);
  };

  const removeFromCartUser = (product) => {
    const newCartUser = cartUser.filter((item) => item.id !== product.id);
    setCartUser(newCartUser);
  };


  const handleLogin = async (email, password) => {
    try {
      const response = await api.post('/api/users/login', { email, password });
      localStorage.setItem('user', JSON.stringify(response.data));
      setUser(response.data); // Set user state to the logged-in user
      
      // Reset the cart
      setCart([]);
      
      // Retrieve user's cart data
      axios
        .get('/api/cart')
        .then((res) => {
          setCart(res.data);
        })
        .catch((err) => {
          setError('Error retrieving cart data');
        });
        
      console.log('User logged in successfully:', response.data);
    } catch (error) {
      console.error(error);
    }
  };
  

  const checkLoginStatus = async () => {
    try {
      const response = await api.get('/api/users/checkLoginStatus');
      console.log(response.data);
  
      // Store user data in local storage
      localStorage.setItem('user', JSON.stringify(response.data));
  
      setUser(response.data); // Set user state to the logged-in user
    } catch (error) {
      setUser(null); // Set user state back to null
    }
  };
  
  const handleLogout = async () => {
    try {
      await api.post('/api/users/logout'); // Log out on the server-side
      localStorage.removeItem('user');
      setUser(null); // Set user state to null
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        // Retrieve user data from local storage
        const userData = localStorage.getItem('user');
        if (userData) {
          const user = JSON.parse(userData);
          setUser(user); // Set user state to the logged-in user
        } else {
          setUser(null); // Set user state back to null
        }
      } catch (error) {
        setUser(null); // Set user state back to null
      }
    };
  
    checkLoginStatus();
  }, []);
  

  return (

    <UserContext.Provider value={{ user, setUser,cart, cartUser ,addToCart, removeFromCart, handleLogin, addToCartUser, handleLogout, removeFromCartUser }}>

    <Router>
      <div className="App">
        <header>
        <nav>
          <ul>
          {user === null ? (
  <li>
    <Link to="/login">Sign In</Link>
  </li>
) : (
  <li>
    <Link to="/logout">Logout</Link>
  </li>
  
)}
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            {user !== null ? (
                  <li>
                    <Link to="/cart-user">Cart User ({cartUser.length})</Link>
                  </li>
                ) : (
            <li>
              <Link to="/cart">Cart ({cart.length})</Link>
            </li>
            )}
          </ul>
        </nav>
    
          <h1 className="title">E-SHOP</h1>
          <div className="items"></div>
        </header>
    
        <main>
          <Routes> 
            <Route exact path="/" element={<Home products={products} />} />
            <Route path="/login" element={<Login handleLogin={handleLogin} />} />
            <Route path="/logout" element={<Logout handleLogout={handleLogout} />} />
            <Route path="/products" element={<Products products={products} addToCart={addToCart} addToCartUser={addToCartUser}/>} />
            <Route path="/cart" element={<Cart cart={cart} user={user} products={products} removeFromCart={removeFromCart} />} />
            <Route path="/cart-user"  element={<CartUser cartuser={cartUser} removeFromCart={removeFromCartUser}  />   }/>

            <Route path="/dashboard" element={<Dashboard user={user} />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
