import React, { useContext } from 'react';
import { UserContext } from '../App';

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const isLoggedIn = user !== null;
  const userName = user && user.name; // Check if user and user.name are defined

  // Render different content based on the user's login status
  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h2>Welcome, {userName ? userName : 'User'}!</h2>
          {/* Render logged-in user content */}
        </div>
      ) : (
        <div>
          <h2>Please log in to access the dashboard.</h2>
          {/* Render login form or redirect to login page */}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
