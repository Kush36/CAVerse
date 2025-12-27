// src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://caverse-front.onrender.com/';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal states
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  // Edit Profile form
  const [editForm, setEditForm] = useState({ fullName: '', email: '' });
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState('');

  // Change Password form
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [passLoading, setPassLoading] = useState(false);
  const [passError, setPassError] = useState('');
  const [passSuccess, setPassSuccess] = useState('');

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      setEditForm({ fullName: parsed.fullName || '', email: parsed.email || '' });
      setLoading(false);
    }

    if (token) {
      try {
        const response = await axios.get(`${API_URL}/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          const freshUser = response.data.data.user;
          setUser(freshUser);
          localStorage.setItem('user', JSON.stringify(freshUser));
          setEditForm({ fullName: freshUser.fullName || '', email: freshUser.email || '' });
        }
      } catch (err) {
        console.error('Profile fetch error:', err);
        if (err.response?.status === 401) {
          handleLogout();
        } else {
          setError('Failed to load profile');
        }
      } finally {
        setLoading(false);
      }
    } else {
      window.location.href = '/login';
    }
  };

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.post(`${API_URL}/logout`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
  };

  // Edit Profile Submit
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditError('');
    setEditLoading(true);

    if (!editForm.fullName.trim() || !editForm.email.trim()) {
      setEditError('All fields are required');
      setEditLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(`${API_URL}/update-profile`, editForm, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        const updated = response.data.data.user;
        setUser(updated);
        localStorage.setItem('user', JSON.stringify(updated));
        setEditForm({ fullName: updated.fullName || '', email: updated.email || '' });
        setShowEditProfile(false);
        alert('Profile updated successfully!');
      }
    } catch (err) {
      setEditError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setEditLoading(false);
    }
  };

  // Change Password Submit
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPassError('');
    setPassSuccess('');

    const { oldPassword, newPassword, confirmNewPassword } = passwordForm;

    if (!oldPassword || !newPassword || !confirmNewPassword) {
      setPassError('All fields are required');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setPassError('New passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      setPassError('New password must be at least 8 characters');
      return;
    }

    setPassLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/change-password`, {
        oldPassword,
        newPassword,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setPassSuccess('Password changed successfully!');
        setPasswordForm({ oldPassword: '', newPassword: '', confirmNewPassword: '' });
        setTimeout(() => setShowChangePassword(false), 2000);
      }
    } catch (err) {
      setPassError(err.response?.data?.message || 'Failed to change password');
    } finally {
      setPassLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
          <p className="text-white mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.href = '/login'}
            className="bg-purple-500 text-white px-6 py-2 rounded-lg"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-zinc-900 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition flex items-center gap-2"
            >
              <span>🚪</span> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6">
          {/* Welcome Card */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 text-white">
            <h2 className="text-3xl font-bold mb-2">
              Welcome back, {user?.fullName?.split(' ')[0] || 'User'}! 👋
            </h2>
            <p className="text-purple-100">
              You're successfully logged in to your account
            </p>
          </div>

          {/* Profile Information */}
          <div className="bg-zinc-900 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <span>👤</span> Profile Information
              </h3>
              <button
                onClick={() => setShowEditProfile(true)}
                className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-sm transition"
              >
                Edit Profile
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center py-3 border-b border-zinc-800">
                <span className="text-gray-400">Full Name</span>
                <span className="text-white font-medium">{user?.fullName || 'N/A'}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-zinc-800">
                <span className="text-gray-400">Email</span>
                <span className="text-white font-medium">{user?.email || 'N/A'}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-zinc-800">
                <span className="text-gray-400">Account Created</span>
                <span className="text-white font-medium">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-400">Last Login</span>
                <span className="text-white font-medium">
                  {user?.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'N/A'}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-zinc-900 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span>⚡</span> Quick Actions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => setShowEditProfile(true)}
                className="bg-zinc-800 hover:bg-zinc-700 text-white p-4 rounded-lg transition text-left"
              >
                <div className="text-2xl mb-2">✏️</div>
                <div className="font-semibold">Edit Profile</div>
                <div className="text-sm text-gray-400">Update your information</div>
              </button>
              <button
                onClick={() => setShowChangePassword(true)}
                className="bg-zinc-800 hover:bg-zinc-700 text-white p-4 rounded-lg transition text-left"
              >
                <div className="text-2xl mb-2">🔑</div>
                <div className="font-semibold">Change Password</div>
                <div className="text-sm text-gray-400">Update your password</div>
              </button>
              <button className="bg-zinc-800 hover:bg-zinc-700 text-white p-4 rounded-lg transition text-left">
                <div className="text-2xl mb-2">⚙️</div>
                <div className="font-semibold">Settings</div>
                <div className="text-sm text-gray-400">Manage preferences</div>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Edit Profile Modal */}
      {showEditProfile && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-zinc-900 rounded-xl p-8 w-full max-w-md border border-zinc-700">
            <h2 className="text-2xl font-bold mb-6 text-center">Edit Profile</h2>

            {editError && <p className="text-red-400 mb-4 text-center">{editError}</p>}

            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  value={editForm.fullName}
                  onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowEditProfile(false)}
                  className="flex-1 py-3 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={editLoading}
                  className="flex-1 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
                >
                  {editLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showChangePassword && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-zinc-900 rounded-xl p-8 w-full max-w-md border border-zinc-700">
            <h2 className="text-2xl font-bold mb-6 text-center">Change Password</h2>

            {passError && <p className="text-red-400 mb-4 text-center">{passError}</p>}
            {passSuccess && <p className="text-green-400 mb-4 text-center">{passSuccess}</p>}

            <form onSubmit={handlePasswordSubmit}>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Current Password</label>
                <input
                  type="password"
                  value={passwordForm.oldPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-300 mb-2">New Password</label>
                <input
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-300 mb-2">Confirm New Password</label>
                <input
                  type="password"
                  value={passwordForm.confirmNewPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmNewPassword: e.target.value })}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowChangePassword(false)}
                  className="flex-1 py-3 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={passLoading}
                  className="flex-1 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
                >
                  {passLoading ? 'Changing...' : 'Change Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;