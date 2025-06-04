import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar'; // Import shared Sidebar
import { Button } from '../components/ui/Button';

const Support = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('Support.jsx mounted'); // Debug log
    console.log('User state:', user); // Debug log
    if (!user) {
      toast.error('Please login to access support');
      navigate('/login');
      return;
    }
    if (user.role !== 'brand') {
      toast.error('Access restricted to brands');
      navigate('/');
      return;
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.subject || !formData.message) {
      toast.error('Please fill all fields');
      return;
    }

    setLoading(true);
    // Mock submission
    setTimeout(() => {
      toast.success('Support ticket submitted successfully (mock)!');
      setLoading(false);
      setFormData({ subject: '', message: '' });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar activePage="support" />

        {/* Main Content */}
        <main className="flex-grow container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 text-blue-800">Support</h1>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4 text-navy-800">Submit a Support Ticket</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF]"
                  placeholder="Enter subject"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF]"
                  rows={5}
                  placeholder="Enter your message"
                ></textarea>
              </div>
              <Button
                type="submit"
                className="w-full bg-[#4261FF] hover:bg-[#6D4EFF] text-white"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit Ticket'}
              </Button>
            </form>
          </div>
        </main>
      </div>
      <Footer />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default Support;