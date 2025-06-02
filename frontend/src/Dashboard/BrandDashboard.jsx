// import { useState, useEffect } from 'react';
// import { toast } from 'react-toastify';
// import Navbar from '../components/Navbar';
// import LoadingSpinner from '../components/LoadingSpinner';
// import { api } from '../../utils/api';

// export default function BrandDashboard() {
//   const [campaigns, setCampaigns] = useState([]);
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const [campaignsRes, bookingsRes] = await Promise.all([
//           api.get('/campaigns', {
//             headers: { Authorization: `Bearer ${token}` },
//           }),
//           api.get('/bookings', {
//             headers: { Authorization: `Bearer ${token}` },
//           }),
//         ]);

//         console.log('Campaigns response:', campaignsRes.data);
//         console.log('Bookings response:', bookingsRes.data);

//         const safeCampaigns = Array.isArray(campaignsRes.data)
//           ? campaignsRes.data
//           : Array.isArray(campaignsRes.data.campaigns)
//           ? campaignsRes.data.campaigns
//           : [];

//         const safeBookings = Array.isArray(bookingsRes.data)
//           ? bookingsRes.data
//           : Array.isArray(bookingsRes.data.bookings)
//           ? bookingsRes.data.bookings
//           : [];

//         setCampaigns(safeCampaigns);
//         setBookings(safeBookings);
//       } catch (err) {
//         console.error('Fetch error:', err);
//         toast.error('Failed to fetch data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) return <LoadingSpinner />;

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Navbar />
//       <div className="container mx-auto p-4">
//         <h2 className="text-2xl font-bold mb-4">Brand  Dashboard</h2>

//         {/* Campaigns Table */}
//         <h3 className="text-xl mb-2">Your Campaigns</h3>
//         <table className="w-full border-collapse border">
//           <thead>
//             <tr>
//               <th className="border p-2">Name</th>
//               <th className="border p-2">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {Array.isArray(campaigns) && campaigns.length > 0 ? (
//               campaigns.map((campaign) => (
//                 <tr key={campaign._id}>
//                   <td className="border p-2">{campaign.name}</td>
//                   <td className="border p-2">{campaign.status}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="2" className="text-center p-2">
//                   No campaigns available.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>

//         {/* Bookings Table */}
//         <h3 className="text-xl mt-4 mb-2">Your Bookings</h3>
//         <table className="w-full border-collapse border">
//           <thead>
//             <tr>
//               <th className="border p-2">Space</th>
//               <th className="border p-2">Start Date</th>
//               <th className="border p-2">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {Array.isArray(bookings) && bookings.length > 0 ? (
//               bookings.map((booking) => (
//                 <tr key={booking._id}>
//                   <td className="border p-2">
//                     {booking.spaceId?.businessName || 'N/A'}
//                   </td>
//                   <td className="border p-2">
//                     {new Date(booking.startDate).toLocaleDateString()}
//                   </td>
//                   <td className="border p-2">{booking.status}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="3" className="text-center p-2">
//                   No bookings available.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '../components/ui/Button';
import { Trash2 } from 'lucide-react';

const BrandDashboard = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl =  'http://localhost:5000/api';

  useEffect(() => {
    if (!user) {
      toast.error('Please login to view bookings');
      navigate('/login');
      return;
    }

    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(`${apiUrl}/bookings`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });

        setBookings(response.data.data || []);
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError(err.response?.data?.error?.message || 'Failed to load bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user, navigate]);

  const handleCancelBooking = async (bookingId) => {
    try {
      await axios.delete(`${apiUrl}/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      setBookings(bookings.filter((booking) => booking._id !== bookingId));
      toast.success('Booking cancelled successfully');
    } catch (err) {
      console.error('Error cancelling booking:', err);
      toast.error(err.response?.data?.error?.message || 'Failed to cancel booking');
    }
  };

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
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-black">Your Bookings</h1>

        {bookings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-500">No bookings found</p>
            <Button
              className="mt-4 bg-[#4261FF] hover:bg-[#6D4EFF] text-white"
              onClick={() => navigate('/browse-spaces')}
            >
              Browse Spaces
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="py-3 px-4 text-left">Space</th>
                  <th className="py-3 px-4 text-left">Start Date</th>
                  <th className="py-3 px-4 text-left">End Date</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Price</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id} className="border-b">
                    <td className="py-3 px-4">{booking.spaceId?.name || 'N/A'}</td>
                    <td className="py-3 px-4">{new Date(booking.startDate).toLocaleString()}</td>
                    <td className="py-3 px-4">{new Date(booking.endDate).toLocaleString()}</td>
                    <td className="py-3 px-4 capitalize">{booking.status}</td>
                    <td className="py-3 px-4">₹{booking.totalPrice?.toLocaleString() || 'N/A'}</td>
                    <td className="py-3 px-4">
                      {booking.status === 'pending' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCancelBooking(booking._id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={16} className="mr-1" />
                          Cancel
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
      <Footer />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default BrandDashboard;