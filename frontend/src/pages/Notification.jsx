import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';
import { api } from '../utils/api';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get('/notifications', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotifications(res.data);
        setLoading(false);
      } catch (err) {
        toast.error('Failed to fetch notifications');
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (notificationId) => {
    try {
      const token = localStorage.getItem('token');
      await api.patch(`/notifications/${notificationId}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(notifications.map((notification) =>
        notification._id === notificationId ? { ...notification, isRead: true } : notification
      ));
      toast.success('Notification marked as read');
    } catch (err) {
      toast.error('Failed to mark notification as read');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Notifications</h2>
        <div className="space-y-4">
          {notifications.length === 0 && <p>No notifications found</p>}
          {notifications.map((notification) => (
            <div
              key={notification._id}
              className={`p-4 rounded shadow ${notification.isRead ? 'bg-gray-200' : 'bg-white'}`}
            >
              <p className="text-sm text-gray-500">{new Date(notification.createdAt).toLocaleString()}</p>
              <p className="text-lg">{notification.message}</p>
              {!notification.isRead && (
                <button
                  onClick={() => handleMarkAsRead(notification._id)}
                  className="mt-2 bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                >
                  Mark as Read
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}