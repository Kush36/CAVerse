/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { 
  FaUser, FaEnvelope, FaChartLine, FaUsers, FaComments, 
  FaCog, FaSignOutAlt, FaBell, FaSearch, FaEye, FaTrash,
  FaCheckCircle, FaTimes, FaBars, FaHome, FaFileAlt
} from 'react-icons/fa';

function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [messages, setMessages] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 1234,
    totalMessages: 89,
    activeUsers: 456,
    revenue: 45678
  });

  // Load messages from storage on mount
  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const result = await window.storage.list('contact:', true);
      if (result && result.keys) {
        const loadedMessages = await Promise.all(
          result.keys.map(async (key) => {
            try {
              const data = await window.storage.get(key, true);
              return data ? JSON.parse(data.value) : null;
            } catch {
              return null;
            }
          })
        );
        setMessages(loadedMessages.filter(Boolean));
      }
    } catch (error) {
      console.log('Loading demo messages');
      // Demo messages if storage fails
      setMessages([
        { id: 1, name: 'John Doe', email: 'john@example.com', message: 'Great service!', date: '2024-12-27', status: 'unread' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', message: 'Need help with my account', date: '2024-12-26', status: 'read' },
        { id: 3, name: 'Bob Wilson', email: 'bob@example.com', message: 'Feature request for mobile app', date: '2024-12-25', status: 'unread' },
      ]);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Demo login - replace with real authentication
    if (username === 'admin' && password === 'admin123') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials! Try: admin / admin123');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  const deleteMessage = async (id) => {
    try {
      await window.storage.delete(`contact:${id}`, true);
      setMessages(messages.filter(msg => msg.id !== id));
    } catch {
      setMessages(messages.filter(msg => msg.id !== id));
    }
  };

  const markAsRead = async (id) => {
    const updatedMessages = messages.map(msg => 
      msg.id === id ? { ...msg, status: 'read' } : msg
    );
    setMessages(updatedMessages);
    
    try {
      const msg = messages.find(m => m.id === id);
      if (msg) {
        await window.storage.set(`contact:${id}`, JSON.stringify({ ...msg, status: 'read' }), true);
      }
    } catch (error) {
      console.log('Could not update message status');
    }
  };

  // Login Screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
        
        <div className="relative z-10 bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/20 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <FaUser className="text-white text-3xl" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">CaVerse Admin</h1>
            <p className="text-gray-300">Sign in to access the dashboard</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-gray-200 mb-2 text-sm font-medium">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                placeholder="Enter username"
              />
            </div>

            <div>
              <label className="block text-gray-200 mb-2 text-sm font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin(e)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                placeholder="Enter password"
              />
            </div>

            <button
              onClick={handleLogin}
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all"
            >
              Sign In
            </button>

            <p className="text-center text-gray-400 text-sm">
              Demo: admin / admin123
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard
  const bgClass = darkMode ? 'bg-gray-900' : 'bg-gray-50';
  const textClass = darkMode ? 'text-white' : 'text-gray-900';
  const cardBg = darkMode ? 'bg-gray-800' : 'bg-white';
  const borderColor = darkMode ? 'border-gray-700' : 'border-gray-200';

  return (
    <div className={`min-h-screen ${bgClass} ${textClass} flex`}>
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} ${cardBg} border-r ${borderColor} transition-all duration-300 flex flex-col`}>
        <div className="p-6 border-b border-gray-700 flex items-center justify-between">
          {sidebarOpen && <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">CaVerse Admin</h2>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-400 hover:text-white">
            <FaBars />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {[
            { id: 'dashboard', icon: FaHome, label: 'Dashboard' },
            { id: 'messages', icon: FaEnvelope, label: 'Messages' },
            { id: 'users', icon: FaUsers, label: 'Users' },
            { id: 'analytics', icon: FaChartLine, label: 'Analytics' },
            { id: 'settings', icon: FaCog, label: 'Settings' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === item.id 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                  : 'text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <item.icon className="text-xl" />
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-all"
          >
            <FaSignOutAlt />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className={`${cardBg} border-b ${borderColor} p-6 flex items-center justify-between`}>
          <div>
            <h1 className="text-2xl font-bold">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
            <p className="text-gray-400 text-sm">Welcome back, Admin!</p>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
            <button className="relative text-gray-400 hover:text-white">
              <FaBell className="text-xl" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">3</span>
            </button>
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <FaUser />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Total Users', value: stats.totalUsers, icon: FaUsers, color: 'from-blue-500 to-cyan-500' },
                  { label: 'Messages', value: stats.totalMessages, icon: FaEnvelope, color: 'from-purple-500 to-pink-500' },
                  { label: 'Active Users', value: stats.activeUsers, icon: FaChartLine, color: 'from-green-500 to-emerald-500' },
                  { label: 'Revenue', value: `₹${stats.revenue}`, icon: FaFileAlt, color: 'from-orange-500 to-red-500' },
                ].map((stat, i) => (
                  <div key={i} className={`${cardBg} border ${borderColor} p-6 rounded-xl hover:shadow-lg transition-all`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                        <stat.icon className="text-white text-xl" />
                      </div>
                    </div>
                    <h3 className="text-gray-400 text-sm mb-1">{stat.label}</h3>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Recent Activity */}
              <div className={`${cardBg} border ${borderColor} rounded-xl p-6`}>
                <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {messages.slice(0, 5).map((msg, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-gray-700/30 rounded-lg">
                      <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                        {msg.name[0]}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{msg.name}</p>
                        <p className="text-sm text-gray-400">{msg.message.substring(0, 50)}...</p>
                      </div>
                      <span className="text-xs text-gray-500">{msg.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <div className={`${cardBg} border ${borderColor} rounded-xl overflow-hidden`}>
              <div className="p-6 border-b border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">Contact Messages</h3>
                  <div className="flex items-center gap-2 bg-gray-700/30 px-4 py-2 rounded-lg">
                    <FaSearch className="text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Search messages..." 
                      className="bg-transparent outline-none text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-700/30">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium">Name</th>
                      <th className="px-6 py-4 text-left text-sm font-medium">Email</th>
                      <th className="px-6 py-4 text-left text-sm font-medium">Message</th>
                      <th className="px-6 py-4 text-left text-sm font-medium">Date</th>
                      <th className="px-6 py-4 text-left text-sm font-medium">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {messages.map((msg) => (
                      <tr key={msg.id} className="border-t border-gray-700 hover:bg-gray-700/20">
                        <td className="px-6 py-4">{msg.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-400">{msg.email}</td>
                        <td className="px-6 py-4 text-sm max-w-xs truncate">{msg.message}</td>
                        <td className="px-6 py-4 text-sm text-gray-400">{msg.date}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            msg.status === 'unread' 
                              ? 'bg-yellow-500/20 text-yellow-400' 
                              : 'bg-green-500/20 text-green-400'
                          }`}>
                            {msg.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button 
                              onClick={() => markAsRead(msg.id)}
                              className="p-2 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30"
                            >
                              <FaEye />
                            </button>
                            <button 
                              onClick={() => deleteMessage(msg.id)}
                              className="p-2 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className={`${cardBg} border ${borderColor} rounded-xl p-6`}>
              <h3 className="text-xl font-bold mb-4">User Management</h3>
              <p className="text-gray-400">User management features coming soon...</p>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className={`${cardBg} border ${borderColor} rounded-xl p-6`}>
              <h3 className="text-xl font-bold mb-4">Analytics Dashboard</h3>
              <p className="text-gray-400">Analytics features coming soon...</p>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className={`${cardBg} border ${borderColor} rounded-xl p-6`}>
              <h3 className="text-xl font-bold mb-4">System Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                  <div>
                    <p className="font-medium">Dark Mode</p>
                    <p className="text-sm text-gray-400">Toggle dark/light theme</p>
                  </div>
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`w-14 h-8 rounded-full transition-all ${darkMode ? 'bg-purple-500' : 'bg-gray-600'}`}
                  >
                    <div className={`w-6 h-6 bg-white rounded-full transition-all ${darkMode ? 'ml-7' : 'ml-1'}`}></div>
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default AdminPanel;