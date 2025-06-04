// import { useState, useEffect } from 'react';
// import { toast } from 'react-toastify';
// import Navbar from '../components/Navbar';
// import LoadingSpinner from '../components/LoadingSpinner';
// import { api } from '../../utils/api';

// export default function BlookforceAgentDashboard() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const res = await api.get('/auth/me', { headers: { Authorization: `Bearer ${token}` } });
//         setUser(res.data);
//         setLoading(false);
//       } catch (err) {
//         toast.error('Failed to fetch user data');
//         setLoading(false);
//       }
//     };
//     fetchUser();
//   }, []);

//   if (loading) return <LoadingSpinner />;

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Navbar />
//       <div className="container mx-auto p-4">
//         <h2 className="text-2xl font-bold mb-4">BlookForce Agent Dashboard</h2>
//         <div className="bg-white p-4 rounded shadow">
//           <h3 className="text-xl mb-2">Your Agent Code</h3>
//           <p className="text-lg">{user?.blookforceCode || 'Pending Approval'}</p>
//         </div>
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

const BLookforceAgentDashboard = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = process.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    console.log('User state:', user); // Debug
    if (!user) {
      toast.error('Please login to access dashboard');
      navigate('/login');
      return;
    }
    if (user.role !== 'blookforce_agent') {
      toast.error('Access restricted to BLookforce agents');
      navigate('/');
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem('token');
        console.log('Token:', token); // Debug
        if (!token) throw new Error('No authentication token found');

        // Fetch agent-assigned spaces
        const response = await axios.get(`${apiUrl}/spaces/agent`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Fetch spaces response:', response.data); // Debug
        setSpaces(response.data.data || []);

        if (response.data.data.length === 0) {
          toast.info('No spaces assigned. Contact admin for assignments.');
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        const errorMessage = err.response?.data?.error?.message || err.message || 'Failed to load data';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
        <h1 className="text-3xl font-bold mb-6 text-blue-800">BLookforce Agent Dashboard</h1>

        <h2 className="text-2xl font-semibold mb-4 text-navy-800">Assigned Spaces</h2>
        {spaces.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600 mb-4">No spaces assigned. Contact admin for assignments.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {spaces.map((space) => (
              <div key={space._id} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-2 text-navy-800">{space.name}</h3>
                <p className="text-gray-600 mb-4">{space.city}, {space.type}</p>
                <p className="text-gray-600">Status: {space.status}</p>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default BLookforceAgentDashboard;