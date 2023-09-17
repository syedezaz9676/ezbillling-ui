import React from 'react';

const LogoutButton = () => {
  const handleLogout = () => {
    // Clear the authentication token or relevant data from local storage
    localStorage.removeItem('user'); // Replace 'authToken' with your actual key

    // Redirect to the login page or perform any other logout actions
    // For example, you can use react-router-dom for redirection
    window.location.href = '/login'; // Redirect to the login page
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;