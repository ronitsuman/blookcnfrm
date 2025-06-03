import { useState } from 'react';
import { toast } from 'react-toastify';

const PaymentCheckout = ({ planType, amount, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handlePayment = () => {
    setLoading(true);

    try {
      console.log('Initiating payment for plan:', planType, 'amount:', amount); // Debug

      // TODO: Replace with actual Razorpay checkout when keys are available
      // const options = {
      //   key: 'your_razorpay_key_id',
      //   amount: amount * 100, // in paise
      //   currency: 'INR',
      //   name: 'BLookSpace',
      //   description: `Subscription: ${planType}`,
      //   handler: function (response) {
      //     onSuccess(response);
      //   },
      //   theme: { color: '#F97316' },
      // };
      // const rzp = new window.Razorpay(options);
      // rzp.open();

      toast.info(`Mock payment for ${planType} initiated`);
      onSuccess({ paymentId: `mock_payment_${planType}` });
    } catch (err) {
      console.error('Error initiating payment:', err);
      toast.error('Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded disabled:opacity-50"
      disabled={loading}
    >
      {loading ? 'Processing...' : `Pay Rs.${amount}`}
    </button>
  );
};

export default PaymentCheckout;