

// import React, { useState } from 'react';
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
//   Lock,
//   Menu
// } from 'lucide-react';

// const Sidebar = () => {
//   const { logout, user } = useAuth();
//   const [isOpen, setIsOpen] = useState(false);

//   const linkStyle = ({ isActive }) =>
//     `flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition duration-200 ${
//       isActive
//         ? 'bg-gray-700 text-blue-400 font-semibold'
//         : 'text-white hover:bg-gray-700 hover:text-blue-300'
//     }`;

//   return (
//     <>
//       {/* Mobile Toggle Button */}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="lg:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-md shadow-md"
//       >
//         <Menu size={20} />
//       </button>

//       {/* Sidebar */}
//       <div
//         className={`${
//           isOpen ? 'translate-x-0' : '-translate-x-full'
//         } fixed top-0 left-0 z-40 h-full w-64 bg-gray-900 text-white p-4 flex flex-col justify-between transform transition-transform duration-300 lg:translate-x-0`}
//       >
//         <div>
//           <h2 className="text-2xl font-bold mb-8 text-center text-blue-400 flex items-center justify-center gap-2">
//             📊 Excel <span className="text-white">Platform</span>
//           </h2>

//           <nav className="flex flex-col gap-3">
           

//             {user?.role === 'admin' && (
//                <NavLink to="/dashboard" className={linkStyle}>
//               <Home size={18} /> Dashboard
//             </NavLink>
//             )}

//             {user?.role === 'admin' && (
//               <NavLink to="/admin" end className={linkStyle}>
//   <Shield size={18} /> Admin Panel
// </NavLink>
//             )}

//             <NavLink to="/upload" className={linkStyle}>
//               <UploadCloud size={18} /> Excel Upload
//             </NavLink>

//             <NavLink to="/history" className={linkStyle}>
//               <FileText size={18} /> File History
//             </NavLink>

//             {user?.role === 'admin' && (
//               <NavLink to="/admin/settings" className={linkStyle}>
//                 <Settings size={18} /> Admin Settings
//               </NavLink>
//             )}

//             <NavLink to="/profile" className={linkStyle}>
//               <User size={18} /> User Profile
//             </NavLink>

//             {user?.role !== 'admin' && (
//               <NavLink to="/admin-login" className={linkStyle}>
//                 <Lock size={18} /> Admin Login
//               </NavLink>
//             )}
//           </nav>
//         </div>

//         <button
//           onClick={logout}
//           className="mt-6 flex items-center gap-2 px-4 py-2 text-red-400 hover:text-red-300 transition duration-200 text-sm"
//         >
//           <LogOut size={18} /> Logout
//         </button>
//       </div>
//     </>
//   );
// };

// export default Sidebar;



import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
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

const navLinks = [
  { to: '/dashboard', label: 'Dashboard', icon: Home, roles: ['admin'] },
  { to: '/adminpanel', label: 'Admin Panel', icon: Shield, roles: ['admin'] },
  { to: '/upload', label: 'Excel Upload', icon: UploadCloud, roles: ['admin', 'user'] },
  { to: '/history', label: 'File History', icon: FileText, roles: ['admin', 'user'] },
  { to: '/admin/settings', label: 'Admin Settings', icon: Settings, roles: ['admin'] },
  { to: '/profile', label: 'User Profile', icon: User, roles: ['admin', 'user'] },
  { to: '/admin-login', label: 'Admin Login', icon: Lock, roles: ['user'] },
];

const Sidebar = () => {
  const { logout, user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setCollapsed(!collapsed);

  const linkStyle = (isActive) =>
    `relative group flex items-center gap-3 px-4 py-2 rounded-md text-sm font-semibold transition-all duration-300
    ${
      isActive
        ? 'bg-gradient-to-r from-sky-500 to-purple-600 text-white shadow-md shadow-purple-500/50 scale-[1.03]'
        : 'text-slate-300 hover:bg-slate-800/80 hover:text-sky-300 hover:shadow hover:shadow-sky-500/20'
    }`;

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 bg-black/70 backdrop-blur-sm text-white p-2 rounded-md shadow-md"
      >
        <Menu size={22} />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full ${collapsed ? 'w-20' : 'w-64'} bg-[#0f0f0f] border-r border-gray-800 text-white px-3 py-6 flex flex-col justify-between transition-all duration-300 lg:block shadow-[0_0_30px_rgba(0,0,0,0.8)]`}
      >
        <div>
          <h2
            className={`text-center font-extrabold mb-10 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-transparent bg-clip-text animate-glow transition-all duration-300 ${collapsed ? 'text-xl' : 'text-3xl'}`}
          >
            {collapsed ? '📊' : '📊 Excel Platform'}
          </h2>

          <nav className="flex flex-col gap-3">
            {navLinks.map(
              ({ to, label, icon: Icon, roles }) =>
                roles.includes(user?.role) && (
                  <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) => linkStyle(isActive)}
                  >
                    <div className="relative flex items-center gap-3">
                      <Icon size={20} className="text-cyan-400" />
                      {!collapsed && <span>{label}</span>}
                      {collapsed && (
                        <span className="absolute left-16 bg-black px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-all duration-300">
                          {label}
                        </span>
                      )}
                    </div>
                    {location.pathname === to && (
                      <span className="absolute left-0 top-0 h-full w-1 bg-sky-400 rounded-r-md animate-pulse" />
                    )}
                  </NavLink>
                )
            )}
          </nav>
        </div>

        <button
          onClick={logout}
          className="mt-6 flex items-center gap-2 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-900/30 rounded-lg transition duration-300 text-sm"
        >
          <LogOut size={20} /> {!collapsed && 'Logout'}
        </button>

        {/* Toggle Collapse (Desktop) */}
        <button
          onClick={toggleSidebar}
          className="hidden lg:block mt-4 px-3 py-2 bg-slate-800/40 text-white rounded-md text-xs hover:bg-slate-700 transition"
        >
          {collapsed ? '▶ Expand' : '◀ Collapse'}
        </button>
      </aside>
    </>
  );
};

export default Sidebar;

