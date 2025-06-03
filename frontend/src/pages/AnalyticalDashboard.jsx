import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BookingChart from '../components/BookingChart';

const AnalyticsDashboard = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl =  'http://localhost:5000/api';

  useEffect(() => {
    if (!user) {
      toast.error('Please login to view analytics');
      navigate('/login');
      return;
    }

    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log('Fetching analytics for userId:', user.id, 'role:', user.role); // Debug

        // Add default date range (e.g., last 30 days)
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - 30);

        const response = await axios.get(`${apiUrl}/analytics/bookings`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          params: {
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
          },
        });

        console.log('Analytics response:', response.data); // Debug
        setAnalytics(response.data.data || []);
      } catch (err) {
        console.error('Error fetching analytics:', err);
        setError(err.response?.data?.error?.message || 'Failed to load analytics');
      } finally {
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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-black">Analytics Dashboard</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Booking Analytics</h2>
          <BookingChart analytics={analytics} />
        </div>
      </main>
      <Footer />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default AnalyticsDashboard;