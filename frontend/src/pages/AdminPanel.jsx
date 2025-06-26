

// import React, { useEffect, useState } from 'react';
// import Sidebar from '../components/Sidebar';
// import {
//   getAllUsers,
//   getSystemAlerts,
// } from '../api/api';
// import { Users, AlertCircle } from 'lucide-react';

// const AdminPanel = () => {
//   const [users, setUsers] = useState([]);
//   const [alerts, setAlerts] = useState([]);
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     fetchUsers();
//     fetchAlerts();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const res = await getAllUsers(token);
//       setUsers(res.data.users);
//     } catch (err) {
//       console.error('Error fetching users', err);
//     }
//   };

//   const fetchAlerts = async () => {
//     try {
//       const res = await getSystemAlerts(token);
//       setAlerts(res.data.alerts);
//     } catch (err) {
//       console.error('Error fetching system alerts', err);
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-[#e0f2fe] to-[#ede9fe] text-gray-800">
//       <Sidebar />
//       <div className="ml-64 p-6 w-full space-y-10">
//         <h1 className="text-4xl font-bold text-center text-purple-700 mb-6">🛠️ Admin Control Panel</h1>

//         {/* User Management */}
//         <section className="bg-white p-6 rounded-2xl shadow-xl">
//           <div className="flex items-center mb-4 gap-2 text-indigo-700">
//             <Users className="w-6 h-6" />
//             <h2 className="text-2xl font-semibold">User Management</h2>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="min-w-full text-sm text-left border rounded-md">
//               <thead className="bg-indigo-200 text-indigo-900">
//                 <tr>
//                   <th className="px-6 py-3">Name</th>
//                   <th className="px-6 py-3">Email</th>
//                   <th className="px-6 py-3">Status</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white">
//                 {users.map((u) => (
//                   <tr key={u._id} className="border-b hover:bg-indigo-50 transition">
//                     <td className="px-6 py-4">{u.name}</td>
//                     <td className="px-6 py-4">{u.email}</td>
//                     <td className="px-6 py-4">
//                       <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${u.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
//                         {u.active ? 'Active' : 'Inactive'}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </section>

//         {/* System Alerts */}
//         <section className="bg-white p-6 rounded-2xl shadow-xl">
//           <div className="flex items-center mb-4 gap-2 text-red-700">
//             <AlertCircle className="w-6 h-6" />
//             <h2 className="text-2xl font-semibold">System Alerts</h2>
//           </div>
//           {alerts.length ? (
//             <ul className="space-y-4">
//               {alerts.map((alert, index) => (
//                 <li
//                   key={index}
//                   className={`border-l-4 p-4 rounded shadow-md ${
//                     alert.type === 'error'
//                       ? 'border-red-500 bg-red-50'
//                       : 'border-yellow-500 bg-yellow-50'
//                   }`}
//                 >
//                   <p><strong>Type:</strong> {alert.type}</p>
//                   <p><strong>Message:</strong> {alert.message}</p>
//                   <p><strong>Time:</strong> {new Date(alert.timestamp).toLocaleString()}</p>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-gray-600">No system alerts found.</p>
//           )}
//         </section>
//       </div>
//     </div>
//   );
// };

// export default AdminPanel;



import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { getAllUsers, getSystemAlerts } from '../api/api';
import { Users, AlertCircle } from 'lucide-react';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchUsers();
    fetchAlerts();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await getAllUsers(token);
      setUsers(res.data.users);
    } catch (err) {
      console.error('Error fetching users', err);
    }
  };

  const fetchAlerts = async () => {
    try {
      const res = await getSystemAlerts(token);
      setAlerts(res.data.alerts);
    } catch (err) {
      console.error('Error fetching system alerts', err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-[#e0f2fe] to-[#ede9fe] text-gray-800">
      <Sidebar />

      <div className="md:ml-64 w-full p-4 md:p-8 space-y-10">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-purple-700 mb-6">🛠️ Admin Control Panel</h1>

        {/* User Management */}
        <section className="bg-white p-5 md:p-6 rounded-2xl shadow-xl">
          <div className="flex items-center mb-4 gap-2 text-indigo-700">
            <Users className="w-6 h-6" />
            <h2 className="text-xl md:text-2xl font-semibold">User Management</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left border rounded-md">
              <thead className="bg-indigo-200 text-indigo-900">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {users.map((u) => (
                  <tr key={u._id} className="border-b hover:bg-indigo-50 transition">
                    <td className="px-4 py-3">{u.name}</td>
                    <td className="px-4 py-3">{u.email}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${u.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {u.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* System Alerts */}
        <section className="bg-white p-5 md:p-6 rounded-2xl shadow-xl">
          <div className="flex items-center mb-4 gap-2 text-red-700">
            <AlertCircle className="w-6 h-6" />
            <h2 className="text-xl md:text-2xl font-semibold">System Alerts</h2>
          </div>
          {alerts.length ? (
            <ul className="space-y-4">
              {alerts.map((alert, index) => (
                <li
                  key={index}
                  className={`border-l-4 p-4 rounded shadow-sm ${
                    alert.type === 'error'
                      ? 'border-red-500 bg-red-50'
                      : 'border-yellow-500 bg-yellow-50'
                  }`}
                >
                  <p className="text-sm"><strong>Type:</strong> {alert.type}</p>
                  <p className="text-sm"><strong>Message:</strong> {alert.message}</p>
                  <p className="text-sm"><strong>Time:</strong> {new Date(alert.timestamp).toLocaleString()}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 text-sm">No system alerts found.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default AdminPanel;
