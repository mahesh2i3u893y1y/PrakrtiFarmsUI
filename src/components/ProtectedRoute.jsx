import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { APP_CONTANTS } from './constants';

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check with backend if user is logged in
    fetch(`${APP_CONTANTS.API_FOR_WEBSITE}/me`, { // example endpoint
      method: 'GET',
      credentials: 'include', // send httpOnly cookie automatically
    })
      .then(res => {
        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch(() => setIsAuthenticated(false))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
