// import React, { useState } from 'react';
// import { updateAdminCredentials } from '../api/api';
// import { useAuth } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';

// const AdminSettings = () => {
//   const [newEmail, setNewEmail] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('token');
//       await updateAdminCredentials(newEmail, newPassword, token);
//       setMessage('✅ Admin credentials updated!');
//       navigate("/dashboard")
//     } catch (err) {
//       console.error(err);
//       setMessage(err.response?.data?.message || 'Update failed');
//     }
//   };

//   return (
//     <div className="p-8">
//       <h2 className="text-2xl font-bold mb-4">🛡️ Update Admin Credentials</h2>
//       <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
//         <input
//           type="email"
//           placeholder="New Email"
//           value={newEmail}
//           onChange={(e) => setNewEmail(e.target.value)}
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="password"
//           placeholder="New Password"
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//           className="w-full p-2 border rounded"
//         />
//         <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
//           Update
//         </button>
//         {message && <p className="mt-2 text-green-600">{message}</p>}
//       </form>
//     </div>
//   );
// };

// export default AdminSettings;






import React, { useState } from 'react';
import { updateAdminCredentials } from '../api/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Settings, Mail, KeyRound, Save } from 'lucide-react';

const AdminSettings = () => {
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await updateAdminCredentials(newEmail, newPassword, token);
      setMessage('✅ Admin credentials updated!');
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || 'Update failed');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="ml-64 w-full flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-xl bg-white rounded-xl shadow-md p-8 border-t-4 border-blue-500">
          <h2 className="text-3xl font-bold mb-6 text-blue-700 flex items-center gap-2">
            <Settings className="w-6 h-6" /> Admin Settings
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                <Mail className="w-4 h-4" /> New Email
              </label>
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Enter new admin email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                <KeyRound className="w-4 h-4" /> New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg flex items-center gap-2 transition"
            >
              <Save className="w-5 h-5" /> Update Credentials
            </button>

            {message && (
              <p className="mt-2 text-green-600 font-medium">{message}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
