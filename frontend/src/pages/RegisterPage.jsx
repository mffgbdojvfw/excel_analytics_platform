


import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../api/api';
import { useAuth } from '../context/AuthContext';
import { UserPlus, Mail, Lock } from 'lucide-react';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser({ name, email, password, role: 'user' });
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      navigate('/upload');
    } catch (err) {
      alert(err?.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md shadow-xl rounded-2xl p-8 border-t-4 border-blue-600"
      >
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6 flex items-center justify-center gap-2">
          <UserPlus size={28} /> Register
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1 flex items-center gap-1">
            <UserPlus size={16} /> Name
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1 flex items-center gap-1">
            <Mail size={16} /> Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-1 flex items-center gap-1">
            <Lock size={16} /> Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg flex justify-center items-center gap-2 transition"
        >
          <UserPlus size={18} /> Register
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/" className="text-blue-600 hover:underline font-medium">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
