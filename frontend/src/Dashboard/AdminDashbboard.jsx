// frontend/src/pages/AdminPanel.jsx
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '../components/ui/Button';

const AdminPanel = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const apiUrl = import.meta.env.VITE_API_URL;

  const [pendingSpaces, setPendingSpaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, pages: 0, limit: 10 });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login', { replace: true });
      toast.error('Only admins can access this page');
      return;
    }

    if (location.pathname !== '/admin-dashboard') {
      navigate('/admin-dashboard', { replace: true });
    }

    const fetchPendingSpaces = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${apiUrl}/spaces/pending?page=${page}&limit=${pagination.limit}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Fetched pending spaces:', response.data.data.spaces);
        const spaces = response.data.data.spaces || []; // Ensure spaces is always an array
        setPendingSpaces(spaces);
        setPagination(response.data.data.pagination || { total: 0, pages: 0, limit: 10 });
      } catch (error) {
        console.error('Error fetching pending spaces:', error.response?.data);
        toast.error(error.response?.data?.error?.message || 'Failed to fetch pending spaces');
        setPendingSpaces([]); // Reset on error
      } finally {
        setLoading(false);
      }
    };

    fetchPendingSpaces();
  }, [user, navigate, location, page, pagination.limit]);

  const handleManageSpace = async (spaceId, action) => {
    try {
      console.log('Managing space with ID:', spaceId, 'Action:', action);
      if (!spaceId || !/^[0-9a-fA-F]{24}$/.test(spaceId)) {
        throw new Error('Invalid space ID format');
      }

      const token = localStorage.getItem('token');
      await axios.post(
        `${apiUrl}/spaces/manage-status`,
        { spaceId, action },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`Space ${action}ed successfully`);
      setPendingSpaces(pendingSpaces.filter((space) => space._id !== spaceId));
    } catch (error) {
      console.error(`Error managing space:`, error.message);
      toast.error(error.message || `Failed to ${action} space`);
    }
  };

  const handlePageChange = (newPage) => {
    console.log('Changing page to:', newPage);
    if (newPage > 0 && newPage <= pagination.pages) {
      setPage(newPage);
      navigate(`/admin-dashboard?page=${newPage}`, { replace: true });
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
    navigate(`/admin-dashboard?page=1`, { replace: true });
  };

  const filteredSpaces = pendingSpaces.filter(
    (space) =>
      space.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      space.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      space.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow text-black placeholder:text-black">
          <section className="bg-gradient-to-r from-white to-[#D9D9F3] py-16">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl font-bold mb-4">Admin Panel - Pending Spaces</h1>
              <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                Review and approve or reject pending spaces submitted by space owners.
              </p>
            </div>
          </section>

          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Search spaces by name, city, or address..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
                />
              </div>
              {loading ? (
                <p className="text-center text-gray-600">Loading...</p>
              ) : filteredSpaces.length === 0 ? (
                <p className="text-center text-gray-600">No pending spaces to review.</p>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredSpaces.map((space) => (
                      <div key={space._id} className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-xl font-bold mb-2">{space.name}</h3>
                        <p className="text-gray-600 mb-1"><strong>Type:</strong> {space.type}</p>
                        <p className="text-gray-600 mb-1"><strong>Manager:</strong> {space.managerName}</p>
                        <p className="text-gray-600 mb-1"><strong>Phone:</strong> {space.phone}</p>
                        <p className="text-gray-600 mb-1"><strong>Address:</strong> {space.address}, {space.city}, {space.pincode}</p>
                        <p className="text-gray-600 mb-1"><strong>Price:</strong> ₹{space.price}</p>
                        <p className="text-gray-600 mb-3"><strong>Listing Type:</strong> {space.listingType}</p>
                        {space.photos && space.photos.length > 0 && (
                          <img
                            src={space.photos[0]}
                            alt={`${space.name} photo`}
                            className="w-full h-48 object-cover rounded mb-3"
                          />
                        )}
                        <div className="flex justify-between">
                          <Button
                            onClick={() => handleManageSpace(space._id, 'approve')}
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                          >
                            Approve
                          </Button>
                          <Button
                            onClick={() => handleManageSpace(space._id, 'reject')}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                          >
                            Reject
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center mt-6">
                    <Button
                      onClick={() => handlePageChange(page - 1)}
                      disabled={page === 1}
                      className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded mx-2"
                    >
                      Previous
                    </Button>
                    <span className="px-4 py-2">
                      Page {page} of {pagination.pages}
                    </span>
                    <Button
                      onClick={() => handlePageChange(page + 1)}
                      disabled={page === pagination.pages}
                      className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded mx-2"
                    >
                      Next
                    </Button>
                  </div>
                </>
              )}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default AdminPanel;