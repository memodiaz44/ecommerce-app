import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  const api = axios.create({
    baseURL: 'http://3.19.219.106:5000',
    withCredentials: true // Send cookies along with requests
  });

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await api.get('/api/users/checkLoginStatus');
        console.log(response.data);
        setUser(response.data); // Set user state to the logged-in user
      } catch (error) {
        setUser(null); // Set user state back to null
      }
    };

    checkLoginStatus();
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (product) => {
    const newCart = cart.filter((item) => item.id !== product.id);
    setCart(newCart);
  };

  const handleLogin = async (email, password) => {
    try {
      const response = await api.post('/api/users/login', { email, password });

      setUser(response.data); // Set user state to the logged-in user
      console.log('User logged in successfully:', response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      await api.post('/api/users/logout'); // Log out on the server-side
      setUser(null); // Set user state to null
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <UserContext.Provider value={{ user, cart, addToCart, removeFromCart, handleLogin, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

