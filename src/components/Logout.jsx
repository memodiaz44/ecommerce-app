import React, { useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

function Logout() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      await axios.post('http://3.19.219.106:5000/api/users/logout');

      localStorage.clear();
      setUser(null); // Clear the user state
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <button onClick={handleLogout}>Logout</button>
  );
}

export default Logout;
