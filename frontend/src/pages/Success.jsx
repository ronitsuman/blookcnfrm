import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '../components/ui/Button';

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4 text-teal-600">Subscription Successful!</h1>
        <p className="text-gray-600 mb-6">Your subscription has been activated. Start exploring now!</p>
        <Button
          onClick={() => navigate('/dashboard')}
          className="bg-orange-500 hover:bg-orange-600 text-white"
        >
          Go to Dashboard
        </Button>
      </main>
      <Footer />
    </div>
  );
};

export default Success;