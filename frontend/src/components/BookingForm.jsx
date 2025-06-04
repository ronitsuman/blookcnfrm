// import { useState } from 'react';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { Button } from './ui/Button';
// import { Calendar } from 'lucide-react';

// const BookingForm = ({ spaceId, spacePrice }) => {
//   const { user } = useSelector((state) => state.user);
//   const [formData, setFormData] = useState({
//     startDate: '',
//     endDate: '',
//   });
//   const [loading, setLoading] = useState(false);
//   const apiUrl =  'http://localhost:5000/api';

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!user) {
//       toast.error('Please login to book a space');
//       return;
//     }

//     if (!formData.startDate || !formData.endDate) {
//       toast.error('Please select start and end dates');
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
//       const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
//       const totalPrice = days * (spacePrice || 0);

//       const response = await axios.post(
//         `${apiUrl}/bookings`,
//         {
//           spaceId,
//           startDate: formData.startDate,
//           endDate: formData.endDate,
//           totalPrice,
//         },
//         {
//           headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//         }
//       );

//       const booking = response.data.data;
//       // TODO: Integrate Razorpay checkout
//       // const { order } = response.data;
//       // const options = {
//       //   key: 'your_razorpay_key_id',
//       //   amount: order.amount,
//       //   currency: order.currency,
//       //   name: 'BLookSpace',
//       //   description: `Booking for Space ${spaceId}`,
//       //   order_id: order.id,
//       //   handler: async function (response) {
//       //     await axios.post(
//       //       `${apiUrl}/bookings/verify-payment`,
//       //       {
//       //         bookingId: booking._id,
//       //         razorpay_payment_id: response.razorpay_payment_id,
//       //         razorpay_order_id: response.razorpay_order_id,
//       //         razorpay_signature: response.razorpay_signature,
//       //       },
//       //       { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
//       //     );
//       //     toast.success('Booking confirmed!');
//       //   },
//       //   prefill: { name: user.name, email: user.email },
//       //   theme: { color: '#4261FF' },
//       // };
//       // const rzp = new window.Razorpay(options);
//       // rzp.open();

//       toast.info(`Booking created (ID: ${booking._id}). Payment integration pending.`); // Mock response
//     } catch (err) {
//       console.error('Error creating booking:', err);
//       toast.error(err.response?.data?.error?.message || 'Failed to create booking');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-gray-50 p-4 rounded-lg">
//       <h3 className="text-lg font-semibold mb-4 flex items-center">
//         <Calendar size={20} className="mr-2 text-[#4261FF]" />
//         Book This Space
//       </h3>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Start Date & Time</label>
//             <input
//               type="datetime-local"
//               name="startDate"
//               value={formData.startDate}
//               onChange={handleInputChange}
//               required
//               className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF]"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">End Date & Time</label>
//             <input
//               type="datetime-local"
//               name="endDate"
//               value={formData.endDate}
//               onChange={handleInputChange}
//               required
//               className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF]"
//             />
//           </div>
//         </div>
//         <Button
//           type="submit"
//           className="w-full bg-[#4261FF] hover:bg-[#6D4EFF] text-white"
//           disabled={loading}
//         >
//           {loading ? 'Processing...' : 'Book Now'}
//         </Button>
//       </form>
//     </div>
//   );
// };

// export default BookingForm;



// import { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { Button } from './ui/Button';
// import { Calendar } from 'lucide-react';

// const BookingForm = ({ spaceId, spacePrice }) => {
//   const { user } = useSelector((state) => state.user);
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     startDate: '',
//     endDate: '',
//   });
//   const [loading, setLoading] = useState(false);
//   const apiUrl = 'http://localhost:5000/api';

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!user) {
//       toast.error('Please login to book a space');
//       return;
//     }

//     if (!formData.startDate || !formData.endDate) {
//       toast.error('Please select start and end dates');
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
//       const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
//       const totalPrice = days * (spacePrice || 0);

//       const response = await axios.post(
//         `${apiUrl}/bookings`,
//         {
//           spaceId,
//           startDate: formData.startDate,
//           endDate: formData.endDate,
//           totalPrice,
//         },
//         {
//           headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//         }
//       );

//       const booking = response.data.data;
//       // Mock Razorpay payment
//       console.log('Mock Razorpay payment for booking:', booking._id); // Debug
//       toast.success('Payment successful (mock)!');
//       navigate('/success'); // Redirect to Success.jsx
//     } catch (err) {
//       console.error('Error creating booking:', err);
//       toast.error(err.response?.data?.error?.message || 'Failed to create booking');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-gray-50 p-4 rounded-lg">
//       <h3 className="text-lg font-semibold mb-4 flex items-center">
//         <Calendar size={20} className="mr-2 text-[#4261FF]" />
//         Book This Space
//       </h3>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Start Date & Time</label>
//             <input
//               type="datetime-local"
//               name="startDate"
//               value={formData.startDate}
//               onChange={handleInputChange}
//               required
//               className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF]"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">End Date & Time</label>
//             <input
//               type="datetime-local"
//               name="endDate"
//               value={formData.endDate}
//               onChange={handleInputChange}
//               required
//               className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF]"
//             />
//           </div>
//         </div>
//         <Button
//           type="submit"
//           className="w-full bg-[#4261FF] hover:bg-[#6D4EFF] text-white"
//           disabled={loading}
//         >
//           {loading ? 'Processing...' : 'Book Now'}
//         </Button>
//       </form>
//     </div>
//   );
// };

// export default BookingForm;

// import { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { Button } from './ui/Button';
// import { Calendar } from 'lucide-react';

// const BookingForm = ({ spaceId, spacePrice }) => {
//   const { user } = useSelector((state) => state.user);
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     startDate: '',
//     endDate: '',
//   });
//   const [loading, setLoading] = useState(false);
//   const apiUrl = 'http://localhost:5000/api';

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!user) {
//       toast.error('Please login to book a space');
//       return;
//     }

//     if (!formData.startDate || !formData.endDate) {
//       toast.error('Please select start and end dates');
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
//       const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
//       const totalPrice = days * (spacePrice || 0);

//       const response = await axios.post(
//         `${apiUrl}/bookings`,
//         {
//           spaceId,
//           startDate: formData.startDate,
//           endDate: formData.endDate,
//           totalPrice,
//         },
//         {
//           headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//         }
//       );

//       const booking = response.data.data;
//       console.log('Booking request body:', {
//         spaceId,
//         startDate: formData.startDate,
//         endDate: formData.endDate,
//         totalPrice,
//       });
//       console.log('Booking request URL:', '/api/bookings');

//       toast.success('Payment successful (mock)!');
//       navigate('/success', { state: { spaceId } }); // Pass spaceId to Success.jsx
//     } catch (err) {
//       console.error('Error creating booking:', err);
//       toast.error(err.response?.data?.error?.message || 'Failed to create booking');
//     } finally {
//       setLoading(false);  
    
//     }
//   };

//   return (
//     <div className="bg-gray-50 p-4 rounded-lg">
//       <h3 className="text-lg font-semibold mb-4 flex items-center">
//         <Calendar size={20} className="mr-2 text-[#4261FF]" />
//         Book This Space
//       </h3>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Start Date & Time</label>
//             <input
//               type="datetime-local"
//               name="startDate"
//               value={formData.startDate}
//               onChange={handleInputChange}
//               required
//               className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF]"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">End Date & Time</label>
//             <input
//               type="datetime-local"
//               name="endDate"
//               value={formData.endDate}
//               onChange={handleInputChange}
//               required
//               className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF]"
//             />
//           </div>
//         </div>
//         <Button
//           type="submit"
//           className="w-full bg-[#4261FF] hover:bg-[#6D4EFF] text-white"
//           disabled={loading}
//         >
//           {loading ? 'Processing...' : 'Book Now'}
//         </Button>
//       </form>
//     </div>
//   );
// };

// export default BookingForm;



import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button } from './ui/Button';
import { Calendar } from 'lucide-react';

const BookingForm = ({ spaceId, spacePrice }) => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
  });
  const [loading, setLoading] = useState(false);
  const apiUrl = 'http://localhost:5000/api';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to book a space');
      navigate('/login'); // Redirect to login if user is not authenticated
      return;
    }

    if (!formData.startDate || !formData.endDate) {
      toast.error('Please select start and end dates');
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
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      const totalPrice = days * (spacePrice || 0);

      const response = await axios.post(
        `${apiUrl}/bookings`,
        {
          spaceId,
          startDate: formData.startDate,
          endDate: formData.endDate,
          totalPrice,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );

      const booking = response.data.data;
      console.log('Booking request body:', {
        spaceId,
        startDate: formData.startDate,
        endDate: formData.endDate,
        totalPrice,
      });
      console.log('Booking request URL:', '/api/bookings');
      console.log('Navigating to /success with spaceId:', spaceId); // Debug log

      toast.success('Payment successful (mock)!');
      navigate('/success', { state: { spaceId } }); // Pass spaceId to Success.jsx
    } catch (err) {
      console.error('Error creating booking:', err);
      toast.error(err.response?.data?.error?.message || 'Failed to create booking');
      setLoading(false);
      // Do NOT redirect to homepage on error, let user retry
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Calendar size={20} className="mr-2 text-[#4261FF]" />
        Book This Space
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date & Time</label>
            <input
              type="datetime-local"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date & Time</label>
            <input
              type="datetime-local"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF]"
            />
          </div>
        </div>
        <Button
          type="submit"
          className="w-full bg-[#4261FF] hover:bg-[#6D4EFF] text-white"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Book Now'}
        </Button>
      </form>
    </div>
  );
};

export default BookingForm;