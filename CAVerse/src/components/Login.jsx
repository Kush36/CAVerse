// components/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'https://caverse.onrender.com';

const Login = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('🔐 Login attempt with:', { email: formData.email });
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      console.log('❌ Validation errors:', newErrors);
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      console.log('📡 Sending login request to:', `${API_URL}/login`);
      
      const response = await axios.post(`${API_URL}/login`, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('✅ Login response:', response.data);
      
      if (response.data.success) {
        // Store token and user data
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        
        console.log('✅ Login successful! Token stored.');
        console.log('✅ User:', response.data.data.user);
        
        // Call success callback or redirect
        if (onLoginSuccess) {
          onLoginSuccess(response.data.data.user);
        } else {
          window.location.href = '/dashboard';
        }
      }
    } catch (error) {
      console.error('❌ Login error:', error);
      console.error('❌ Error response:', error.response);
      
      if (error.response?.data?.message) {
        setErrors({ 
          general: error.response.data.message
        });
      } else if (error.code === 'ERR_NETWORK') {
        setErrors({ 
          general: 'Cannot connect to server. Make sure backend is running on port 5000.' 
        });
      } else {
        setErrors({ 
          general: 'Login failed. Please try again.' 
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-5xl font-bold text-center mb-2 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Welcome Back
        </h1>
        <p className="text-center text-gray-400 mb-8">
          Sign in to continue to your account
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {errors.general && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded">
              {errors.general}
            </div>
          )}

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-zinc-900 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-zinc-900 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-gray-400 cursor-pointer">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <a href="#" className="text-purple-400 hover:text-purple-300">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '⏳ Signing In...' : 'Sign In'}
          </button>

          <div className="text-center text-gray-400 text-sm">
            {/* Or continue with */}
          </div>

          {/* <div className="grid grid-cols-3 gap-4">
            <button
              type="button"
              className="bg-zinc-900 hover:bg-zinc-800 text-white p-3 rounded-lg transition"
              onClick={() => alert('Google OAuth not implemented yet')}
            >
              G
            </button>
            <button
              type="button"
              className="bg-zinc-900 hover:bg-zinc-800 text-white p-3 rounded-lg transition"
              onClick={() => alert('Facebook OAuth not implemented yet')}
            >
              f
            </button>
            <button
              type="button"
              className="bg-zinc-900 hover:bg-zinc-800 text-white p-3 rounded-lg transition"
              onClick={() => alert('Apple OAuth not implemented yet')}
            >
              
            </button>
          </div> */}

          <div className="text-center text-gray-400 text-sm mt-6">
            Don't have an account?{' '}
            <a href="/signup" className="text-purple-400 hover:text-purple-300 font-semibold">
              Sign Up
            </a>
          </div>
        </form>

        {/* Debug Info - Remove in production */}
        {/* <div className="mt-4 p-3 bg-zinc-900 rounded text-xs text-gray-400">
          <p>Backend URL: {API_URL}</p>
          <p>Open browser console (F12) to see detailed logs</p>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
