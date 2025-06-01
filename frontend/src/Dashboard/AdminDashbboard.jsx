// frontend/src/pages/AdminDashboard.jsx
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '../components/ui/Button';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const apiUrl = import.meta.env.VITE_API_URL;

  const [pendingSpaces, setPendingSpaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(() => {
    const params = new URLSearchParams(location.search);
    return parseInt(params.get('page')) || 1;
  });
  const [pagination, setPagination] = useState({ total: 0, pages: 0, limit: 10 });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState([]);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login', { replace: true });
      toast.error('Only admins can access this page');
      return;
    }

    if (location.pathname !== '/admin-dashboard') {
      navigate(`/admin-dashboard?page=${page}`, { replace: true });
    }

    const fetchPendingSpaces = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${apiUrl}/spaces/pending?page=${page}&limit=${pagination.limit}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Fetched pending spaces in frontend:', response.data.data.spaces);
        const spaces = response.data.data.spaces || [];
        spaces.forEach(space => {
          console.log('Space ID:', space._id, 'Name:', space.name);
        });
        setPendingSpaces(spaces);
        setPagination(response.data.data.pagination || { total: 0, pages: 0, limit: 10 });
      } catch (error) {
        console.error('Error fetching pending spaces:', error.response?.data);
        toast.error(error.response?.data?.error?.message || 'Failed to fetch pending spaces');
        setPendingSpaces([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingSpaces();
  }, [user, navigate, location.pathname, page, pagination.limit]);

  const handleManageSpace = async (spaceId, action) => {
    try {
      console.log('Managing space with ID:', spaceId, 'Action:', action);
      if (!spaceId || !/^[0-9a-fA-F]{24}$/.test(spaceId)) {
        throw new Error('Invalid space ID format');
      }

      const token = localStorage.getItem('token');
      await axios.patch(
        `${apiUrl}/spaces/manage-status`,
        { spaceId, action },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`Space ${action}ed successfully`);
      setPendingSpaces(pendingSpaces.filter((space) => space._id !== spaceId));
      setSelectedSpace(null);
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

  const openFullScreen = (photos, index) => {
    setSelectedPhotos(photos);
    setCurrentImageIndex(index);
    setIsFullScreen(true);
  };

  const closeFullScreen = () => {
    setIsFullScreen(false);
    setSelectedPhotos([]);
    setCurrentImageIndex(0);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? selectedPhotos.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === selectedPhotos.length - 1 ? 0 : prevIndex + 1
    );
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
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Left Section: List of Pending Spaces */}
                  <div className="md:w-1/2">
                    <h2 className="text-2xl font-bold mb-4">Pending Spaces</h2>
                    <div className="grid grid-cols-1 gap-4">
                      {filteredSpaces.map((space) => (
                        <div
                          key={space._id}
                          className={`bg-white rounded-lg shadow-md p-4 cursor-pointer ${
                            selectedSpace && selectedSpace._id === space._id ? 'border-2 border-blue-500' : ''
                          }`}
                          onClick={() => setSelectedSpace(space)}
                        >
                          <h3 className="text-lg font-bold">{space.name}</h3>
                          <p className="text-gray-600"><strong>Type:</strong> {space.type}</p>
                          <p className="text-gray-600"><strong>City:</strong> {space.city}</p>
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
                  </div>

                  {/* Right Section: Selected Space Details and Actions */}
                  <div className="md:w-1/2">
                    {selectedSpace ? (
                      <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-bold mb-4">{selectedSpace.name}</h2>
                        <p className="text-gray-600 mb-1"><strong>Type:</strong> {selectedSpace.type}</p>
                        <p className="text-gray-600 mb-1"><strong>Manager:</strong> {selectedSpace.managerName}</p>
                        <p className="text-gray-600 mb-1"><strong>Phone:</strong> {selectedSpace.phone}</p>
                        <p className="text-gray-600 mb-1"><strong>Address:</strong> {selectedSpace.address}, {selectedSpace.city}, {selectedSpace.pincode}</p>
                        <p className="text-gray-600 mb-1"><strong>Price:</strong> ₹{selectedSpace.price}</p>
                        <p className="text-gray-600 mb-3"><strong>Listing Type:</strong> {selectedSpace.listingType}</p>
                        {selectedSpace.photos && selectedSpace.photos.length > 0 ? (
                          <div className="flex gap-2 mb-3">
                            {selectedSpace.photos.map((photo, index) => (
                              <img
                                key={index}
                                src={photo}
                                alt={`${selectedSpace.name} photo ${index + 1}`}
                                className="w-16 h-16 object-cover rounded cursor-pointer"
                                onClick={() => openFullScreen(selectedSpace.photos, index)}
                                onError={(e) => {
                                  e.target.src = '/placeholder-space.jpg';
                                }}
                              />
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-600 mb-3">No photos available</p>
                        )}
                        <div className="flex justify-between">
                          <Button
                            onClick={() => handleManageSpace(selectedSpace._id, 'approve')}
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                          >
                            Approve
                          </Button>
                          <Button
                            onClick={() => handleManageSpace(selectedSpace._id, 'reject')}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                          >
                            Reject
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-center text-gray-600">Select a space to view details and take action.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Full-Screen Image Modal */}
          {isFullScreen && selectedPhotos.length > 0 && (
            <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
              <button
                onClick={closeFullScreen}
                className="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-gray-700 transition"
              >
                <X size={24} />
              </button>
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full hover:bg-gray-700 transition"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full hover:bg-gray-700 transition"
              >
                <ChevronRight size={24} />
              </button>
              <img
                src={selectedPhotos[currentImageIndex]}
                alt={`Space Image ${currentImageIndex + 1}`}
                className="max-w-full max-h-full object-contain"
              />
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {selectedPhotos.length}
              </div>
            </div>
          )}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default AdminDashboard;