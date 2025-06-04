// import { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// import { Button } from '../components/ui/Button';

// const CampaignAnalytics = () => {
//   const { user } = useSelector((state) => state.user);
//   const navigate = useNavigate();
//   const [analyticsData, setAnalyticsData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const apiUrl = 'http://localhost:5000/api';

//   useEffect(() => {
//     console.log('CampaignAnalytics.jsx mounted'); // Debug log
//     console.log('User state:', user); // Debug log

//     if (!user) {
//       toast.error('Please login to access analytics');
//       navigate('/login');
//       return;
//     }
//     if (user.role !== 'brand') {
//       toast.error('Access restricted to brands');
//       navigate('/');
//       return;
//     }

//     // Fetch analytics data
//     const fetchAnalytics = async () => {
//       try {
//         const response = await axios.get(`${apiUrl}/campaigns/analytics`, {
//           headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//         });
//         console.log('Analytics data fetched:', response.data.data); // Debug log
//         setAnalyticsData(response.data.data);
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching analytics:', err);
//         toast.error('Failed to load analytics data');
//         setError('Failed to load analytics data');
//         setLoading(false);
//       }
//     };

//     fetchAnalytics();
//   }, [user, navigate]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-lg text-red-600">{error}</p>
//       </div>
//     );
//   }

//   const totalScans = analyticsData.reduce((sum, data) => sum + data.scans, 0);
//   const avgEngagementRate = analyticsData.length
//     ? (analyticsData.reduce((sum, data) => sum + data.engagementRate, 0) / analyticsData.length).toFixed(1)
//     : 0;
//   const avgRedemptionRate = analyticsData.length
//     ? (analyticsData.reduce((sum, data) => sum + data.redemptionRate, 0) / analyticsData.length).toFixed(1)
//     : 0;
//   const topCampaign = analyticsData.reduce((top, data) => (data.scans > (top?.scans || 0) ? data : top), null);

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
//                   onClick={() => navigate('/dashboard')} // Redirect to Dashboard for campaign list
//                   className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
//                 >
//                   Campaigns
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
//                   className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
//                 >
//                   Payments
//                 </button>
//               </li>
//               <li>
//                 <button
//                   onClick={() => navigate('/analytics')} // Fixed path from /analytics1 to /analytics
//                   className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 font-semibold bg-gray-200"
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
//           <h1 className="text-3xl font-bold mb-6 text-blue-800">Analytics</h1>
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <h2 className="text-2xl font-semibold mb-4 text-navy-800">Performance Overview</h2>
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//               <div className="p-4 bg-gray-100 rounded-md">
//                 <p className="text-gray-600">Total Scans</p>
//                 <p className="text-2xl font-bold">{totalScans}</p>
//               </div>
//               <div className="p-4 bg-gray-100 rounded-md">
//                 <p className="text-gray-600">Avg Engagement Rate</p>
//                 <p className="text-2xl font-bold">{avgEngagementRate}%</p>
//               </div>
//               <div className="p-4 bg-gray-100 rounded-md">
//                 <p className="text-gray-600">Avg Redemption Rate</p>
//                 <p className="text-2xl font-bold">{avgRedemptionRate}%</p>
//               </div>
//               <div className="p-4 bg-gray-100 rounded-md">
//                 <p className="text-gray-600">Top Campaign</p>
//                 <p className="text-2xl font-bold">{topCampaign?.name || 'N/A'}</p>
//               </div>
//             </div>

//             <h3 className="text-lg font-semibold mb-4">Scans Over Time</h3>
//             <div className="mb-6">
//               {/* Mock Line Graph */}
//               <div className="h-64 bg-gray-200 flex items-center justify-center">
//                 <p className="text-gray-600">Line Graph: Scans Over Time (Mock)</p>
//               </div>
//             </div>

//             <h3 className="text-lg font-semibold mb-4">Campaign Engagement Distribution</h3>
//             <div className="mb-6">
//               {/* Mock Pie Chart */}
//               <div className="h-64 bg-gray-200 flex items-center justify-center">
//                 <p className="text-gray-600">Pie Chart: Engagement Distribution (Mock)</p>
//               </div>
//             </div>

//             <h3 className="text-lg font-semibold mb-4">Campaign Details</h3>
//             <div className="overflow-x-auto">
//               <table className="w-full text-left border-collapse">
//                 <thead>
//                   <tr className="bg-gray-200">
//                     <th className="p-2">Campaign Name</th>
//                     <th className="p-2">Scans</th>
//                     <th className="p-2">Engagement Rate</th>
//                     <th className="p-2">Redemption Rate</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {analyticsData.map((data) => (
//                     <tr key={data._id} className="border-t">
//                       <td className="p-2">{data.name}</td>
//                       <td className="p-2">{data.scans}</td>
//                       <td className="p-2">{data.engagementRate}%</td>
//                       <td className="p-2">{data.redemptionRate}%</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             <Button
//               className="mt-6 bg-[#4261FF] hover:bg-[#6D4EFF] text-white"
//               onClick={() => navigate('/dashboard')} // Redirect to Dashboard for campaign list
//             >
//               Back to Campaigns
//             </Button>
//           </div>
//         </main>
//       </div>
//       <Footer />
//       <ToastContainer position="bottom-right" autoClose={3000} />
//     </div>
//   );
// };

// export default CampaignAnalytics;





// import { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// import { Button } from '../components/ui/Button';
// import Sidebar from '../components/Sidebar';

// const CampaignAnalytics = () => {
//   const { user } = useSelector((state) => state.user);
//   const navigate = useNavigate();
//   const [analyticsData, setAnalyticsData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const apiUrl = 'http://localhost:5000/api';

//   useEffect(() => {
//     console.log('CampaignAnalytics.jsx mounted'); // Debug log
//     console.log('User state:', user); // Debug log

//     if (!user) {
//       toast.error('Please login to access analytics');
//       navigate('/login');
//       return;
//     }
//     if (user.role !== 'brand') {
//       toast.error('Access restricted to brands');
//       navigate('/');
//       return;
//     }

//     // Fetch analytics data
//     const fetchAnalytics = async () => {
//       try {
//         const response = await axios.get(`${apiUrl}/campaigns/analytics`, {
//           headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//         });
//         console.log('Analytics data fetched:', response.data.data); // Debug log
//         setAnalyticsData(response.data.data);
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching analytics:', err);
//         toast.error('Failed to load analytics data');
//         setError('Failed to load analytics data');
//         setLoading(false);
//       }
//     };

//     fetchAnalytics();
//   }, [user, navigate]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-lg text-red-600">{error}</p>
//       </div>
//     );
//   }

//   const totalScans = analyticsData.reduce((sum, data) => sum + data.scans, 0);
//   const avgEngagementRate = analyticsData.length
//     ? (analyticsData.reduce((sum, data) => sum + data.engagementRate, 0) / analyticsData.length).toFixed(1)
//     : 0;
//   const avgRedemptionRate = analyticsData.length
//     ? (analyticsData.reduce((sum, data) => sum + data.redemptionRate, 0) / analyticsData.length).toFixed(1)
//     : 0;
//   const topCampaign = analyticsData.reduce((top, data) => (data.scans > (top?.scans || 0) ? data : top), null);

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       <Navbar />
//       <div className="flex flex-1">
//         {/* Sidebar */}
//         {/* <aside className="w-64 bg-white shadow-md">
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
//                   className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
//                 >
//                   Payments
//                 </button>
//               </li>
//               <li>
//                 <button
//                   onClick={() => navigate('/analytics')}
//                   className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 font-semibold bg-gray-200"
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
//         </aside> */}
//         <Sidebar/>

//         {/* Main Content */}
//         <main className="flex-grow container mx-auto px-4 py-8">
//           <h1 className="text-3xl font-bold mb-6 text-blue-800">Analytics</h1>
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <h2 className="text-2xl font-semibold mb-4 text-navy-800">Performance Overview</h2>
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//               <div className="p-4 bg-gray-100 rounded-md">
//                 <p className="text-gray-600">Total Scans</p>
//                 <p className="text-2xl font-bold">{totalScans}</p>
//               </div>
//               <div className="p-4 bg-gray-100 rounded-md">
//                 <p className="text-gray-600">Avg Engagement Rate</p>
//                 <p className="text-2xl font-bold">{avgEngagementRate}%</p>
//               </div>
//               <div className="p-4 bg-gray-100 rounded-md">
//                 <p className="text-gray-600">Avg Redemption Rate</p>
//                 <p className="text-2xl font-bold">{avgRedemptionRate}%</p>
//               </div>
//               <div className="p-4 bg-gray-100 rounded-md">
//                 <p className="text-gray-600">Top Campaign</p>
//                 <p className="text-2xl font-bold">{topCampaign?.name || 'N/A'}</p>
//               </div>
//             </div>

//             <h3 className="text-lg font-semibold mb-4">Scans Over Time</h3>
//             <div className="mb-6">
//               {/* Mock Line Graph */}
//               <div className="h-64 bg-gray-200 flex items-center justify-center">
//                 <p className="text-gray-600">Line Graph: Scans Over Time (Mock)</p>
//               </div>
//             </div>

//             <h3 className="text-lg font-semibold mb-4">Campaign Engagement Distribution</h3>
//             <div className="mb-6">
//               {/* Mock Pie Chart */}
//               <div className="h-64 bg-gray-200 flex items-center justify-center">
//                 <p className="text-gray-600">Pie Chart: Engagement Distribution (Mock)</p>
//               </div>
//             </div>

//             <h3 className="text-lg font-semibold mb-4">Campaign Details</h3>
//             <div className="overflow-x-auto">
//               <table className="w-full text-left border-collapse">
//                 <thead>
//                   <tr className="bg-gray-200">
//                     <th className="p-2">Campaign Name</th>
//                     <th className="p-2">Scans</th>
//                     <th className="p-2">Engagement Rate</th>
//                     <th className="p-2">Redemption Rate</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {analyticsData.map((data) => (
//                     <tr key={data._id} className="border-t">
//                       <td className="p-2">{data.name}</td>
//                       <td className="p-2">{data.scans}</td>
//                       <td className="p-2">{data.engagementRate}%</td>
//                       <td className="p-2">{data.redemptionRate}%</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             <Button
//               className="mt-6 bg-[#4261FF] hover:bg-[#6D4EFF] text-white"
//               onClick={() => navigate('/dashboard')} // Redirect to Dashboard for campaign list
//             >
//               Back to Campaigns
//             </Button>
//           </div>
//         </main>
//       </div>
//       <Footer />
//       <ToastContainer position="bottom-right" autoClose={3000} />
//     </div>
//   );
// };

// export default CampaignAnalytics;

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar'; // Import shared Sidebar
import { Button } from '../components/ui/Button';

const CampaignAnalytics = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [analyticsData, setAnalyticsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = 'http://localhost:5000/api';

  useEffect(() => {
    console.log('CampaignAnalytics.jsx mounted'); // Debug log
    console.log('User state:', user); // Debug log

    if (!user) {
      toast.error('Please login to access analytics');
      navigate('/login');
      return;
    }
    if (user.role !== 'brand') {
      toast.error('Access restricted to brands');
      navigate('/');
      return;
    }

    // Fetch analytics data
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get(`${apiUrl}/campaigns/analytics`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        console.log('Analytics data fetched:', response.data.data); // Debug log
        setAnalyticsData(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching analytics:', err);
        toast.error('Failed to load analytics data');
        setError('Failed to load analytics data');
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-red-600">{error}</p>
      </div>
    );
  }

  const totalScans = analyticsData.reduce((sum, data) => sum + data.scans, 0);
  const avgEngagementRate = analyticsData.length
    ? (analyticsData.reduce((sum, data) => sum + data.engagementRate, 0) / analyticsData.length).toFixed(1)
    : 0;
  const avgRedemptionRate = analyticsData.length
    ? (analyticsData.reduce((sum, data) => sum + data.redemptionRate, 0) / analyticsData.length).toFixed(1)
    : 0;
  const topCampaign = analyticsData.reduce((top, data) => (data.scans > (top?.scans || 0) ? data : top), null);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar activePage="analytics" />

        {/* Main Content */}
        <main className="flex-grow container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 text-blue-800">Analytics</h1>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4 text-navy-800">Performance Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-gray-100 rounded-md">
                <p className="text-gray-600">Total Scans</p>
                <p className="text-2xl font-bold">{totalScans}</p>
              </div>
              <div className="p-4 bg-gray-100 rounded-md">
                <p className="text-gray-600">Avg Engagement Rate</p>
                <p className="text-2xl font-bold">{avgEngagementRate}%</p>
              </div>
              <div className="p-4 bg-gray-100 rounded-md">
                <p className="text-gray-600">Avg Redemption Rate</p>
                <p className="text-2xl font-bold">{avgRedemptionRate}%</p>
              </div>
              <div className="p-4 bg-gray-100 rounded-md">
                <p className="text-gray-600">Top Campaign</p>
                <p className="text-2xl font-bold">{topCampaign?.name || 'N/A'}</p>
              </div>
            </div>

            <h3 className="text-lg font-semibold mb-4">Scans Over Time</h3>
            <div className="mb-6">
              {/* Mock Line Graph */}
              <div className="h-64 bg-gray-200 flex items-center justify-center">
                <p className="text-gray-600">Line Graph: Scans Over Time (Mock)</p>
              </div>
            </div>

            <h3 className="text-lg font-semibold mb-4">Campaign Engagement Distribution</h3>
            <div className="mb-6">
              {/* Mock Pie Chart */}
              <div className="h-64 bg-gray-200 flex items-center justify-center">
                <p className="text-gray-600">Pie Chart: Engagement Distribution (Mock)</p>
              </div>
            </div>

            <h3 className="text-lg font-semibold mb-4">Campaign Details</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2">Campaign Name</th>
                    <th className="p-2">Scans</th>
                    <th className="p-2">Engagement Rate</th>
                    <th className="p-2">Redemption Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {analyticsData.map((data) => (
                    <tr key={data._id} className="border-t">
                      <td className="p-2">{data.name}</td>
                      <td className="p-2">{data.scans}</td>
                      <td className="p-2">{data.engagementRate}%</td>
                      <td className="p-2">{data.redemptionRate}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Button
              className="mt-6 bg-[#4261FF] hover:bg-[#6D4EFF] text-white"
              onClick={() => navigate('/dashboard')} // Redirect to Dashboard for campaign list
            >
              Back to Campaigns
            </Button>
          </div>
        </main>
      </div>
      <Footer />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default CampaignAnalytics;