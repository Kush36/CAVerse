// components/Signup.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // ← Added only this import for login link

// Make sure this matches your backend port
const API_URL = 'https://caverse.onrender.com';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [apiError, setApiError] = useState(''); // ← Added for backend-specific errors like duplicate

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
    setApiError(''); // ← Clear API error when user types
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    const emailRegex = /^\w+([-.]?\w+)*@\w+([-.]?\w+)*(\.\w{2,3})+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('🚀 Form submitted with data:', formData);
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      console.log('❌ Validation errors:', newErrors);
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({});
    setSuccessMessage('');
    setApiError(''); // ← Clear previous API error

    try {
      console.log('📡 Sending request to:', `${API_URL}/signup`);
      
      const response = await axios.post(`${API_URL}/api/auth/signup`, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('✅ Response received:', response.data);
      
      if (response.data.success) {
        // Store token in localStorage
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        
        setSuccessMessage('Account created successfully! 🎉');
        console.log('✅ User data:', response.data.data.user);
        console.log('✅ Token stored:', response.data.data.token);
        
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
        
        // Optional: Redirect after 2 seconds
        // setTimeout(() => {
        //   window.location.href = '/dashboard';
        // }, 2000);
      }
    } catch (error) {
      console.error('❌ Full error object:', error);
      console.error('❌ Error response:', error.response);
      
      if (error.response?.data?.errors) {
        // Handle validation errors from backend
        console.log('❌ Backend validation errors:', error.response.data.errors);
        const backendErrors = {};
        error.response.data.errors.forEach(err => {
          backendErrors[err.path || err.param || 'general'] = err.msg;
        });
        setErrors(backendErrors);
      } else if (error.response?.data?.message) {
        const message = error.response.data.message.toLowerCase();
        if (message.includes('already exists') || message.includes('duplicate') || error.response.status === 409) {
          // User already exists
          setApiError('User with this email already exists. Please login instead.');
        } else {
          setApiError(error.response.data.message);
        }
      } else if (error.code === 'ERR_NETWORK') {
        setApiError('Cannot connect to server. Make sure backend is running on port 5000.');
      } else {
        setApiError(error.message || 'Failed to create account. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-0">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-5 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Create Your Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {errors.general && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded">
              {errors.general}
            </div>
          )}

          {successMessage && (
            <div className="bg-green-500/10 border border-green-500 text-green-500 px-4 py-3 rounded">
              {successMessage}
            </div>
          )}

          {/* Added: API error with special handling for existing user */}
          {apiError && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-4 rounded text-center">
              {apiError}
              {apiError.toLowerCase().includes('already exists') && (
                <div className="mt-4">
                  <Link
                    to="/login"
                    className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition"
                  >
                    Login Now
                  </Link>
                </div>
              )}
            </div>
          )}

          <div>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full bg-zinc-900 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
            )}
          </div>

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

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full bg-zinc-900 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showConfirmPassword ? '🙈' : '👁️'}
            </button>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '⏳ Creating Account...' : 'Sign Up'}
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
        </form>

        {/* Debug Info - Remove in production */}
        {/* <div className="mt-4 p-3 bg-zinc-900 rounded text-xs text-gray-400">
          <p>Backend URL: {API_URL}</p>
          <p>Open browser console (F12) to see detailed logs</p>
        </div> */}

        {/* Always-visible Login Link */}
        <div className="mt-6 text-center text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-400 hover:text-purple-300 font-semibold">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
