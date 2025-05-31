import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';
import { api } from '../../utils/api';

export default function BrandDashboard() {
  const [campaigns, setCampaigns] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const [campaignsRes, bookingsRes] = await Promise.all([
          api.get('/campaigns', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          api.get('/bookings', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        console.log('Campaigns response:', campaignsRes.data);
        console.log('Bookings response:', bookingsRes.data);

        const safeCampaigns = Array.isArray(campaignsRes.data)
          ? campaignsRes.data
          : Array.isArray(campaignsRes.data.campaigns)
          ? campaignsRes.data.campaigns
          : [];

        const safeBookings = Array.isArray(bookingsRes.data)
          ? bookingsRes.data
          : Array.isArray(bookingsRes.data.bookings)
          ? bookingsRes.data.bookings
          : [];

        setCampaigns(safeCampaigns);
        setBookings(safeBookings);
      } catch (err) {
        console.error('Fetch error:', err);
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
        <h2 className="text-2xl font-bold mb-4">Brand  Dashboard</h2>

        {/* Campaigns Table */}
        <h3 className="text-xl mb-2">Your Campaigns</h3>
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(campaigns) && campaigns.length > 0 ? (
              campaigns.map((campaign) => (
                <tr key={campaign._id}>
                  <td className="border p-2">{campaign.name}</td>
                  <td className="border p-2">{campaign.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center p-2">
                  No campaigns available.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Bookings Table */}
        <h3 className="text-xl mt-4 mb-2">Your Bookings</h3>
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border p-2">Space</th>
              <th className="border p-2">Start Date</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(bookings) && bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr key={booking._id}>
                  <td className="border p-2">
                    {booking.spaceId?.businessName || 'N/A'}
                  </td>
                  <td className="border p-2">
                    {new Date(booking.startDate).toLocaleDateString()}
                  </td>
                  <td className="border p-2">{booking.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center p-2">
                  No bookings available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
