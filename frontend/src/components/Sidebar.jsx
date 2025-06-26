



// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import {
//   Home,
//   UploadCloud,
//   Settings,
//   User,
//   FileText,
//   Shield,
//   LogOut,
//   Lock
// } from 'lucide-react';

// const Sidebar = () => {
//   const { logout, user } = useAuth();

//   const linkStyle = ({ isActive }) =>
//     `flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-700 transition duration-200 ${
//       isActive ? 'bg-gray-700 text-blue-400 font-semibold' : 'text-white'
//     }`;

//   return (
//     <div className="w-64 bg-gray-900 text-white h-screen p-4 fixed flex flex-col justify-between">
//       <div>
//         <h2 className="text-2xl font-bold mb-8 text-center text-blue-400">📊 Excel Platform</h2>
//         <nav className="flex flex-col gap-3">
//           <NavLink to="/dashboard" className={linkStyle}>
//             <Home size={18} /> Dashboard
//           </NavLink>

//           {user?.role === 'admin' && (
//             <NavLink to="/admin" className={linkStyle}>
//               <Shield size={18} /> Admin Panel
//             </NavLink>
//           )}

//           <NavLink to="/upload" className={linkStyle}>
//             <UploadCloud size={18} /> Excel Upload
//           </NavLink>

//           <NavLink to="/history" className={linkStyle}>
//             <FileText size={18} /> File History
//           </NavLink>

//           {user?.role === 'admin' && (
//   <>
//     <NavLink to="/admin/settings" className={linkStyle}>
//       <Settings size={18} /> Admin Settings
//     </NavLink>
//   </>
// )}

//           <NavLink to="/profile" className={linkStyle}>
//             <User size={18} /> User Profile
//           </NavLink>

//           {user?.role !== 'admin' && (
//             <NavLink to="/admin-login" className={linkStyle}>
//               <Lock size={18} /> Admin Login
//             </NavLink>
//           )}
//         </nav>
//       </div>

//       <button
//         onClick={logout}
//         className="mt-6 flex items-center gap-2 px-4 py-2 text-red-400 hover:text-red-300 transition duration-200"
//       >
//         <LogOut size={18} /> Logout
//       </button>
//     </div>
//   );
// };

// export default Sidebar;



import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Home,
  UploadCloud,
  Settings,
  User,
  FileText,
  Shield,
  LogOut,
  Lock,
  Menu
} from 'lucide-react';

const Sidebar = () => {
  const { logout, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const linkStyle = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition duration-200 ${
      isActive
        ? 'bg-gray-700 text-blue-400 font-semibold'
        : 'text-white hover:bg-gray-700 hover:text-blue-300'
    }`;

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-md shadow-md"
      >
        <Menu size={20} />
      </button>

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed top-0 left-0 z-40 h-full w-64 bg-gray-900 text-white p-4 flex flex-col justify-between transform transition-transform duration-300 lg:translate-x-0`}
      >
        <div>
          <h2 className="text-2xl font-bold mb-8 text-center text-blue-400 flex items-center justify-center gap-2">
            📊 Excel <span className="text-white">Platform</span>
          </h2>

          <nav className="flex flex-col gap-3">
           

            {user?.role === 'admin' && (
               <NavLink to="/dashboard" className={linkStyle}>
              <Home size={18} /> Dashboard
            </NavLink>
            )}

            {user?.role === 'admin' && (
              <NavLink to="/admin" end className={linkStyle}>
  <Shield size={18} /> Admin Panel
</NavLink>
            )}

            <NavLink to="/upload" className={linkStyle}>
              <UploadCloud size={18} /> Excel Upload
            </NavLink>

            <NavLink to="/history" className={linkStyle}>
              <FileText size={18} /> File History
            </NavLink>

            {user?.role === 'admin' && (
              <NavLink to="/admin/settings" className={linkStyle}>
                <Settings size={18} /> Admin Settings
              </NavLink>
            )}

            <NavLink to="/profile" className={linkStyle}>
              <User size={18} /> User Profile
            </NavLink>

            {user?.role !== 'admin' && (
              <NavLink to="/admin-login" className={linkStyle}>
                <Lock size={18} /> Admin Login
              </NavLink>
            )}
          </nav>
        </div>

        <button
          onClick={logout}
          className="mt-6 flex items-center gap-2 px-4 py-2 text-red-400 hover:text-red-300 transition duration-200 text-sm"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </>
  );
};

export default Sidebar;
