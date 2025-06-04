// import { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// import OwnerBookings from '../components/OwnerBooking';

// const SpaceownerDashboard = () => {
//   const { user } = useSelector((state) => state.user);
//   const navigate = useNavigate();
//   const [spaces, setSpaces] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const apiUrl =  'http://localhost:5000/api' ;

//   useEffect(() => {
//     if (!user || user.role !== 'space_owner') {
//       toast.error('Please login as a space owner');
//       navigate('/login');
//       return;
//     }

//     const fetchSpaces = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const response = await axios.get(`${apiUrl}/spaces`, {
//           headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//         });

//         setSpaces(response.data.data || []);
//       } catch (err) {
//         console.error('Error fetching spaces:', err);
//         setError(err.response?.data?.error?.message || 'Failed to load spaces');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSpaces();
//   }, [user, navigate]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-lg text-red-600">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       <Navbar />
//       <main className="flex-grow container mx-auto px-4 py-8">
//         <h1 className="text-3xl font-bold mb-6 text-black">Space Owner Dashboard</h1>

//         <h2 className="text-2xl font-semibold mb-4">Your Spaces</h2>
//         {spaces.length === 0 ? (
//           <p className="text-gray-500">No spaces found. Add a space to get started.</p>
//         ) : (
//           <div className="space-y-8">
//             {spaces.map((space) => (
//               <div key={space._id} className="bg-white rounded-lg shadow-md p-6">
//                 <h3 className="text-xl font-semibold mb-2">{space.name}</h3>
//                 <p className="text-gray-600 mb-4">{space.city}, {space.type}</p>
//                 <OwnerBookings spaceId={space._id} />
//               </div>
//             ))}
//           </div>
//         )}
//       </main>
//       <Footer />
//       <ToastContainer position="bottom-right" autoClose={3000} />
//     </div>
//   );
// };

// export default SpaceownerDashboard;

// import { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// import OwnerBookings from '../components/OwnerBooking'; // Corrected import

// const SpaceownerDashboard = () => {
//   const { user } = useSelector((state) => state.user);
//   const navigate = useNavigate();
//   const [spaces, setSpaces] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const apiUrl =  'http://localhost:5000/api';

//   useEffect(() => {
//     console.log('User state:', user); // Debug: Check user state
//     if (!user) {
//       toast.error('Please login to access dashboard');
//       navigate('/login');
//       return;
//     }
//     if (user.role !== 'space_owner') {
//       toast.error('Access restricted to space owners');
//       navigate('/');
//       return;
//     }

//     const fetchSpaces = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const token = localStorage.getItem('token');
//         console.log('Token:', token); // Debug: Check token
//         if (!token) throw new Error('No authentication token found');

//         const response = await axios.get(`${apiUrl}/spaces/owner`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         console.log('Fetch spaces response:', response.data); // Debug: Check response
//         const spaces = response.data.data || [];
//         setSpaces(spaces);

//         if (spaces.length === 0) {
//           toast.info('No spaces found. Add a space to get started.');
//         }
//       } catch (err) {
//         console.error('Error fetching spaces:', err);
//         const errorMessage = err.response?.data?.error?.message || err.message || 'Failed to load spaces';
//         setError(errorMessage);
//         toast.error(errorMessage);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSpaces();
//   }, [user, navigate]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-lg text-red-600">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       <Navbar />
      
//       <main className="flex-grow container mx-auto px-4 py-8">
//       <div>
//         <button className='border p-4 rounded-2xl bg-blue-400 ' onClick={()=>navigate('/analytics')}>Analytics dashboard </button>
//       </div>
//         <h1 className="text-3xl font-bold mb-6 text-blue-600">Space Owner Dashboard</h1>

//         <h2 className="text-2xl font-semibold mb-4 text-black">Your Spaces</h2>
//         {spaces.length === 0 ? (
//           <div className="text-center">
//             <p className="text-gray-500 mb-4">No spaces found. Add a space to get started.</p>
//             <Button
//               className="bg-[#4261FF] hover:bg-[#6D4EFF] text-white"
//               onClick={() => navigate('/registration')}
//             >
//               Add Space
//             </Button>
//           </div>
//         ) : (
//           <div className="space-y-8">
//             {spaces.map((space) => (
//               <div key={space._id} className="bg-white rounded-lg shadow-md p-6">
//                 <h3 className="text-xl font-semibold mb-2 text-black">{space.name}</h3>
//                 <p className="text-gray-600 mb-4">{space.city}, {space.type}</p>
//                 <OwnerBookings spaceId={space._id} />
//               </div>
//             ))}
//           </div>
//         )}
//       </main>
//       <Footer />
//       <ToastContainer position="bottom-right" autoClose={3000} />
//     </div>
//   );
// };

// export default SpaceownerDashboard;



// import { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// import OwnerBookings from '../components/OwnerBooking';
// import { Button } from '../components/ui/Button';

// const SpaceOwnerDashboard = () => {
//   const { user } = useSelector((state) => state.user);
//   const navigate = useNavigate();
//   const [spaces, setSpaces] = useState([]);
//   const [subscription, setSubscription] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const apiUrl = 'http://localhost:5000/api';

//   useEffect(() => {
//     console.log('User state:', user); // Debug
//     if (!user) {
//       toast.error('Please login to access dashboard');
//       navigate('/login');
//       return;
//     }
//     if (user.role !== 'space_owner') {
//       toast.error('Access restricted to space owners');
//       navigate('/');
//       return;
//     }

//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const token = localStorage.getItem('token');
//         console.log('Token:', token); // Debug
//         if (!token) throw new Error('No authentication token found');

//         // Fetch spaces
//         const spaceResponse = await axios.get(`${apiUrl}/spaces/owner`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         console.log('Fetch spaces response:', spaceResponse.data); // Debug
//         const spaces = spaceResponse.data.data || [];
//         setSpaces(spaces);

//         if (spaces.length === 0) {
//           toast.info('No spaces found. Add a space to get started.');
//         }

//         // Fetch subscription
//         const subscriptionResponse = await axios.get(`${apiUrl}/subscriptions`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         console.log('Fetch subscription response:', subscriptionResponse.data); // Debug
//         const activeSubscription = subscriptionResponse.data.data.find(sub => sub.status === 'active');
//         setSubscription(activeSubscription || { planType: 'free', features: ['Up to 3 zone listings'] });
//       } catch (err) {
//         console.error('Error fetching data:', err);
//         const errorMessage = err.response?.data?.error?.message || err.message || 'Failed to load data';
//         setError(errorMessage);
//         toast.error(errorMessage);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [user, navigate]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-lg text-red-600">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       <Navbar />
//       <main className="flex-grow container mx-auto px-4 py-8">
//         <h1 className="text-3xl font-bold mb-6 text-blue-800">Space Owner Dashboard</h1>

//         {/* Subscription Section */}
//         <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//           <h2 className="text-2xl font-semibold mb-4 text-navy-800">Subscription Status</h2>
//           <div className="flex items-center mb-4">
//             <span
//               className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
//                 subscription?.planType === 'paid' ? 'bg-teal-100 text-teal-800' : 'bg-gray-100 text-gray-800'
//               }`}
//             >
//               {subscription?.planType === 'paid' ? 'Premium' : 'Free'}
//             </span>
//           </div>
//           <p className="text-gray-600 mb-2">
//             Plan Type: <span className="font-semibold">{subscription?.planType === 'paid' ? 'Premium' : 'Free'}</span>
//           </p>
//           {subscription?.startDate && (
//             <p className="text-gray-600 mb-2">
//               Start Date: <span className="font-semibold">{new Date(subscription.startDate).toLocaleDateString()}</span>
//             </p>
//           )}
//           {subscription?.endDate && (
//             <p className="text-gray-600 mb-2">
//               End Date: <span className="font-semibold">{new Date(subscription.endDate).toLocaleDateString()}</span>
//             </p>
//           )}
//           <p className="text-gray-600 mb-4">
//             Features: <span className="font-semibold">{subscription?.features?.join(', ')}</span>
//           </p>
//           <Button
//             className="bg-orange-500 hover:bg-orange-600 text-white"
//             onClick={() => navigate('/subscriptions')}
//           >
//             {subscription?.planType === 'paid' ? 'Manage Subscription' : 'Upgrade to Premium'}
//           </Button>
//         </div>

//         {/* Analytics Button */}
//         <div className="mb-8">
//           <Button
//             className="border p-4 rounded-2xl bg-blue-400 text-white"
//             onClick={() => navigate('/analytics')}
//           >
//             Analytics Dashboard
//           </Button>
//         </div>

//         {/* Spaces Section */}
//         <h2 className="text-2xl font-semibold mb-4 text-navy-800">Your Spaces</h2>
//         {spaces.length === 0 ? (
//           <div className="text-center">
//             <p className="text-gray-600 mb-4">No spaces found. Add a space to get started.</p>
//             <Button
//               className="bg-[#4261FF] hover:bg-[#6D4EFF] text-white"
//               onClick={() => navigate('/registration')}
//             >
//               Add Space
//             </Button>
//           </div>
//         ) : (
//           <div className="space-y-8">
//             {spaces.map((space) => (
//               <div key={space._id} className="bg-white rounded-lg shadow-md p-6">
//                 <h3 className="text-xl font-semibold mb-2 text-navy-800">{space.name}</h3>
//                 <p className="text-gray-600 mb-4">{space.city}, {space.type}</p>
//                 <OwnerBookings spaceId={space._id} />
//               </div>
//             ))}
//           </div>
//         )}
//       </main>
//       <Footer />
//       <ToastContainer position="bottom-right" autoClose={3000} />
//     </div>
//   );
// };

// export default SpaceOwnerDashboard;



import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import OwnerBookings from '../components/OwnerBooking';
import { Button } from '../components/ui/Button';

const SpaceOwnerDashboard = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [spaces, setSpaces] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl =  'http://localhost:5000/api';

  useEffect(() => {
    console.log('User state:', user); // Debug
    if (!user) {
      toast.error('Please login to access dashboard');
      navigate('/login');
      return;
    }
    if (user.role !== 'space_owner') {
      toast.error('Access restricted to space owners');
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

        // Fetch spaces
        const spaceResponse = await axios.get(`${apiUrl}/spaces/owner`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Fetch spaces response:', spaceResponse.data); // Debug
        const spaces = spaceResponse.data.data || [];
        setSpaces(spaces);

        if (spaces.length === 0) {
          toast.info('No spaces found. Add a space to get started.');
        }

        // Fetch subscription
        const subscriptionResponse = await axios.get(`${apiUrl}/subscriptions`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Fetch subscription response:', subscriptionResponse.data); // Debug
        const activeSubscription = subscriptionResponse.data.data.find(sub => sub.status === 'active');
        setSubscription(activeSubscription || { planType: 'free', features: ['Up to 3 zone listings'] });
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
        <h1 className="text-3xl font-bold mb-6 text-blue-800">Space Owner Dashboard</h1>

        {/* Subscription Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-navy-800">Subscription Status</h2>
          <div className="flex items-center mb-4">
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                subscription?.planType === 'paid' ? 'bg-teal-100 text-teal-800' : 'bg-gray-100 text-gray-800'
              }`}
            >
              {subscription?.planType === 'paid' ? 'Premium' : 'Free'}
            </span>
          </div>
          <p className="text-gray-600 mb-2">
            Plan Type: <span className="font-semibold">{subscription?.planType === 'paid' ? 'Premium' : 'Free'}</span>
          </p>
          {subscription?.startDate && (
            <p className="text-gray-600 mb-2">
              Start Date: <span className="font-semibold">{new Date(subscription.startDate).toLocaleDateString()}</span>
            </p>
          )}
          {subscription?.endDate && (
            <p className="text-gray-600 mb-2">
              End Date: <span className="font-semibold">{new Date(subscription.endDate).toLocaleDateString()}</span>
            </p>
          )}
          <p className="text-gray-600 mb-4">
            Features: <span className="font-semibold">{subscription?.features?.join(', ')}</span>
          </p>
          <Button
            className="bg-orange-500 hover:bg-orange-600 text-white"
            onClick={() => navigate('/subscriptions')}
          >
            {subscription?.planType === 'paid' ? 'Manage Subscription' : 'Upgrade to Premium'}
          </Button>
        </div>

        {/* Analytics Button */}
        <div className="mb-8">
          <Button
            className="border p-4 rounded-2xl bg-blue-400 text-white"
            onClick={() => navigate('/analytics')}
          >
            Analytics Dashboard
          </Button>
        </div>

        {/* Spaces Section */}
        <h2 className="text-2xl font-semibold mb-4 text-navy-800">Your Spaces</h2>
        {spaces.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600 mb-4">No spaces found. Add a space to get started.</p>
            <Button
              className="bg-[#4261FF] hover:bg-[#6D4EFF] text-white"
              onClick={() => navigate('/registration')}
            >
              Add Space
            </Button>
          </div>
        ) : (
          <div className="space-y-8">
            {spaces.map((space) => (
              <div key={space._id} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-2 text-navy-800">{space.name}</h3>
                <p className="text-gray-600 mb-4">{space.city}, {space.type}</p>
                <OwnerBookings spaceId={space._id} />
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

export default SpaceOwnerDashboard;