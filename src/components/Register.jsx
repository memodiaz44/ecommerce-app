import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const api = axios.create({
    baseURL: 'http://3.19.219.106:5000'
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post('/api/users/signup', { name, email, password });
      // Handle successful registration
      setSuccess(true);
      setError('');
    } catch (error) {
      setError('Error registering account');
      setSuccess(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={name} onChange={(event) => setName(event.target.value)} />
      </label>

      <label>
        Email:
        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
      </label>
      <button type="submit">Register</button>
      {error && <p>{error}</p>}
      {success && (
        <p>
          Registration successful! Please <Link to="/login">log in</Link>.
        </p>
      )}
    </form>
  );
}

export default Register;
