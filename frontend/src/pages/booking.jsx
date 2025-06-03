import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';
import { api } from '../../utils/api';
import Razorpay from 'razorpay';

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get('/bookings', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(res.data);
        setLoading(false);
      } catch (err) {
        toast.error('Failed to fetch bookings');
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const handlePayment = async (booking) => {
    try {
      const token = localStorage.getItem('token');
      const res = await api.post('/payments/order', {
        bookingId: booking._id,
        amount: booking.amount,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: res.data.amount * 100,
        currency: res.data.currency,
        order_id: res.data.orderId,
        handler: async (response) => {
          try {
            await api.post('/payments/verify', {
              bookingId: booking._id,
              razorpay_payment_id: response.razorpay_payment_id,
            }, {
              headers: { Authorization: `Bearer ${token}` },
            });
            toast.success('Payment successful');
            setBookings(bookings.map((b) =>
              b._id === booking._id ? { ...b, status: 'confirmed', paymentDetails: { status: 'completed' } } : b
            ));
          } catch (err) {
            toast.error('Payment verification failed');
          }
        },
        theme: { color: '#1E90FF' },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      toast.error('Failed to initiate payment');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Your Bookings</h2>
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border p-2">Space</th>
              <th className="border p-2">Start Date</th>
              <th className="border p-2">End Date</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Payment</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 && (
              <tr>
                <td colSpan="7" className="border p-2 text-center">No bookings found</td>
              </tr>
            )}
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td className="border p-2">{booking.spaceId.businessName}</td>
                <td className="border p-2">{new Date(booking.startDate).toLocaleDateString()}</td>
                <td className="border p-2">{new Date(booking.endDate).toLocaleDateString()}</td>
                <td className="border p-2">₹{booking.amount}</td>
                <td className="border p-2">{booking.status}</td>
                <td className="border p-2">{booking.paymentDetails.status}</td>
                <td className="border p-2">
                  {booking.status === 'pending' && booking.paymentDetails.status === 'pending' && (
                    <button
                      onClick={() => handlePayment(booking)}
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                    >
                      Pay Now
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}