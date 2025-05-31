import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';
import { api } from '../../utils/api';

export default function VendorDashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get('/jobs/available', {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log('Jobs response:', res.data);

        const extractedJobs = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data.jobs)
          ? res.data.jobs
          : [];

        setJobs(extractedJobs);
      } catch (err) {
        console.error('Fetch jobs error:', err);
        toast.error('Failed to fetch jobs');
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleSubmitQuote = async (jobId, amount, timeline) => {
    try {
      const token = localStorage.getItem('token');
      await api.post(
        `/jobs/${jobId}/quotes`,
        { amount, timeline },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Quote submitted');
      setJobs((prev) =>
        prev.map((job) =>
          job._id === jobId ? { ...job, status: 'quoted' } : job
        )
      );
    } catch (err) {
      console.error('Submit quote error:', err);
      toast.error('Failed to submit quote');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Vendor Dashboard</h2>
        <h3 className="text-xl mb-2">Available Jobs</h3>
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border p-2">Description</th>
              <th className="border p-2">Budget</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <tr key={job._id}>
                  <td className="border p-2">{job.description}</td>
                  <td className="border p-2">{job.budget}</td>
                  <td className="border p-2">
                    {job.status === 'pending' && (
                      <button
                        onClick={() => handleSubmitQuote(job._id, 5000, '7 days')}
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                      >
                        Submit Quote
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center border p-2">
                  No jobs available at the moment.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
