// // import { useEffect } from 'react';
// // import { useSelector } from 'react-redux';
// // import { useNavigate } from 'react-router-dom';
// // import { toast, ToastContainer } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// // import Navbar from '../components/Navbar';
// // import Footer from '../components/Footer';

// // const Payments = () => {
// //   const { user } = useSelector((state) => state.user);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     console.log('User state:', user); // Debug
// //     if (!user) {
// //       toast.error('Please login to access payments');
// //       navigate('/login');
// //       return;
// //     }
// //     if (user.role !== 'brand') {
// //       toast.error('Access restricted to brands');
// //       navigate('/');
// //       return;
// //     }
// //   }, [user, navigate]);

// //   return (
// //     <div className="min-h-screen flex flex-col bg-gray-50">
// //       <Navbar />
// //       <div className="flex flex-1">
// //         {/* Sidebar */}
// //         <aside className="w-64 bg-white shadow-md">
// //           <nav className="mt-6">
// //             <ul>
// //               <li>
// //                 <button
// //                   onClick={() => navigate('/dashboard')}
// //                   className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
// //                 >
// //                   Dashboard
// //                 </button>
// //               </li>
// //               {/* <li>
// //                 <button
// //                   onClick={() => navigate('/campaigns')}
// //                   className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
// //                 >
// //                   Campaigns
// //                 </button>
// //               </li> */}
// //               <li>
// //                 <button
// //                   onClick={() => navigate('/calendar')}
// //                   className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
// //                 >
// //                   Calendar
// //                 </button>
// //               </li>
// //               <li>
// //                 <button
// //                   onClick={() => navigate('/payments')}
// //                   className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 font-semibold bg-gray-200"
// //                 >
// //                   Payments
// //                 </button>
// //               </li>
// //               <li>
// //                 <button
// //                   onClick={() => navigate('/analytics1')}
// //                   className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
// //                 >
// //                   Analytics
// //                 </button>
// //               </li>
// //               <li>
// //                 <button
// //                   onClick={() => navigate('/support')}
// //                   className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
// //                 >
// //                   Support
// //                 </button>
// //               </li>
// //             </ul>
// //           </nav>
// //         </aside>

// //         {/* Main Content */}
// //         <main className="flex-grow container mx-auto px-4 py-8">
// //           <h1 className="text-3xl font-bold mb-6 text-blue-800">Payments</h1>
// //           <div className="bg-white rounded-lg shadow-md p-6">
// //             <h2 className="text-2xl font-semibold mb-4 text-navy-800">Payment History</h2>
// //             <div className="overflow-x-auto">
// //               <table className="w-full text-left border-collapse">
// //                 <thead>
// //                   <tr className="bg-gray-200">
// //                     <th className="p-2">Invoice ID</th>
// //                     <th className="p-2">Amount</th>
// //                     <th className="p-2">Date</th>
// //                     <th className="p-2">Status</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   <tr className="border-t">
// //                     <td className="p-2">INV-001</td>
// //                     <td className="p-2">₹500</td>
// //                     <td className="p-2">2025-06-04</td>
// //                     <td className="p-2">
// //                       <span className="px-2 py-1 rounded text-white text-sm bg-green-500">
// //                         Paid
// //                       </span>
// //                     </td>
// //                   </tr>
// //                 </tbody>
// //               </table>
// //             </div>
// //           </div>
// //         </main>
// //       </div>
// //       <Footer />
// //       <ToastContainer position="bottom-right" autoClose={3000} />
// //     </div>
// //   );
// // };

// // export default Payments;


// import { useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';

// const Payments = () => {
//   const { user } = useSelector((state) => state.user);
//   const navigate = useNavigate();

//   useEffect(() => {
//     console.log('Payments.jsx mounted'); // Debug log
//     console.log('User state:', user); // Debug log
//     if (!user) {
//       toast.error('Please login to access payments');
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
//               <li>
//                 <button
//                   onClick={() => navigate('/campaigns')}
//                   className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
//                 >
//                   Create Campaign
//                 </button>
//               </li>
//               <li>
//                 <button
//                   onClick={() => navigate('/calendar')}
//                   className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
//                 >
//                   Calendar
//                 </button>
//               </li>
//               <li>
//                 <button
//                   onClick={() => navigate('/payments')}
//                   className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 font-semibold bg-gray-200"
//                 >
//                   Payments
//                 </button>
//               </li>
//               <li>
//                 <button
//                   onClick={() => navigate('/analytics')}
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
//           <h1 className="text-3xl font-bold mb-6 text-blue-800">Payments</h1>
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <h2 className="text-2xl font-semibold mb-4 text-navy-800">Payment History</h2>
//             <div className="overflow-x-auto">
//               <table className="w-full text-left border-collapse">
//                 <thead>
//                   <tr className="bg-gray-200">
//                     <th className="p-2">Invoice ID</th>
//                     <th className="p-2">Amount</th>
//                     <th className="p-2">Date</th>
//                     <th className="p-2">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr className="border-t">
//                     <td className="p-2">INV-001</td>
//                     <td className="p-2">₹500</td>
//                     <td className="p-2">2025-06-04</td>
//                     <td className="p-2">
//                       <span className="px-2 py-1 rounded text-white text-sm bg-green-500">
//                         Paid
//                       </span>
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </main>
//       </div>
//       <Footer />
//       <ToastContainer position="bottom-right" autoClose={3000} />
//     </div>
//   );
// };

// export default Payments;



import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar'; // Import shared Sidebar

const Payments = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Payments.jsx mounted'); // Debug log
    console.log('User state:', user); // Debug log
    if (!user) {
      toast.error('Please login to access payments');
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
        <Sidebar activePage="payments" />

        {/* Main Content */}
        <main className="flex-grow container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 text-blue-800">Payments</h1>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4 text-navy-800">Payment History</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2">Invoice ID</th>
                    <th className="p-2">Amount</th>
                    <th className="p-2">Date</th>
                    <th className="p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="p-2">INV-001</td>
                    <td className="p-2">₹500</td>
                    <td className="p-2">2025-06-04</td>
                    <td className="p-2">
                      <span className="px-2 py-1 rounded text-white text-sm bg-green-500">
                        Paid
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
      <Footer />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default Payments;