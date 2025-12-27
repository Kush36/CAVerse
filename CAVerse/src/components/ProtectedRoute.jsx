// components/ProtectedRoute.jsx
import React, { useEffect, useState } from 'react';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.log('❌ No token found, redirecting to login');
      setIsAuthenticated(false);
      window.location.href = '/login';
      return;
    }

    console.log('✅ Token found, user is authenticated');
    setIsAuthenticated(true);
  };

  // Show loading while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
          <p className="text-white mt-4">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, don't render anything (redirect happens in useEffect)
  if (!isAuthenticated) {
    return null;
  }

  // If authenticated, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;