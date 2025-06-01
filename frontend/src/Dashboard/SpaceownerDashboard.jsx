// frontend/src/pages/SpaceOwnerDashboard.jsx
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';
import { api } from '../../utils/api';
import { MapPin, Star } from 'lucide-react';

export default function SpaceOwnerDashboard() {
  const [spaces, setSpaces] = useState([]);
  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useSelector((state) => state.user);
  const token = localStorage.getItem('token') || (user && user.token);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        toast.error('No authentication token found. Please log in again.');
        setLoading(false);
        return;
      }

      try {
        const [spacesRes, analyticsRes] = await Promise.all([
          api.get('http://localhost:5000/api/spaces/getallspaces', { headers: { Authorization: `Bearer ${token}` } }),
          api.get('http://localhost:5000/api/analytics/space', { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        console.log('Spaces Response:', spacesRes.data);
        console.log('Analytics Response:', analyticsRes.data);

        // Check if response is HTML (indicating an error)
        if (typeof spacesRes.data === 'string' && spacesRes.data.includes('<!doctype html')) {
          throw new Error('Invalid response from /spaces/getallspaces: Received HTML instead of JSON');
        }
        if (typeof analyticsRes.data === 'string' && analyticsRes.data.includes('<!doctype html')) {
          throw new Error('Invalid response from /analytics/space: Received HTML instead of JSON');
        }

        const spacesData = Array.isArray(spacesRes.data)
          ? spacesRes.data
          : Array.isArray(spacesRes.data.data)
          ? spacesRes.data.data
          : [];

        const analyticsData = Array.isArray(analyticsRes.data)
          ? analyticsRes.data
          : Array.isArray(analyticsRes.data.data)
          ? analyticsRes.data.data
          : [];

        setSpaces(spacesData);
        setAnalytics(analyticsData);
      } catch (err) {
        console.error('Data fetch error:', err.message);
        toast.error(err.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Space Owner Dashboard</h2>

        {/* Spaces Section */}
        <h3 className="text-xl font-semibold mb-2">Your Spaces</h3>
        {spaces.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {spaces.map((space) => (
              <div
                key={space._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer h-full"
              >
                {space.listingType === 'premium' && (
                  <div className="absolute top-2 left-2 bg-yellow-400 text-black px-2 py-1 rounded-md flex items-center text-xs font-bold z-10">
                    <Star size={12} className="mr-1 fill-black" />
                    PREMIUM
                  </div>
                )}

                <div className="h-48 overflow-hidden">
                  <img
                    src={space.photos && space.photos.length > 0 ? space.photos[0] : '/placeholder-space.jpg'}
                    alt={space.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/placeholder-space.jpg';
                    }}
                  />
                </div>

                <div className="p-4">
                  <h4 className="font-bold text-lg mb-1">{space.name}</h4>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin size={16} className="mr-1" />
                    <span>{space.address}, {space.city}, {space.pincode}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-2 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Type:</span> {space.type}
                    </div>
                    <div>
                      <span className="font-medium">Price:</span> ₹{space.price?.toLocaleString() || 'N/A'}
                    </div>
                    <div>
                      <span className="font-medium">Status:</span> {space.status}
                    </div>
                    {space.weekdayFootfall && (
                      <div>
                        <span className="font-medium">Weekday Footfall:</span> {space.weekdayFootfall}
                      </div>
                    )}
                    {space.weekendFootfall && (
                      <div>
                        <span className="font-medium">Weekend Footfall:</span> {space.weekendFootfall}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs text-blue-800">
                    {space.hasCCTV === 'yes' && (
                      <span className="bg-blue-100 px-2 py-1 rounded-full">CCTV</span>
                    )}
                    {space.heatMapping === 'yes' && (
                      <span className="bg-blue-100 px-2 py-1 rounded-full">Heat Mapping</span>
                    )}
                    {space.brandingAreaSize && (
                      <span className="bg-blue-100 px-2 py-1 rounded-full">
                        {space.brandingAreaSize} Branding Area
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 mb-8">No spaces found.</p>
        )}

        {/* Footfall Analytics Section */}
        <h3 className="text-xl font-semibold mb-2">Footfall Analytics</h3>
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border p-2">Space Name</th>
              <th className="border p-2">City</th>
              <th className="border p-2">Campaign Title</th>
              <th className="border p-2">Weekday Footfall</th>
              <th className="border p-2">Weekend Footfall</th>
              <th className="border p-2">Impressions</th>
              <th className="border p-2">Clicks</th>
              <th className="border p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {analytics.length > 0 ? (
              analytics.map((data) => (
                <tr key={data.spaceId}>
                  <td className="border p-2">{data.space?.name ?? 'N/A'}</td>
                  <td className="border p-2">{data.space?.city ?? 'N/A'}</td>
                  <td className="border p-2">{data.campaignTitle ?? 'N/A'}</td>
                  <td className="border p-2">{data.space?.weekdayFootfall ?? 'N/A'}</td>
                  <td className="border p-2">{data.space?.weekendFootfall ?? 'N/A'}</td>
                  <td className="border p-2">{data.impressions ?? 'N/A'}</td>
                  <td className="border p-2">{data.clicks ?? 'N/A'}</td>
                  <td className="border p-2">{new Date(data.date).toLocaleDateString() ?? 'N/A'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="border p-2 text-center" colSpan="8">No analytics data found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}