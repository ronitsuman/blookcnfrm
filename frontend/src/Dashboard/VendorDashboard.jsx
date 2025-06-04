// import { useState, useEffect } from 'react';
// import { toast } from 'react-toastify';
// import Navbar from '../components/Navbar';
// import LoadingSpinner from '../components/LoadingSpinner';
// import { api } from '../../utils/api';

// export default function VendorDashboard() {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const res = await api.get('/jobs/available', {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         console.log('Jobs response:', res.data);

//         const extractedJobs = Array.isArray(res.data)
//           ? res.data
//           : Array.isArray(res.data.jobs)
//           ? res.data.jobs
//           : [];

//         setJobs(extractedJobs);
//       } catch (err) {
//         console.error('Fetch jobs error:', err);
//         toast.error('Failed to fetch jobs');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchJobs();
//   }, []);

//   const handleSubmitQuote = async (jobId, amount, timeline) => {
//     try {
//       const token = localStorage.getItem('token');
//       await api.post(
//         `/jobs/${jobId}/quotes`,
//         { amount, timeline },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       toast.success('Quote submitted');
//       setJobs((prev) =>
//         prev.map((job) =>
//           job._id === jobId ? { ...job, status: 'quoted' } : job
//         )
//       );
//     } catch (err) {
//       console.error('Submit quote error:', err);
//       toast.error('Failed to submit quote');
//     }
//   };

//   if (loading) return <LoadingSpinner />;

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Navbar />
//       <div className="container mx-auto p-4">
//         <h2 className="text-2xl font-bold mb-4">Vendor Dashboard</h2>
//         <h3 className="text-xl mb-2">Available Jobs</h3>
//         <table className="w-full border-collapse border">
//           <thead>
//             <tr>
//               <th className="border p-2">Description</th>
//               <th className="border p-2">Budget</th>
//               <th className="border p-2">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {jobs.length > 0 ? (
//               jobs.map((job) => (
//                 <tr key={job._id}>
//                   <td className="border p-2">{job.description}</td>
//                   <td className="border p-2">{job.budget}</td>
//                   <td className="border p-2">
//                     {job.status === 'pending' && (
//                       <button
//                         onClick={() => handleSubmitQuote(job._id, 5000, '7 days')}
//                         className="bg-blue-500 text-white px-2 py-1 rounded"
//                       >
//                         Submit Quote
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="3" className="text-center border p-2">
//                   No jobs available at the moment.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
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

const VendorDashboard = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
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
    if (user.role !== 'vendor') {
      toast.error('Access restricted to vendors');
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

        // Fetch vendor services
        const response = await axios.get(`${apiUrl}/services/vendor`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Fetch services response:', response.data); // Debug
        setServices(response.data.data || []);

        if (response.data.data.length === 0) {
          toast.info('No services found. Add a service to get started.');
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
        <h1 className="text-3xl font-bold mb-6 text-blue-800">Vendor Dashboard</h1>

        <h2 className="text-2xl font-semibold mb-4 text-navy-800">Your Services</h2>
        {services.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600 mb-4">No services found. Add a service to get started.</p>
            <Button
              className="bg-[#4261FF] hover:bg-[#6D4EFF] text-white"
              onClick={() => navigate('/add-service')}
            >
              Add Service
            </Button>
          </div>
        ) : (
          <div className="space-y-8">
            {services.map((service) => (
              <div key={service._id} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-2 text-navy-800">{service.name}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <p className="text-gray-600">Price: Rs.{service.price}</p>
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

export default VendorDashboard;