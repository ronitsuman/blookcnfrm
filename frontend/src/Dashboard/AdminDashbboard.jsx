import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';
import { api } from '../../utils/api';

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState({});
  const [pendingSpaces, setPendingSpaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const [metricsRes, spacesRes] = await Promise.all([
          api.get('/analytics/platform', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          api.get('/spaces/getallspaces?status=pending', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        // Log to debug structure
        console.log('Metrics:', metricsRes.data);
        console.log('Pending Spaces:', spacesRes.data);

        setMetrics(metricsRes.data);

        const extractedSpaces = Array.isArray(spacesRes.data)
          ? spacesRes.data
          : Array.isArray(spacesRes.data.spaces)
          ? spacesRes.data.spaces
          : [];

        setPendingSpaces(extractedSpaces);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        toast.error('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleApproveSpace = async (spaceId) => {
    try {
      const token = localStorage.getItem('token');
      await api.patch(
        `/admin/spaces/${spaceId}/approve`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Space approved');
      setPendingSpaces((prev) => prev.filter((space) => space._id !== spaceId));
    } catch (err) {
      console.error('Error approving space:', err);
      toast.error('Failed to approve space');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

        <h3 className="text-xl mb-2">Platform Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-white p-4 rounded shadow">
            <p>Total Users: {metrics.totalUsers ?? 'N/A'}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <p>Total Spaces: {metrics.totalSpaces ?? 'N/A'}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <p>Total Bookings: {metrics.totalBookings ?? 'N/A'}</p>
          </div>
        </div>

        <h3 className="text-xl mb-2">Pending Spaces</h3>
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border p-2">Business Name</th>
              <th className="border p-2">City</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingSpaces.length > 0 ? (
              pendingSpaces.map((space) => (
                <tr key={space._id}>
                  <td className="border p-2">{space.businessName}</td>
                  <td className="border p-2">{space.city}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleApproveSpace(space._id)}
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      Approve
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center p-2 border">
                  No pending spaces found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
