import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';
import { api } from '../utils/api';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quoteForm, setQuoteForm] = useState({ jobId: '', amount: '', timeline: '' });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get('/jobs/available', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJobs(res.data);
        setLoading(false);
      } catch (err) {
        toast.error('Failed to fetch jobs');
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleQuoteSubmit = async (e) => {
    e.preventDefault();
    if (!quoteForm.amount || !quoteForm.timeline) {
      toast.error('Please fill all fields');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      await api.post(`/jobs/${quoteForm.jobId}/quotes`, {
        amount: Number(quoteForm.amount),
        timeline: quoteForm.timeline,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Quote submitted successfully');
      setJobs(jobs.map((job) =>
        job._id === quoteForm.jobId ? { ...job, status: 'quoted' } : job
      ));
      setQuoteForm({ jobId: '', amount: '', timeline: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit quote');
    }
  };

  const openQuoteForm = (jobId) => {
    setQuoteForm({ ...quoteForm, jobId });
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Available Jobs</h2>
        <div className="grid grid-cols-1 gap-4">
          {jobs.length === 0 && <p>No jobs available</p>}
          {jobs.map((job) => (
            <div key={job._id} className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-semibold">{job.description}</h3>
              <p><strong>Budget:</strong> ₹{job.budget}</p>
              <p><strong>Timeline:</strong> {job.timeline}</p>
              <p><strong>Status:</strong> {job.status}</p>
              {job.status === 'pending' && (
                <button
                  onClick={() => openQuoteForm(job._id)}
                  className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Submit Quote
                </button>
              )}
            </div>
          ))}
        </div>
        {quoteForm.jobId && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">Submit Quote</h3>
              <form onSubmit={handleQuoteSubmit}>
                <div className="mb-4">
                  <label className="block mb-1 font-medium">Quote Amount (INR)</label>
                  <input
                    type="number"
                    value={quoteForm.amount}
                    onChange={(e) => setQuoteForm({ ...quoteForm, amount: e.target.value })}
                    className="w-full border p-2 rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 font-medium">Timeline</label>
                  <input
                    type="text"
                    value={quoteForm.timeline}
                    onChange={(e) => setQuoteForm({ ...quoteForm, timeline: e.target.value })}
                    className="w-full border p-2 rounded"
                    placeholder="e.g., 7 days"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setQuoteForm({ jobId: '', amount: '', timeline: '' })}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}