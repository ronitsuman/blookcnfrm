// import { useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// import { Button } from '../components/ui/Button';

// const Dashboard1 = () => {
//   const { user } = useSelector((state) => state.user);
//   const navigate = useNavigate();

//   useEffect(() => {
//     console.log('User state:', user); // Debug
//     if (!user) {
//       toast.error('Please login to access dashboard');
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
//                   className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 font-semibold bg-gray-200"
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
//           <h1 className="text-3xl font-bold mb-6 text-blue-800">Space Owner Dashboard</h1>
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <h2 className="text-2xl font-semibold mb-4 text-navy-800">Quick Stats</h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//               <div className="p-4 bg-gray-100 rounded-md">
//                 <p className="text-gray-600">Active Campaigns</p>
//                 <p className="text-2xl font-bold">0 (Placeholder)</p>
//               </div>
//               <div className="p-4 bg-gray-100 rounded-md">
//                 <p className="text-gray-600">Total Scans</p>
//                 <p className="text-2xl font-bold">0 (Placeholder)</p>
//               </div>
//               <div className="p-4 bg-gray-100 rounded-md">
//                 <p className="text-gray-600">Total Revenue</p>
//                 <p className="text-2xl font-bold">₹0 (Placeholder)</p>
//               </div>
//             </div>
//             <Button
//               className="bg-[#4261FF] hover:bg-[#6D4EFF] text-white mb-6"
//               onClick={() => navigate('/campaigns')}
//             >
//               Create Campaign
//             </Button>
//             <h2 className="text-2xl font-semibold mb-4 text-navy-800">Active Campaigns</h2>
//             <div className="overflow-x-auto">
//               <table className="w-full text-left border-collapse">
//                 <thead>
//                   <tr className="bg-gray-200">
//                     <th className="p-2">Campaign Name</th>
//                     <th className="p-2">Status</th>
//                     <th className="p-2">Start Date</th>
//                     <th className="p-2">End Date</th>
//                     <th className="p-2">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr className="border-t">
//                     <td className="p-2">Placeholder Campaign</td>
//                     <td className="p-2">
//                       <span className="px-2 py-1 rounded text-white text-sm bg-gray-500">
//                         Inactive
//                       </span>
//                     </td>
//                     <td className="p-2">N/A</td>
//                     <td className="p-2">N/A</td>
//                     <td className="p-2">
//                       <Button
//                         className="bg-[#4261FF] hover:bg-[#6D4EFF] text-white text-sm"
//                         onClick={() => toast.info('View functionality coming soon!')}
//                       >
//                         View
//                       </Button>
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

// export default Dashboard1;


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

const Dashboard1 = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = 'http://localhost:5000/api';

  useEffect(() => {
    console.log('Dashboard.jsx mounted'); // Debug log
    console.log('User state:', user); // Debug log
    if (!user) {
      toast.error('Please login to access dashboard');
      navigate('/login');
      return;
    }
    if (user.role !== 'brand') {
      toast.error('Access restricted to brands');
      navigate('/');
      return;
    }

    const fetchCampaigns = async () => {
      try {
        const response = await axios.get(`${apiUrl}/campaigns`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setCampaigns(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching campaigns:', err);
        setError('Failed to load campaigns');
        setLoading(false);
        toast.error('Failed to load campaigns');
      }
    };

    fetchCampaigns();
  }, [user, navigate]);

  // Calculate quick stats
  const activeCampaigns = campaigns.filter(campaign => campaign.status === 'Active').length;
  const totalScans = campaigns.reduce((sum, campaign) => sum + (campaign.scans || 0), 0);
  const totalRevenue = campaigns.reduce((sum, campaign) => sum + (campaign.revenue || 0), 0);

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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar activePage="dashboard1" />

        {/* Main Content */}
        <main className="flex-grow container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 text-blue-800">Space Owner Dashboard</h1>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4 text-navy-800">Quick Stats</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-gray-100 rounded-md">
                <p className="text-gray-600">Active Campaigns</p>
                <p className="text-2xl font-bold">{activeCampaigns}</p>
              </div>
              <div className="p-4 bg-gray-100 rounded-md">
                <p className="text-gray-600">Total Scans</p>
                <p className="text-2xl font-bold">{totalScans}</p>
              </div>
              <div className="p-4 bg-gray-100 rounded-md">
                <p className="text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold">₹{totalRevenue}</p>
              </div>
            </div>
            <Button
              className="bg-[#4261FF] hover:bg-[#6D4EFF] text-white mb-6"
              onClick={() => navigate('/campaigns')}
            >
              Create Campaign
            </Button>
            <h2 className="text-2xl font-semibold mb-4 text-navy-800">Active Campaigns</h2>
            {campaigns.length === 0 ? (
              <div className="text-center">
                <p className="text-gray-600 mb-4">No campaigns found. Create a campaign to get started.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="p-2">Campaign Name</th>
                      <th className="p-2">Status</th>
                      <th className="p-2">Start Date</th>
                      <th className="p-2">End Date</th>
                      <th className="p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaigns.map((campaign) => (
                      <tr key={campaign._id} className="border-t">
                        <td className="p-2">{campaign.name}</td>
                        <td className="p-2">
                          <span
                            className={`px-2 py-1 rounded text-white text-sm ${
                              campaign.status === 'Active'
                                ? 'bg-green-500'
                                : campaign.status === 'Scheduled'
                                ? 'bg-yellow-500'
                                : 'bg-red-500'
                            }`}
                          >
                            {campaign.status}
                          </span>
                        </td>
                        <td className="p-2">{new Date(campaign.startDate).toLocaleDateString()}</td>
                        <td className="p-2">{new Date(campaign.endDate).toLocaleDateString()}</td>
                        <td className="p-2">
                          <Button
                            className="bg-[#4261FF] hover:bg-[#6D4EFF] text-white text-sm"
                            onClick={() => navigate(`/campaigns/summary/${campaign._id}`)}
                          >
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
      <Footer />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default Dashboard1;