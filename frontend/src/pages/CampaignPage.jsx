// import { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// import { Button } from '../components/ui/Button';

// const CreateCampaign = () => {
//   const { user } = useSelector((state) => state.user);
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: '',
//     type: '',
//     description: '',
//     startDate: '',
//     endDate: '',
//     media: null,
//     spaceId: 'mock_space_id', // Mock spaceId for testing
//   });
//   const [loading, setLoading] = useState(false);
//   const apiUrl = 'http://localhost:5000/api';

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file && ['image/jpeg', 'image/png', 'video/mp4'].includes(file.type)) {
//       setFormData((prev) => ({ ...prev, media: file }));
//     } else {
//       toast.error('Only JPG, PNG, or MP4 files are allowed.');
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!user) {
//       toast.error('Please login to create a campaign');
//       navigate('/login');
//       return;
//     }

//     if (!formData.name || !formData.type || !formData.startDate || !formData.endDate) {
//       toast.error('Please fill all required fields');
//       return;
//     }

//     const start = new Date(formData.startDate);
//     const end = new Date(formData.endDate);
//     if (end <= start) {
//       toast.error('End date must be after start date');
//       return;
//     }

//     setLoading(true);

//     try {
//       const form = new FormData();
//       form.append('name', formData.name);
//       form.append('type', formData.type);
//       form.append('description', formData.description);
//       form.append('startDate', formData.startDate);
//       form.append('endDate', formData.endDate);
//       form.append('spaceId', formData.spaceId);
//       if (formData.media) {
//         form.append('media', formData.media);
//       }

//       const response = await axios.post(`${apiUrl}/campaigns`, form, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//           // Do NOT set Content-Type manually, axios will set it to multipart/form-data automatically
//         },
//       });

//       toast.success('Campaign created successfully!');
//       navigate(`/campaigns/summary/${response.data.data._id}`);
//     } catch (err) {
//       console.error('Error creating campaign:', err);
//       toast.error(err.response?.data?.error?.message || 'Failed to create campaign');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       <Navbar />
//       <main className="flex-grow container mx-auto px-4 py-8">
//         <h1 className="text-3xl font-bold mb-6 text-blue-800">Create Campaign</h1>
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Name *</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF]"
//                 placeholder="Enter campaign name"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Type *</label>
//               <select
//                 name="type"
//                 value={formData.type}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF]"
//               >
//                 <option value="">Select a type</option>
//                 <option value="scratch-card">Scratch Card</option>
//                 <option value="spin-the-wheel">Spin the Wheel</option>
//                 <option value="feedback-survey">Feedback Survey</option>
//                 <option value="instant-coupon">Instant Coupon</option>
//                 <option value="loyalty-points">Loyalty Points</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF]"
//                 rows={3}
//                 placeholder="Enter campaign description"
//               ></textarea>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
//                 <input
//                   type="date"
//                   name="startDate"
//                   value={formData.startDate}
//                   onChange={handleChange}
//                   required
//                   className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF]"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">End Date *</label>
//                 <input
//                   type="date"
//                   name="endDate"
//                   value={formData.endDate}
//                   onChange={handleChange}
//                   required
//                   className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF]"
//                 />
//               </div>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Upload Media (JPG/PNG/MP4)</label>
//               <input
//                 type="file"
//                 accept="image/jpeg,image/png,video/mp4"
//                 onChange={handleFileChange}
//                 className="w-full p-2 border border-gray-300 rounded-md"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Pricing</label>
//               <input
//                 type="text"
//                 value="₹500 (Mock Price)" // Mock pricing
//                 disabled
//                 className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
//               />
//             </div>
//             <Button
//               type="submit"
//               className="w-full bg-[#4261FF] hover:bg-[#6D4EFF] text-white"
//               disabled={loading}
//             >
//               {loading ? 'Processing...' : 'Review and Pay'}
//             </Button>
//           </form>
//         </div>
//       </main>
//       <Footer />
//       <ToastContainer position="bottom-right" autoClose={3000} />
//     </div>
//   );
// };

// export default CreateCampaign;

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '../components/ui/Button';
import Sidebar from '../components/Sidebar';

const CreateCampaign = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const { spaceId } = location.state || {}; // Get spaceId from Success.jsx

  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    startDate: '',
    endDate: '',
    media: null,
    spaceId: spaceId || '', // Use dynamic spaceId
  });
  const [loading, setLoading] = useState(false);
  const apiUrl = 'http://localhost:5000/api';

  useEffect(() => {
    if (!spaceId) {
      toast.error('No space selected. Please book a space first.');
      navigate('/'); // Redirect if no spaceId
    }
  }, [spaceId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && ['image/jpeg', 'image/png', 'video/mp4'].includes(file.type)) {
      setFormData((prev) => ({ ...prev, media: file }));
    } else {
      toast.error('Only JPG, PNG, or MP4 files are allowed.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to create a campaign');
      navigate('/login');
      return;
    }

    if (!formData.name || !formData.type || !formData.startDate || !formData.endDate || !formData.spaceId) {
      toast.error('Please fill all required fields');
      return;
    }

    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    if (end <= start) {
      toast.error('End date must be after start date');
      return;
    }

    setLoading(true);

    try {
      const form = new FormData();
      form.append('name', formData.name);
      form.append('type', formData.type);
      form.append('description', formData.description);
      form.append('startDate', formData.startDate);
      form.append('endDate', formData.endDate);
      form.append('spaceId', formData.spaceId);
      if (formData.media) {
        form.append('media', formData.media);
      }

      const response = await axios.post(`${apiUrl}/campaigns`, form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      toast.success('Campaign created successfully!');
      navigate(`/campaigns/summary/${response.data.data._id}`);
    } catch (err) {
      console.error('Error creating campaign:', err);
      toast.error(err.response?.data?.error?.message || 'Failed to create campaign');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <Sidebar/>
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-blue-800">Create Campaign</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF]"
                placeholder="Enter campaign name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Type *</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF]"
              >
                <option value="">Select a type</option>
                <option value="scratch-card">Scratch Card</option>
                <option value="spin-the-wheel">Spin the Wheel</option>
                <option value="feedback-survey">Feedback Survey</option>
                <option value="instant-coupon">Instant Coupon</option>
                <option value="loyalty-points">Loyalty Points</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF]"
                rows={3}
                placeholder="Enter campaign description"
              ></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date *</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF]"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload Media (JPG/PNG/MP4)</label>
              <input
                type="file"
                accept="image/jpeg,image/png,video/mp4"
                onChange={handleFileChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pricing</label>
              <input
                type="text"
                value="₹500 (Mock Price)" // Mock pricing
                disabled
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#4261FF] hover:bg-[#6D4EFF] text-white"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Review and Pay'}
            </Button>
          </form>
        </div>
      </main>
      <Footer />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default CreateCampaign;