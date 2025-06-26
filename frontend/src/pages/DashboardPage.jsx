
// import React, { useEffect, useState } from 'react';
// import Sidebar from '../components/Sidebar';
// import {
//   getAllFilesAdmin,
//   getAllUsers,
//   getInsightUsageLogs,
//   getSystemAlerts,
// } from '../api/api';
// import { useAuth } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import {
//   FileBarChart,
//   Users,
//   Brain,
//   AlertTriangle,
//   Upload,
//   Settings,
//   History
// } from 'lucide-react';

// const Dashboard = () => {
//   const [fileCount, setFileCount] = useState(0);
//   const [userCount, setUserCount] = useState(0);
//   const [insightCount, setInsightCount] = useState(0);
//   const [alerts, setAlerts] = useState([]);
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('token');

//     const fetchFileCount = async () => {
//       try {
//         const response = await getAllFilesAdmin(token);
//         setFileCount(response.data.files.length || 0);
//       } catch (err) {
//         console.error('Error fetching files:', err);
//       }
//     };

//     const fetchUserCount = async () => {
//       try {
//         const response = await getAllUsers(token);
//         setUserCount(response.data.users.length || 0);
//       } catch (err) {
//         console.error('Error fetching users:', err);
//       }
//     };

//     const fetchInsightCount = async () => {
//       try {
//         const response = await getInsightUsageLogs(token);
//         const total = response.data.logs.reduce((sum, log) => sum + log.totalInsights, 0);
//         setInsightCount(total);
//       } catch (err) {
//         console.error('Error fetching insights:', err);
//       }
//     };

//     const fetchSystemAlerts = async () => {
//       try {
//         const response = await getSystemAlerts(token);
//         setAlerts(response.data.alerts.slice(0, 3));
//       } catch (err) {
//         console.error('Error fetching system alerts:', err);
//       }
//     };

//     fetchFileCount();
//     fetchUserCount();
//     fetchInsightCount();
//     fetchSystemAlerts();
//   }, []);

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <Sidebar />
//       <main className="ml-0 md:ml-64 w-full p-6 md:p-10">
//         <h1 className="text-3xl font-bold mb-2 text-gray-800">📊 Dashboard Overview</h1>
//         <p className="text-gray-500 mb-6">Welcome back, <span className="font-semibold">{user?.name}</span>!</p>

//         {/* Summary Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
//           <div className="bg-white shadow-md rounded-xl p-6 border-t-4 border-blue-500">
//             <div className="flex items-center gap-2 mb-2 text-blue-600">
//               <FileBarChart size={20} />
//               <h2 className="text-md font-medium text-gray-600">Files Uploaded</h2>
//             </div>
//             <p className="text-3xl font-bold text-blue-600">{fileCount}</p>
//           </div>

//           <div className="bg-white shadow-md rounded-xl p-6 border-t-4 border-blue-500">
//             <div className="flex items-center gap-2 mb-2 text-blue-600">
//               <Users size={20} />
//               <h2 className="text-md font-medium text-gray-600">Total Users</h2>
//             </div>
//             <p className="text-3xl font-bold text-blue-600">{userCount}</p>
//           </div>

//           <div className="bg-white shadow-md rounded-xl p-6 border-t-4 border-blue-500">
//             <div className="flex items-center gap-2 mb-2 text-blue-600">
//               <Brain size={20} />
//               <h2 className="text-md font-medium text-gray-600">Insights Generated</h2>
//             </div>
//             <p className="text-3xl font-bold text-blue-600">{insightCount}</p>
//           </div>
//         </div>

//         {/* System Alerts */}
//         <div className="bg-white shadow-md rounded-xl p-6 mb-10">
//           <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
//             <AlertTriangle className="text-yellow-500" size={22} /> Recent System Alerts
//           </h2>
//           {alerts.length === 0 ? (
//             <p className="text-gray-400">No alerts found.</p>
//           ) : (
//             <ul className="space-y-3">
//               {alerts.map((alert, idx) => (
//                 <li
//                   key={idx}
//                   className={`p-3 rounded border-l-4 ${
//                     alert.type === 'error'
//                       ? 'bg-red-50 border-red-600 text-red-700'
//                       : 'bg-yellow-50 border-yellow-500 text-yellow-700'
//                   }`}
//                 >
//                   <AlertTriangle size={16} className="inline-block mr-2" />
//                   {alert.message}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         {/* Quick Actions */}
//         <div className="flex flex-wrap gap-4">
//           <button
//             onClick={() => navigate('/upload')}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium shadow flex items-center gap-2"
//           >
//             <Upload size={18} /> Upload New File
//           </button>

//           <button
//             onClick={() => navigate('/admin')}
//             className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg font-medium shadow flex items-center gap-2"
//           >
//             <Settings size={18} /> Go to Admin Panel
//           </button>

//           <button
//             onClick={() => navigate('/FileHistory')}
//             className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-lg font-medium shadow flex items-center gap-2"
//           >
//             <History size={18} /> View File History
//           </button>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;



// import React, { useEffect, useState } from 'react';
// import Sidebar from '../components/Sidebar';
// import {
//   getAllFilesAdmin,
//   getAllUsers,
//   getSystemAlerts,
// } from '../api/api';
// import { useAuth } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import {
//   FileBarChart,
//   Users,
//   AlertTriangle,
//   Upload,
//   Settings,
//   History
// } from 'lucide-react';

// const Dashboard = () => {
//   const [fileCount, setFileCount] = useState(0);
//   const [userCount, setUserCount] = useState(0);
//   const [alerts, setAlerts] = useState([]);
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('token');

//     const fetchFileCount = async () => {
//       try {
//         const response = await getAllFilesAdmin(token);
//         setFileCount(response.data.files.length || 0);
//       } catch (err) {
//         console.error('Error fetching files:', err);
//       }
//     };

//     const fetchUserCount = async () => {
//       try {
//         const response = await getAllUsers(token);
//         setUserCount(response.data.users.length || 0);
//       } catch (err) {
//         console.error('Error fetching users:', err);
//       }
//     };

//     const fetchSystemAlerts = async () => {
//       try {
//         const response = await getSystemAlerts(token);
//         setAlerts(response.data.alerts.slice(0, 3));
//       } catch (err) {
//         console.error('Error fetching system alerts:', err);
//       }
//     };

//     fetchFileCount();
//     fetchUserCount();
//     fetchSystemAlerts();
//   }, []);

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <Sidebar />
//       <main className="ml-0 md:ml-64 w-full p-6 md:p-10">
//         <h1 className="text-3xl font-bold mb-2 text-gray-800">📊 Dashboard Overview</h1>
//         <p className="text-gray-500 mb-6">Welcome back, <span className="font-semibold">{user?.name}</span>!</p>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
//   <div className="bg-white shadow-md rounded-xl p-6 border-t-4 border-blue-500">
//     <div className="flex items-center gap-2 mb-2 text-blue-600">
//       <FileBarChart size={20} />
//       <h2 className="text-md font-medium text-gray-600">Files Uploaded</h2>
//     </div>
//     <p className="text-3xl font-bold text-blue-600">{fileCount}</p>
//   </div>

//   <div className="bg-white shadow-md rounded-xl p-6 border-t-4 border-blue-500">
//     <div className="flex items-center gap-2 mb-2 text-blue-600">
//       <Users size={20} />
//       <h2 className="text-md font-medium text-gray-600">Total Users</h2>
//     </div>
//     <p className="text-3xl font-bold text-blue-600">{userCount}</p>
//   </div>
// </div>

//         {/* ✅ System Alerts */}
//         <div className="bg-white shadow-md rounded-xl p-6 mb-10">
//           <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
//             <AlertTriangle className="text-yellow-500" size={22} /> Recent System Alerts
//           </h2>
//           {alerts.length === 0 ? (
//             <p className="text-gray-400">No alerts found.</p>
//           ) : (
//             <ul className="space-y-3">
//               {alerts.map((alert, idx) => (
//                 <li
//                   key={idx}
//                   className={`p-3 rounded border-l-4 ${
//                     alert.type === 'error'
//                       ? 'bg-red-50 border-red-600 text-red-700'
//                       : 'bg-yellow-50 border-yellow-500 text-yellow-700'
//                   }`}
//                 >
//                   <AlertTriangle size={16} className="inline-block mr-2" />
//                   {alert.message}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         {/* ✅ Quick Actions */}
//         <div className="flex flex-wrap gap-4">
//           <button
//             onClick={() => navigate('/upload')}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium shadow flex items-center gap-2"
//           >
//             <Upload size={18} /> Upload New File
//           </button>

//           <button
//             onClick={() => navigate('/admin')}
//             className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg font-medium shadow flex items-center gap-2"
//           >
//             <Settings size={18} /> Go to Admin Panel
//           </button>

//           <button
//             onClick={() => navigate('/FileHistory')}
//             className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-lg font-medium shadow flex items-center gap-2"
//           >
//             <History size={18} /> View File History
//           </button>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;




import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import {
  getAllFilesAdmin,
  getAllUsers,
  getSystemAlerts,
} from '../api/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  FileBarChart,
  Users,
  AlertTriangle,
  Upload,
  Settings,
  History
} from 'lucide-react';

const Dashboard = () => {
  const [fileCount, setFileCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [alerts, setAlerts] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchFileCount = async () => {
      try {
        const response = await getAllFilesAdmin(token);
        setFileCount(response.data.files.length || 0);
      } catch (err) {
        console.error('Error fetching files:', err);
      }
    };

    const fetchUserCount = async () => {
      try {
        const response = await getAllUsers(token);
        setUserCount(response.data.users.length || 0);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };

    const fetchSystemAlerts = async () => {
      try {
        const response = await getSystemAlerts(token);
        setAlerts(response.data.alerts.slice(0, 3));
      } catch (err) {
        console.error('Error fetching system alerts:', err);
      }
    };

    fetchFileCount();
    fetchUserCount();
    fetchSystemAlerts();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="ml-0 md:ml-64 w-full p-6 md:p-10">
        <h1 className="text-3xl font-bold mb-2 text-gray-800 flex items-center gap-2">
          📊 Dashboard Overview
        </h1>
        <p className="text-gray-500 mb-6">
          Welcome back, <span className="font-semibold">{user?.name}</span>!
        </p>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-gradient-to-br from-blue-100 to-white shadow-md rounded-xl p-6 border-t-4 border-blue-500">
            <div className="flex items-center gap-3 mb-3 text-blue-600">
              <div className="bg-blue-200 p-2 rounded-full">
                <FileBarChart size={22} />
              </div>
              <h2 className="text-lg font-semibold text-gray-700">Files Uploaded</h2>
            </div>
            <p className="text-4xl font-bold text-blue-700">{fileCount}</p>
          </div>

          <div className="bg-gradient-to-br from-indigo-100 to-white shadow-md rounded-xl p-6 border-t-4 border-indigo-500">
            <div className="flex items-center gap-3 mb-3 text-indigo-600">
              <div className="bg-indigo-200 p-2 rounded-full">
                <Users size={22} />
              </div>
              <h2 className="text-lg font-semibold text-gray-700">Total Users</h2>
            </div>
            <p className="text-4xl font-bold text-indigo-700">{userCount}</p>
          </div>
        </div>

        {/* System Alerts */}
        <div className="bg-white shadow-lg rounded-2xl p-6 mb-10 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <AlertTriangle className="text-yellow-500" size={22} />
            Recent System Alerts
          </h2>
          {alerts.length === 0 ? (
            <p className="text-gray-400">No alerts found.</p>
          ) : (
            <ul className="space-y-3">
              {alerts.map((alert, idx) => (
                <li
                  key={idx}
                  className={`p-3 rounded border-l-4 text-sm font-medium ${
                    alert.type === 'error'
                      ? 'bg-red-50 border-red-600 text-red-700'
                      : 'bg-yellow-50 border-yellow-500 text-yellow-700'
                  }`}
                >
                  <AlertTriangle size={16} className="inline-block mr-2" />
                  {alert.message}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => navigate('/upload')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl font-medium shadow-lg flex items-center gap-2 transition duration-200 ease-in-out transform hover:scale-105"
          >
            <Upload size={18} /> Upload New File
          </button>

          <button
            onClick={() => navigate('/admin')}
            className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-xl font-medium shadow-lg flex items-center gap-2 transition duration-200 ease-in-out transform hover:scale-105"
          >
            <Settings size={18} /> Go to Admin Panel
          </button>

          <button
            onClick={() => navigate('/FileHistory')}
            className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded-xl font-medium shadow-lg flex items-center gap-2 transition duration-200 ease-in-out transform hover:scale-105"
          >
            <History size={18} /> View File History
          </button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
