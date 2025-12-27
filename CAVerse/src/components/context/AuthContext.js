// context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

const API_URL = 'http://localhost:5000/api/auth';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    // Check if user is logged in on mount
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  // Signup function
  const signup = async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/signup`, userData);
      
      if (response.data.success) {
        const { user, token } = response.data.data;
        
        // Store in state
        setUser(user);
        setToken(token);
        
        // Store in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        return { success: true, user };
      }
    } catch (error) {
      console.error('Signup error:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Signup failed' 
      };
    }
  };

  // Login function
  const login = async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      
      if (response.data.success) {
        const { user, token } = response.data.data;
        
        // Store in state
        setUser(user);
        setToken(token);
        
        // Store in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        return { success: true, user };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      // Call logout endpoint if token exists
      if (token) {
        await axios.post(`${API_URL}/logout`, {}, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear state
      setUser(null);
      setToken(null);
      
      // Clear localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  };

  // Get user profile
  const getProfile = async () => {
    if (!token) return null;

    try {
      const response = await axios.get(`${API_URL}/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.data.success) {
        const userData = response.data.data.user;
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return userData;
      }
    } catch (error) {
      console.error('Get profile error:', error);
      if (error.response?.status === 401) {
        // Token expired, logout
        logout();
      }
      return null;
    }
  };

  const value = {
    user,
    token,
    loading,
    signup,
    login,
    logout,
    getProfile,
    isAuthenticated: !!token
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;