


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../api/api';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import { Lock, Mail, KeyRound, Menu } from 'lucide-react';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await adminLogin(email, password);
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      navigate('/dashboard');
    } catch (err) {
      alert(err?.response?.data?.message || 'Admin login failed');
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#e0f2fe] to-[#ede9fe] text-gray-800 w-full relative">
      {/* Sidebar (Desktop) */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Drawer */}
      {showSidebar && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            onClick={() => setShowSidebar(false)}
          ></div>
          <div className="fixed top-0 left-0 h-full w-64 bg-[#0f172a] text-white shadow-lg z-50 transition-transform duration-300">
            <Sidebar />
          </div>
        </>
      )}

      {/* Main Content */}
      <div className="flex flex-col flex-1 items-center justify-center w-full px-6 py-8 relative">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setShowSidebar(true)}
          className="absolute top-4 left-4 md:hidden bg-white text-gray-700 shadow rounded-full p-2 z-20"
        >
          <Menu size={22} />
        </button>

        {/* Login Card */}
        <form
          onSubmit={handleLogin}
          className="w-full max-w-2xl bg-white p-10 rounded-2xl shadow-xl border-t-4 border-blue-600 mt-16 md:mt-0"
        >
          <h2 className="text-4xl font-bold mb-8 text-blue-600 text-center flex items-center justify-center gap-3">
            <Lock className="w-7 h-7" /> Admin Login
          </h2>

          <div className="mb-5">
            <label className="block text-sm font-semibold mb-2 text-gray-700 flex items-center gap-2">
              <Mail className="w-4 h-4" /> Email
            </label>
            <input
              type="email"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="mb-8">
            <label className="block text-sm font-semibold mb-2 text-gray-700 flex items-center gap-2">
              <KeyRound className="w-4 h-4" /> Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold text-lg transition duration-200"
          >
            Login as Admin
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
