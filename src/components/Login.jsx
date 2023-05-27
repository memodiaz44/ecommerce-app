import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import axios from 'axios';
import "../stylesheets/Login.css"

function Login({ handleLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useContext(UserContext);

  const api = axios.create({
    baseURL: 'http://3.19.219.106:5000'
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post('/api/users/login', { email, password });
      localStorage.setItem('user', JSON.stringify(response.data));
      handleLogin(response.data); // Pass response.data to handleLogin
      setUser(response.data); // Set the user state
      navigate('/dashboard');
    } catch (error) {
      setError('Invalid email or password');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
      </label>
      <button type="submit">Log in</button>
      {error && <p>{error}</p>}
      <p className='already-have-account'>Don't have an account? <Link to="/register">Sign up</Link></p>
    </form>
  );
}

export default Login;
