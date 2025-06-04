// import { useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';

// const Calendar = () => {
//   const { user } = useSelector((state) => state.user);
//   const navigate = useNavigate();

//   useEffect(() => {
//     console.log('User state:', user); // Debug
//     if (!user) {
//       toast.error('Please login to access calendar');
//       navigate('/login');
//       return;
//     }
//     if (user.role !== 'brand') {
//       toast.error('Access restricted to brands');
//       navigate('/');
//       return;
//     }
//   }, [user, navigate]);

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       <Navbar />
//       <div className="flex flex-1">
//         {/* Sidebar */}
//         <aside className="w-64 bg-white shadow-md">
//           <nav className="mt-6">
//             <ul>
//               <li>
//                 <button
//                   onClick={() => navigate('/dashboard')}
//                   className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
//                 >
//                   Dashboard
//                 </button>
//               </li>
//               {/* <li>
//                 <button
//                   onClick={() => navigate('/campaigns')}
//                   className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
//                 >
//                   Campaigns
//                 </button>
//               </li> */}
//               <li>
//                 <button
//                   onClick={() => navigate('/calendar')}
//                   className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 font-semibold bg-gray-200"
//                 >
//                   Calendar
//                 </button>
//               </li>
//               <li>
//                 <button
//                   onClick={() => navigate('/payments')}
//                   className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
//                 >
//                   Payments
//                 </button>
//               </li>
//               <li>
//                 <button
//                   onClick={() => navigate('/analytics1')}
//                   className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
//                 >
//                   Analytics
//                 </button>
//               </li>
//               <li>
//                 <button
//                   onClick={() => navigate('/support')}
//                   className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
//                 >
//                   Support
//                 </button>
//               </li>
//             </ul>
//           </nav>
//         </aside>

//         {/* Main Content */}
//         <main className="flex-grow container mx-auto px-4 py-8">
//           <h1 className="text-3xl font-bold mb-6 text-blue-800">Calendar</h1>
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-2xl font-semibold text-navy-800">April 2025 (Placeholder)</h2>
//               <div className="space-x-2">
//                 <button className="px-2 py-1 border rounded">Previous</button>
//                 <button className="px-2 py-1 border rounded">Today</button>
//                 <button className="px-2 py-1 border rounded">Next</button>
//               </div>
//             </div>
//             <div className="grid grid-cols-7 gap-2 text-center">
//               <div className="font-semibold">Sun</div>
//               <div className="font-semibold">Mon</div>
//               <div className="font-semibold">Tue</div>
//               <div className="font-semibold">Wed</div>
//               <div className="font-semibold">Thu</div>
//               <div className="font-semibold">Fri</div>
//               <div className="font-semibold">Sat</div>
//               {/* Placeholder Days */}
//               {[...Array(35)].map((_, i) => (
//                 <div key={i} className="p-2 border rounded">
//                   {i < 30 ? i + 1 : i - 29}
//                   {i === 0 && (
//                     <span className="block text-sm text-green-500">Active: Campaign 1</span>
//                   )}
//                   {i === 1 && (
//                     <span className="block text-sm text-yellow-500">Scheduled: Campaign 2</span>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </main>
//       </div>
//       <Footer />
//       <ToastContainer position="bottom-right" autoClose={3000} />
//     </div>
//   );
// };

// export default Calendar;




import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar'; // Import shared Sidebar

const Calendar = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Calendar.jsx mounted'); // Debug log
    console.log('User state:', user); // Debug log
    if (!user) {
      toast.error('Please login to access calendar');
      navigate('/login');
      return;
    }
    if (user.role !== 'brand') {
      toast.error('Access restricted to brands');
      navigate('/');
      return;
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar activePage="calendar" />

        {/* Main Content */}
        <main className="flex-grow container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 text-blue-800">Calendar</h1>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-navy-800">April 2025 (Placeholder)</h2>
              <div className="space-x-2">
                <button className="px-2 py-1 border rounded">Previous</button>
                <button className="px-2 py-1 border rounded">Today</button>
                <button className="px-2 py-1 border rounded">Next</button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-2 text-center">
              <div className="font-semibold">Sun</div>
              <div className="font-semibold">Mon</div>
              <div className="font-semibold">Tue</div>
              <div className="font-semibold">Wed</div>
              <div className="font-semibold">Thu</div>
              <div className="font-semibold">Fri</div>
              <div className="font-semibold">Sat</div>
              {/* Placeholder Days */}
              {[...Array(35)].map((_, i) => (
                <div key={i} className="p-2 border rounded">
                  {i < 30 ? i + 1 : i - 29}
                  {i === 0 && (
                    <span className="block text-sm text-green-500">Active: Campaign 1</span>
                  )}
                  {i === 1 && (
                    <span className="block text-sm text-yellow-500">Scheduled: Campaign 2</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
      <Footer />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default Calendar;