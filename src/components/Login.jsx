import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  
  const api = axios.create({
    baseURL: 'http://localhost:5000'
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const response = await api.post('/api/login', { email, password });

      // Handle successful login, e.g. set session data in cookie or localStorage
    } catch (error) {
      setError('Invalid email or password');
    }
  };

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
    </form>
  );
}

export default Login;