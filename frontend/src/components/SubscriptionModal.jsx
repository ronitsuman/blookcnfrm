import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button } from '../components/ui/Button';
import { Check, X } from 'lucide-react';

const SubscriptionModal = ({ onClose, onSubscriptionSuccess }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const apiUrl = process.env.VITE_API_URL || 'http://localhost:5000/api';

  const plans = [
    {
      type: 'free',
      name: 'Free Listing',
      price: 0,
      duration: 'year',
      features: [
        { text: 'Visible on Client Dashboard', available: true },
        { text: 'Priority Listings', available: false },
        { text: 'Featured Badge', available: false },
        { text: 'Heat Mapping Trial', available: true },
        { text: 'Unlimited Zone Listings', available: false },
        { text: 'Premium Support', available: false },
      ],
    },
    {
      type: 'paid',
      name: 'Premium Listing',
      price: 1800,
      duration: 'year (~Rs.5/day)',
      features: [
        { text: 'Visible on Client Dashboard', available: true },
        { text: 'Priority Listings', available: true },
        { text: 'Featured Badge', available: true },
        { text: 'Heat Mapping Trial', available: true },
        { text: 'Unlimited Zone Listings', available: true },
        { text: 'Premium Support', available: true },
      ],
    },
  ];

  const handleSubscribe = async (planType) => {
    setLoading(true);

    try {
      console.log('Subscribing to plan:', planType); // Debug

      if (planType === 'paid') {
        // Redirect to subscriptions page for payment
        navigate('/subscriptions');
        setLoading(false);
        onClose();
        return;
      }

      // For free plan, proceed directly
      onSubscriptionSuccess(planType);
    } catch (err) {
      console.error('Error in subscription modal:', err);
      toast.error(err.response?.data?.error?.message || 'Failed to process subscription');
      setLoading(false);
    }
  };

  const ListingFeature = ({ available, feature }) => {
    return (
      <li className="flex items-center">
        {available ? (
          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
        ) : (
          <X className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
        )}
        <span className={available ? 'text-gray-800' : 'text-gray-500'}>{feature}</span>
      </li>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4">
        <h2 className="text-2xl font-bold mb-4 text-navy-800 text-center">Select Your Subscription Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plans.map((plan) => (
            <div key={plan.type} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 p-6 text-center">
                <h3 className="text-xl font-bold text-navy-800">{plan.name}</h3>
                <div className="mt-4 mb-6">
                  <span className="text-3xl font-bold">Rs.{plan.price}</span>
                  <span className="text-gray-600">/{plan.duration}</span>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  {plan.features.map((feature, index) => (
                    <ListingFeature key={index} available={feature.available} feature={feature.text} />
                  ))}
                </ul>
                <div className="mt-8">
                  <Button
                    className="w-full bg-[#4261FF] hover:bg-[#6D4EFF] text-white"
                    disabled={loading}
                    onClick={() => handleSubscribe(plan.type)}
                  >
                    Select {plan.name}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Skip
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;