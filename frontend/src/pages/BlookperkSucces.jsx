import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const BLookPerkSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-6 text-blue-800">BLook Perk Uploaded Successfully!</h1>
        <p className="text-lg text-gray-600 mb-8">Your perk has been successfully uploaded. You can now manage it from your dashboard.</p>
        <Button
          className="bg-[#4261FF] hover:bg-[#6D4EFF] text-white"
          onClick={() => navigate('/brand-dashboard')}
        >
          Go to Dashboard
        </Button>
      </main>
      <Footer />
    </div>
  );
};

export default BLookPerkSuccess;