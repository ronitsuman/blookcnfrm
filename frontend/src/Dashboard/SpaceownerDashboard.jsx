import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';
import { api } from '../../utils/api';

export default function SpaceOwnerDashboard() {
  const [spaces, setSpaces] = useState([]);
  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const [spacesRes, analyticsRes] = await Promise.all([
          api.get('/spaces/getallspaces', { headers: { Authorization: `Bearer ${token}` } }),
          api.get('/analytics/space', { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        // Log response to check actual structure
        console.log('Spaces Response:', spacesRes.data);
        console.log('Analytics Response:', analyticsRes.data);

        // Handle potential variations in API structure
        const spacesData = Array.isArray(spacesRes.data)
          ? spacesRes.data
          : Array.isArray(spacesRes.data.spaces)
          ? spacesRes.data.spaces
          : [];

        const analyticsData = Array.isArray(analyticsRes.data)
          ? analyticsRes.data
          : Array.isArray(analyticsRes.data.analytics)
          ? analyticsRes.data.analytics
          : [];

        setSpaces(spacesData);
        setAnalytics(analyticsData);
      } catch (err) {
        console.error('Data fetch error:', err);
        toast.error('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Space Owner Dashboard</h2>

        <h3 className="text-xl mb-2">Your Spaces</h3>
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border p-2">Business Name</th>
              <th className="border p-2">City</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {spaces.length > 0 ? (
              spaces.map((space) => (
                <tr key={space._id}>
                  <td className="border p-2">{space.businessName}</td>
                  <td className="border p-2">{space.city}</td>
                  <td className="border p-2">{space.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="border p-2 text-center" colSpan="3">No spaces found.</td>
              </tr>
            )}
          </tbody>
        </table>

        <h3 className="text-xl mt-4 mb-2">Footfall Analytics</h3>
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border p-2">Business Name</th>
              <th className="border p-2">Weekday Footfall</th>
              <th className="border p-2">Weekend Footfall</th>
            </tr>
          </thead>
          <tbody>
            {analytics.length > 0 ? (
              analytics.map((data) => (
                <tr key={data.spaceId}>
                  <td className="border p-2">{data.businessName}</td>
                  <td className="border p-2">{data.footfall?.weekday ?? 'N/A'}</td>
                  <td className="border p-2">{data.footfall?.weekend ?? 'N/A'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="border p-2 text-center" colSpan="3">No analytics data found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
