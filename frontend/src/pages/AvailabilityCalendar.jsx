import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '../components/ui/Button';
import { ArrowLeft } from 'lucide-react';

const localizer = momentLocalizer(moment);

const AvailabilityCalendar = () => {
  const { spaceId } = useParams();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const apiUrl =  'http://localhost:5000/api';

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    price: '',
  });
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const fetchAvailabilities = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(`${apiUrl}/availabilities/space/${spaceId}`);
        const availabilities = response.data.data || [];

        const calendarEvents = availabilities.map(avail => ({
          id: avail._id,
          title: avail.status === 'available' ? `Available (₹${avail.price || 'N/A'})` : avail.status,
          start: new Date(avail.startDate),
          end: new Date(avail.endDate),
          status: avail.status,
        }));

        setEvents(calendarEvents);

        if (user) {
          const spaceResponse = await axios.get(`${apiUrl}/spaces/${spaceId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          });
          setIsOwner(spaceResponse.data.data.owner._id === user.id);
        }
      } catch (err) {
        console.error('Error fetching availabilities:', err);
        setError(err.response?.data?.error?.message || 'Failed to load availabilities');
      } finally {
        setLoading(false);
      }
    };

    fetchAvailabilities();
  }, [spaceId, user, apiUrl]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddAvailability = async (e) => {
    e.preventDefault();
    if (!isOwner) {
      toast.error('Only space owners can add availability');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication token missing');

      const response = await axios.post(`${apiUrl}/availabilities`, {
        spaceId,
        startDate: formData.startDate,
        endDate: formData.endDate,
        price: formData.price ? Number(formData.price) : undefined,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const newAvail = response.data.data;
      setEvents(prev => [
        ...prev,
        {
          id: newAvail._id,
          title: `Available (₹${newAvail.price || 'N/A'})`,
          start: new Date(newAvail.startDate),
          end: new Date(newAvail.endDate),
          status: newAvail.status,
        },
      ]);

      setFormData({ startDate: '', endDate: '', price: '' });
      toast.success('Availability added successfully');
    } catch (err) {
      console.error('Error adding availability:', err);
      toast.error(err.response?.data?.error?.message || 'Failed to add availability');
    }
  };

  const handleBack = () => {
    console.log('Navigating back to space details for space ID:', spaceId);
    navigate(`/spaces/${spaceId}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow">
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center mb-6">
              <Button
                className="flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
                onClick={handleBack}
              >
                <ArrowLeft size={20} className="mr-2" />
                Back to Space Details
              </Button>
            </div>

            <h1 className="text-3xl font-bold mb-6 text-black">Availability Calendar</h1>

            {error && (
              <div className="text-red-500 mb-4 text-center">{error}</div>
            )}

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <>
                {isOwner && (
                  <form onSubmit={handleAddAvailability} className="mb-8 bg-gray-100 p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Add Availability</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                        <input
                          type="datetime-local"
                          name="startDate"
                          value={formData.startDate}
                          onChange={handleInputChange}
                          required
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                        <input
                          type="datetime-local"
                          name="endDate"
                          value={formData.endDate}
                          onChange={handleInputChange}
                          required
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price (Optional)</label>
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          placeholder="Price per slot"
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button type="submit" className="bg-[#4261FF] hover:bg-[#6D4EFF] text-white">
                        Add Availability
                      </Button>
                    </div>
                  </form>
                )}

                <div className="bg-white p-4 rounded-lg shadow-md">
                  <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 600 }}
                    className="rbc-calendar"
                    eventPropGetter={(event) => ({
                      style: {
                        backgroundColor: event.status === 'available' ? '#4261FF' : '#FF4D4F',
                        color: 'white',
                      },
                    })}
                  />
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
      <ToastContainer position="bottom-right" autoClose={5000} />
    </div>
  );
};

export default AvailabilityCalendar;