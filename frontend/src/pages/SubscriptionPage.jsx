import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '../components/ui/Button';
import { Check, X } from 'lucide-react';

const SubscriptionPage = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const apiUrl =  'http://localhost:5000/api';

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
    if (!user) {
      toast.error('Please login to subscribe');
      navigate('/login');
      return;
    }

    setLoading(true);

    try {
      console.log('Subscribing to plan:', planType, 'userId:', user.id); // Debug

      const response = await axios.post(
        `${apiUrl}/subscriptions`,
        { planType },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );

      if (planType === 'paid' && response.data.order) {
        toast.info(`Mock payment for ${planType} initiated`);
        navigate('/subscriptions/success');
      } else {
        toast.success('Subscription created successfully');
        navigate('/subscriptions/success');
      }
    } catch (err) {
      console.error('Error creating subscription:', err);
      toast.error(err.response?.data?.error?.message || 'Failed to create subscription');
    } finally {
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Header Section */}
        <section className="bg-gradient-to-r from-white to-[#D9D9F3] py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4 text-navy-800">Choose the Right Plan for Your Space</h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              We offer flexible listing options to meet your needs. Start with our free listing or upgrade for premium features.
            </p>
          </div>
        </section>

        {/* Pricing Table */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Free Plan */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 p-6 text-center">
                    <h2 className="text-2xl font-bold text-navy-800">Free Listing</h2>
                    <div className="mt-4 mb-6">
                      <span className="text-4xl font-bold">Rs.0</span>
                      <span className="text-gray-600">/year</span>
                    </div>
                    <p className="text-gray-600">Perfect for getting started and testing the platform</p>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-4">
                      {plans[0].features.map((feature, index) => (
                        <ListingFeature key={index} available={feature.available} feature={feature.text} />
                      ))}
                    </ul>
                    <div className="mt-8">
                      <Button
                        className="w-full"
                        variant="outline"
                        disabled={loading}
                        onClick={() => handleSubscribe('free')}
                      >
                        Get Started Free
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Premium Plan */}
                <div className="border border-[#4261FF] rounded-lg overflow-hidden shadow-md relative">
                  <div className="absolute top-0 right-0 bg-[#4261FF] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                    RECOMMENDED
                  </div>
                  <div className="bg-[#6D4EFF]/10 p-6 text-center">
                    <h2 className="text-2xl font-bold text-navy-800">Premium Listing</h2>
                    <div className="mt-4 mb-6">
                      <span className="text-4xl font-bold">Rs.1800</span>
                      <span className="text-gray-600">/year (~Rs.5/day)</span>
                    </div>
                    <p className="text-gray-600">For maximum visibility and priority matching</p>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-4">
                      {plans[1].features.map((feature, index) => (
                        <ListingFeature key={index} available={feature.available} feature={feature.text} />
                      ))}
                    </ul>
                    <div className="mt-8">
                      <Button
                        className="w-full bg-[#4261FF] hover:bg-[#6D4EFF]"
                        disabled={loading}
                        onClick={() => handleSubscribe('paid')}
                      >
                        Upgrade to Premium
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Benefits */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-navy-800">Premium Benefits in Detail</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-[#D9D9F3] rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#4261FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-navy-800">Priority Listings</h3>
                <p className="text-gray-700">
                  Your space appears first in brand searches, increasing selection chances.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-[#D9D9F3] rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#4261FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-navy-800">Featured Badge</h3>
                <p className="text-gray-700">
                  A badge highlights your space as premium, boosting credibility.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-[#D9D9F3] rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#4261FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-navy-800">Heat Mapping Trial</h3>
                <p className="text-gray-700">
                  Early access to HeatMapping insights for optimizing your space.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Commission Structure */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl font-bold text-center mb-12 text-navy-800">Transparent Commission Structure</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-lg text-gray-700 mb-6">
                Regardless of your listing type, our commission structure is straightforward:
              </p>
              <div className="flex items-center justify-center mb-6">
                <div className="w-24 h-24 rounded-full bg-[#4261FF] text-white text-2xl font-bold flex items-center justify-center">
                  25%
                </div>
              </div>
              <p className="text-center text-gray-700 mb-8">
                We take a 25% platform fee from successful brand collaborations.
                <br />You receive 75% of all revenue generated from your space.
              </p>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h3 className="font-semibold mb-2">Example:</h3>
                <p className="text-gray-700">
                  If a brand pays Rs.10,000 for advertising in your space, you receive Rs.7,500 directly and we retain Rs.2,500 as our fee.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-[#4261FF] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to List Your Space?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Start with a free listing or go premium for maximum visibility and brand opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" disabled={loading} onClick={() => handleSubscribe('free')}>
                Get Started Free
              </Button>
              <Button
                size="lg"
                className="bg-white text-[#4261FF] hover:bg-gray-100"
                disabled={loading}
                onClick={() => handleSubscribe('paid')}
              >
                Upgrade to Premium
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default SubscriptionPage;