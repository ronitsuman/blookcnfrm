// import { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Button } from './ui/Button';
// import { CheckCircle, XCircle } from 'lucide-react';

// const OwnerBookings = ({ spaceId }) => {
//   const { user } = useSelector((state) => state.user);
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const apiUrl =  'http://localhost:5000/api';

//   useEffect(() => {
//     console.log('OwnerBookings: User:', user, 'Space ID:', spaceId); // Debug
//     if (!user) {
//       toast.error('Please login to manage bookings');
//       return;
//     }

//     const fetchBookings = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const token = localStorage.getItem('token');
//         console.log('Token:', token); // Debug
//         if (!token) throw new Error('No authentication token found');

//         if (!spaceId) throw new Error('Invalid space ID');

//         const response = await axios.get(`${apiUrl}/bookings/space/${spaceId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         console.log('Fetch bookings response:', response.data); // Debug
//         const bookingsData = response.data?.data || [];
//         setBookings(bookingsData);

//         if (bookingsData.length === 0) {
//           toast.info('No bookings found for this space');
//         }
//       } catch (err) {
//         console.error('Error fetching bookings:', err);
//         const errorMessage = err.response?.data?.error?.message || err.message || 'Failed to load bookings';
//         setError(errorMessage);
//         toast.error(errorMessage);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBookings();
//   }, [user, spaceId]);

//   const handleUpdateStatus = async (bookingId, status) => {
//     try {
//       console.log('Updating booking:', bookingId, 'Status:', status); // Debug
//       const response = await axios.put(
//         `${apiUrl}/bookings/${bookingId}`,
//         { status },
//         { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
//       );

//       setBookings(
//         bookings.map((booking) =>
//           booking._id === bookingId ? { ...booking, status: response.data.data.status } : booking
//         )
//       );
//       toast.success(`Booking ${status} successfully`);
//     } catch (err) {
//       console.error(`Error updating booking status:`, err);
//       toast.error(err.response?.data?.error?.message || `Failed to ${status} booking`);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-32">
//         <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return <p className="text-red-600 text-center">{error}</p>;
//   }

//   return (
//     <div className="bg-white rounded-lg shadow-md p-6">
//       <h3 className="text-xl font-semibold mb-4 text-blue-600">Manage Bookings</h3>

//       {bookings.length === 0 ? (
//         <p className="text-gray-500 text-center">No bookings for this space</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full">
//             <thead>
//               <tr className="bg-gray-100 text-gray-700">
//                 <th className="py-3 px-4 text-left">Renter</th>
//                 <th className="py-3 px-4 text-left">Start Date</th>
//                 <th className="py-3 px-4 text-left">End Date</th>
//                 <th className="py-3 px-4 text-left">Status</th>
//                 <th className="py-3 px-4 text-left">Price</th>
//                 <th className="py-3 px-4 text-left">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {bookings.map((booking) => (
//                 <tr key={booking._id} className="border-b">
//                   <td className="py-3 px-4">{booking.userId?.name || 'Unknown User'}</td>
//                   <td className="py-3 px-4">{new Date(booking.startDate).toLocaleString()}</td>
//                   <td className="py-3 px-4">{new Date(booking.endDate).toLocaleString()}</td>
//                   <td className="py-3 px-4 capitalize">{booking.status}</td>
//                   <td className="py-3 px-4">₹{booking.totalPrice?.toLocaleString() || 'N/A'}</td>
//                   <td className="py-3 px-4">
//                     {booking.status === 'pending' && (
//                       <div className="flex gap-2">
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={() => handleUpdateStatus(booking._id, 'confirmed')}
//                           className="text-green-600 hover:text-green-800"
//                         >
//                           <CheckCircle size={16} className="mr-1" />
//                           Approve
//                         </Button>
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={() => handleUpdateStatus(booking._id, 'rejected')}
//                           className="text-red-600 hover:text-red-800"
//                         >
//                           <XCircle size={16} className="mr-1" />
//                           Reject
//                         </Button>
//                       </div>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//       <ToastContainer position="bottom-right" autoClose={3000} />
//     </div>
//   );
// };

// export default OwnerBookings;

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from './ui/Button';
import { CheckCircle, XCircle } from 'lucide-react';

const OwnerBookings = ({ spaceId }) => {
  const { user } = useSelector((state) => state.user);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl =  'http://localhost:5000/api';

  useEffect(() => {
    console.log('OwnerBookings: User:', user, 'Space ID:', spaceId); // Debug
    if (!user) {
      toast.error('Please login to manage bookings');
      return;
    }

    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem('token');
        console.log('Token:', token); // Debug
        if (!token) throw new Error('No authentication token found');

        if (!spaceId) throw new Error('Invalid space ID');

        const response = await axios.get(`${apiUrl}/bookings/space/${spaceId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log('Fetch bookings response:', response.data); // Debug
        const bookingsData = response.data?.data || [];
        setBookings(bookingsData);

        if (bookingsData.length === 0) {
          toast.info('No bookings found for this space');
        }
      } catch (err) {
        console.error('Error fetching bookings:', err);
        const errorMessage = err.response?.data?.error?.message || err.message || 'Failed to load bookings';
        setError(errorMessage);
        if (errorMessage.includes('Only space owner')) {
          toast.error('You do not have permission to view these bookings. Please ensure you own this space.');
        } else {
          toast.error(errorMessage);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user, spaceId]);

  const handleUpdateStatus = async (bookingId, status) => {
    try {
      console.log('Updating booking:', bookingId, 'Status:', status); // Debug
      const response = await axios.put(
        `${apiUrl}/bookings/${bookingId}`,
        { status },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );

      setBookings(
        bookings.map((booking) =>
          booking._id === bookingId ? { ...booking, status: response.data.data.status } : booking
        )
      );
      toast.success(`Booking ${status} successfully`);
    } catch (err) {
      console.error(`Error updating booking status:`, err);
      toast.error(err.response?.data?.error?.message || `Failed to ${status} booking`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-600 text-center">{error}</p>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4 text-blue-600">Manage Bookings</h3>

      {bookings.length === 0 ? (
        <p className="text-gray-500 text-center">No bookings for this space</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="py-3 px-4 text-left">Renter</th>
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
                  <td className="py-3 px-4">{booking.userId?.name || 'Unknown User'}</td>
                  <td className="py-3 px-4">{new Date(booking.startDate).toLocaleString()}</td>
                  <td className="py-3 px-4">{new Date(booking.endDate).toLocaleString()}</td>
                  <td className="py-3 px-4 capitalize">{booking.status}</td>
                  <td className="py-3 px-4">₹{booking.totalPrice?.toLocaleString() || 'N/A'}</td>
                  <td className="py-3 px-4">
                    {booking.status === 'pending' && (
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUpdateStatus(booking._id, 'confirmed')}
                          className="text-green-600 hover:text-green-800"
                        >
                          <CheckCircle size={16} className="mr-1" />
                          Approve
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUpdateStatus(booking._id, 'rejected')}
                          className="text-red-600 hover:text-red-800"
                        >
                          <XCircle size={16} className="mr-1" />
                          Reject
                        </Button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default OwnerBookings;