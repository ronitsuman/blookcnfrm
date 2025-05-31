import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';
import { api } from '../../utils/api';

export default function BlookforceAgentDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get('/auth/me', { headers: { Authorization: `Bearer ${token}` } });
        setUser(res.data);
        setLoading(false);
      } catch (err) {
        toast.error('Failed to fetch user data');
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">BlookForce Agent Dashboard</h2>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl mb-2">Your Agent Code</h3>
          <p className="text-lg">{user?.blookforceCode || 'Pending Approval'}</p>
        </div>
      </div>
    </div>
  );
}