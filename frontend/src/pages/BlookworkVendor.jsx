import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '../components/ui/Button';

const BLookWorkVendor = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelfPrint = () => {
    console.log('Self-print selected'); // Debug
    toast.info('Redirecting to campaigns for materials.');
    navigate('/campaigns');
  };

  const handleVendorPrint = () => {
    console.log('Vendor print selected'); // Debug
    toast.success('Connected with printing vendor (mock).');
    navigate('/brand-dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-blue-800">BLook Work Vendor</h1>
        <p className="text-lg text-gray-600 mb-8">Choose how to handle your campaign printing:</p>
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-2 text-navy-800">Self-Print</h2>
            <p className="text-gray-600 mb-4">Download campaign materials (e.g., QR codes) and print them yourself.</p>
            <Button
              className="bg-[#4261FF] hover:bg-[#6D4EFF] text-white"
              onClick={handleSelfPrint}
            >
              Self-Print
            </Button>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-2 text-navy-800">Connect with Printing Vendor</h2>
            <p className="text-gray-600 mb-4">Let our trusted printing vendor handle your materials. You'll be contacted for details.</p>
            <Button
              className="bg-orange-500 hover:bg-orange-600 text-white"
              onClick={handleVendorPrint}
            >
              Connect with Vendor
            </Button>
          </div>
        </div>
      </main>
      <Footer />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default BLookWorkVendor;