
// import React from 'react';
// import Sidebar from '../components/Sidebar';
// import { useAuth } from '../context/AuthContext';
// import { User, Mail, Shield } from 'lucide-react';

// const UserProfile = () => {
//   const { user } = useAuth();

//   return (
//     <div className="flex min-h-screen bg-gray-100 text-gray-800">
//       <Sidebar />
//       <div className="ml-64 p-8 w-full">
//         <h1 className="text-4xl font-bold mb-8 text-center">User Profile</h1>

//         {user ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {/* User ID */}
//             <div className="bg-white shadow-lg rounded-xl p-6 flex items-center gap-4 w-full">
//               <User className="text-blue-500 w-10 h-10" />
//               <div>
//                 <h2 className="text-lg font-semibold">User ID</h2>
//                 <p className="text-sm text-gray-600 break-all">{user.userId || user.id}</p>
//               </div>
//             </div>

//             {/* Email */}
//             <div className="bg-white shadow-lg rounded-xl p-6 flex items-center gap-4 w-full">
//               <Mail className="text-green-500 w-10 h-10" />
//               <div>
//                 <h2 className="text-lg font-semibold">Email</h2>
//                 <p className="text-sm text-gray-600 break-all">{user.email}</p>
//               </div>
//             </div>

//             {/* Role */}
//             <div className="bg-white shadow-lg rounded-xl p-6 flex items-center gap-4 w-full">
//               <Shield className="text-purple-500 w-10 h-10" />
//               <div>
//                 <h2 className="text-lg font-semibold">Role</h2>
//                 <p className="text-sm text-gray-600 capitalize">{user.role}</p>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <p className="text-center text-red-600 text-lg mt-8">
//             No user data available. Please log in.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserProfile;

import React from 'react';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Shield } from 'lucide-react';

const UserProfile = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 text-gray-800">
      <Sidebar />
      <main className="lg:ml-64 p-6 w-full">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-blue-700">👤 User Profile</h1>

        {user ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
            {/* User ID */}
            <div className="bg-white shadow-md rounded-lg p-6 flex items-start sm:items-center gap-4">
              <User className="text-blue-500 w-8 h-8 sm:w-10 sm:h-10" />
              <div>
                <h2 className="text-base sm:text-lg font-semibold">User ID</h2>
                <p className="text-sm text-gray-600 break-words">{user.userId || user.id}</p>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white shadow-md rounded-lg p-6 flex items-start sm:items-center gap-4">
              <Mail className="text-green-500 w-8 h-8 sm:w-10 sm:h-10" />
              <div>
                <h2 className="text-base sm:text-lg font-semibold">Email</h2>
                <p className="text-sm text-gray-600 break-words">{user.email}</p>
              </div>
            </div>

            {/* Role */}
            <div className="bg-white shadow-md rounded-lg p-6 flex items-start sm:items-center gap-4">
              <Shield className="text-purple-500 w-8 h-8 sm:w-10 sm:h-10" />
              <div>
                <h2 className="text-base sm:text-lg font-semibold">Role</h2>
                <p className="text-sm text-gray-600 capitalize">{user.role}</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-red-600 text-lg mt-8">
            No user data available. Please log in.
          </p>
        )}
      </main>
    </div>
  );
};

export default UserProfile;

