
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import {
  getAllFilesAdmin,
  getFileHistory,
  deleteFileAdmin
} from '../api/api';

import {
  FileText,
  CalendarClock,
  RefreshCw,
  Download,
  Trash2,
  Search,
  Filter,
} from 'lucide-react';

const FileHistory = () => {
  const [history, setHistory] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));

        setIsAdmin(user?.role === 'admin');

        let response;
        if (user?.role === 'admin') {
          response = await getAllFilesAdmin(token);
        } else {
          response = await getFileHistory(token);
        }

        setHistory(response.data.files || []);
      } catch (err) {
        console.error('Failed to fetch history:', err);
      }
    };

    fetchHistory();
  }, []);

  const getFilteredHistory = () => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    return history
      .filter((item) => {
        const date = new Date(item.uploadedAt);
        if (filter === 'today') return date.toDateString() === today.toDateString();
        if (filter === 'yesterday') return date.toDateString() === yesterday.toDateString();
        return true;
      })
      .filter((item) => {
        const date = new Date(item.uploadedAt);
        const inRange =
          (!startDate || date >= new Date(startDate)) &&
          (!endDate || date <= new Date(endDate));

        const fileName = (item.originalName || item.filename || '').toLowerCase();
        return inRange && fileName.includes(searchTerm.toLowerCase());
      });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this file?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');
      await deleteFileAdmin(id, token);
      const updated = history.filter((item) => item._id !== id);
      setHistory(updated);
    } catch (error) {
      console.error("Failed to delete file:", error);
      alert("Error deleting file. Please try again.");
    }
  };

  const handleReload = (item) => {
    if (!item?.filename) {
      alert("This file doesn't contain data to reload.");
      return;
    }
    navigate('/upload', { state: { name: item.filename } });
  };

  const handleDownload = async (id, filename) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5678/api/uploads/download/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Download failed');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename || 'file.xlsx';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download file');
    }
  };

  const handleSelect = (fileId) => {
    setSelectedFiles((prev) =>
      prev.includes(fileId)
        ? prev.filter((id) => id !== fileId)
        : [...prev, fileId]
    );
  };

  const handleBulkDelete = async () => {
    const confirm = window.confirm("Delete selected files?");
    if (!confirm) return;

    try {
      const token = localStorage.getItem('token');
      for (let id of selectedFiles) {
        await deleteFileAdmin(id, token);
      }
      setHistory((prev) => prev.filter((item) => !selectedFiles.includes(item._id)));
      setSelectedFiles([]);
    } catch (err) {
      console.error("Bulk delete failed", err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Sidebar />
      <div className="md:ml-64 w-full p-4 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2">
          <FileText size={28} /> File Upload History
        </h1>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-4">
          {['all', 'today', 'yesterday'].map((f) => (
            <button
              key={f}
              className={`flex items-center gap-2 px-4 py-2 rounded ${
                filter === f ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-700'
              }`}
              onClick={() => setFilter(f)}
            >
              <Filter size={16} />
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Filter Header */}
        <h2 className="text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <Filter size={18} className="text-blue-600" /> Filter Files by Date or Name
        </h2>

        {/* Date Range Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <input
            type="date"
            className="border rounded px-4 py-2 w-full sm:w-auto"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            className="border rounded px-4 py-2 w-full sm:w-auto"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        {/* Search Input */}
        <h2 className="text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <Search size={18} className="text-blue-600" /> Search by File Name
        </h2>

        <div className="mb-4 relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by file name..."
            className="pl-10 border border-gray-300 rounded px-4 py-2 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Bulk Delete */}
        {selectedFiles.length > 0 && (
          <button
            onClick={handleBulkDelete}
            className="mb-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            <Trash2 size={16} className="inline-block mr-1" />
            Delete Selected ({selectedFiles.length})
          </button>
        )}

        {/* History List */}
        {getFilteredHistory().length > 0 ? (
          <ul className="space-y-3">
            {getFilteredHistory().map((item) => (
              <li
                key={item._id}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white p-4 rounded shadow"
              >
                <div className="flex items-start sm:items-center gap-3 mb-2 sm:mb-0">
                  <input
                    type="checkbox"
                    checked={selectedFiles.includes(item._id)}
                    onChange={() => handleSelect(item._id)}
                  />
                  <div>
                    <div className="font-semibold truncate max-w-[250px] sm:max-w-none flex items-center gap-1">
                      <FileText size={18} className="text-indigo-600" />{' '}
                      {item.originalName || item.filename}
                    </div>
                    <div className="text-sm text-gray-600 flex items-center gap-1">
                      <CalendarClock size={14} className="text-gray-500" />{' '}
                      {new Date(item.uploadedAt).toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => handleReload(item)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 flex items-center gap-1"
                  >
                    <RefreshCw size={16} /> Reload
                  </button>
                  <button
                    onClick={() => handleDownload(item._id, item.originalName || item.filename)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 flex items-center gap-1"
                  >
                    <Download size={16} /> Download
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 flex items-center gap-1"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No files match your filter or search.</p>
        )}
      </div>
    </div>
  );
};

export default FileHistory;
