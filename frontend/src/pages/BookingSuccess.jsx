// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// import { Button } from '../components/ui/Button';

// const BookingSuccess = () => {
//   const navigate = useNavigate();
//   const [showOptionsModal, setShowOptionsModal] = useState(true);
//   const [perkFile, setPerkFile] = useState(null);

//   useEffect(() => {
//     toast.success('Booking confirmed successfully!');
//   }, []);

//   const handleAddCampaign = () => {
//     console.log('Add Campaign selected'); // Debug
//     setShowOptionsModal(false);
//     navigate('/campaigns');
//   };

//   const handleAddPerk = async () => {
//     if (!perkFile) {
//       toast.error('Please select a file to upload.');
//       return;
//     }

//     try {
//       console.log('Uploading perk file:', perkFile.name); // Debug
//       // Mock API call for BLook Perks
//       toast.success('BLook Perk uploaded successfully (mock)');
//       setShowOptionsModal(false);
//       navigate('/blookperks-success');
//     } catch (err) {
//       console.error('Error uploading perk:', err);
//       toast.error('Failed to upload BLook Perk.');
//     }
//   };

//   const handleBLookWorkVendor = () => {
//     console.log('BLook Work Vendor selected'); // Debug
//     setShowOptionsModal(false);
//     navigate('/blookwork-vendor');
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file && ['application/pdf', 'image/jpeg', 'image/png'].includes(file.type)) {
//       setPerkFile(file);
//     } else {
//       toast.error('Only PDF, JPG, or PNG files are allowed.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       <Navbar />
//       <main className="flex-grow container mx-auto px-4 py-8 text-center">
//         <h1 className="text-3xl font-bold mb-6 text-blue-800">Booking Confirmed!</h1>
//         <p className="text-lg text-gray-600 mb-8">Your space has been successfully booked. You'll receive a confirmation soon.</p>

//         {showOptionsModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
//               <h2 className="text-xl font-bold mb-4 text-navy-800">Enhance Your Booking</h2>
//               <p className="text-gray-600 mb-6">How would you like to promote your booked space?</p>
//               <div className="space-y-4">
//                 <Button
//                   className="w-full bg-[#4261FF] hover:bg-[#6D4EFF] text-white"
//                   onClick={handleAddCampaign}
//                 >
//                   Add Campaign (QR Code)
//                 </Button>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Upload BLook Perk (PDF/JPG/PNG)</label>
//                   <input
//                     type="file"
//                     accept="application/pdf,image/jpeg,image/png"
//                     onChange={handleFileChange}
//                     className="w-full p-2 border border-gray-300 rounded-md"
//                   />
//                   <Button
//                     className="w-full bg-teal-500 hover:bg-teal-600 text-white mt-2"
//                     onClick={handleAddPerk}
//                     disabled={!perkFile}
//                   >
//                     Add BLook Perk
//                   </Button>
//                 </div>
//                 <Button
//                   className="w-full bg-orange-500 hover:bg-orange-600 text-white"
//                   onClick={handleBLookWorkVendor}
//                 >
//                   Connect with BLook Work Vendor
//                 </Button>
//                 <Button
//                   variant="outline"
//                   className="w-full"
//                   onClick={() => {
//                     console.log('Modal skipped'); // Debug
//                     setShowOptionsModal(false);
//                     navigate('/brand-dashboard');
//                   }}
//                 >
//                   Skip
//                 </Button>
//               </div>
//             </div>
//           </div>
//         )}

//         <Button
//           className="bg-[#4261FF] hover:bg-[#6D4EFF] text-white"
//           onClick={() => navigate('/brand-dashboard')}
//         >
//           Go to Dashboard
//         </Button>
//       </main>
//       <Footer />
//       <ToastContainer position="bottom-right" autoClose={3000} />
//     </div>
//   );
// };

// export default BookingSuccess;

import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '../components/ui/Button';

const BookingSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { spaceId } = location.state || {}; // Get spaceId from BookingForm.jsx
  const [showOptionsModal, setShowOptionsModal] = useState(true);
  const [perkFile, setPerkFile] = useState(null);

  useEffect(() => {
    toast.success('Booking confirmed successfully!');
    if (!spaceId) {
      toast.error('No space selected. Please book a space first.');
      navigate('/');
    }
  }, [spaceId, navigate]);

  const handleAddCampaign = () => {
    console.log('Add Campaign selected'); // Debug
    setShowOptionsModal(false);
    navigate('/campaigns', { state: { spaceId } }); // Pass spaceId to CreateCampaign.jsx
  };

  const handleAddPerk = async () => {
    if (!perkFile) {
      toast.error('Please select a file to upload.');
      return;
    }

    try {
      console.log('Uploading perk file:', perkFile.name); // Debug
      // Mock API call for BLook Perks
      toast.success('BLook Perk uploaded successfully (mock)');
      setShowOptionsModal(false);
      console.log('Navigating to /blookperks-success'); // Debug
      navigate('/blookperks-success'); // Ensure navigation happens
    } catch (err) {
      console.error('Error uploading perk:', err);
      toast.error('Failed to upload BLook Perk.');
      setShowOptionsModal(false); // Ensure modal closes even on error
    }
  };

  const handleBLookWorkVendor = () => {
    console.log('BLook Work Vendor selected'); // Debug
    setShowOptionsModal(false);
    navigate('/blookwork-vendor');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && ['application/pdf', 'image/jpeg', 'image/png'].includes(file.type)) {
      setPerkFile(file);
    } else {
      toast.error('Only PDF, JPG, or PNG files are allowed.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-6 text-blue-800">Booking Confirmed!</h1>
        <p className="text-lg text-gray-600 mb-8">Your space has been successfully booked. You'll receive a confirmation soon.</p>

        {showOptionsModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h2 className="text-xl font-bold mb-4 text-navy-800">Enhance Your Booking</h2>
              <p className="text-gray-600 mb-6">How would you like to promote your booked space?</p>
              <div className="space-y-4">
                <Button
                  className="w-full bg-[#4261FF] hover:bg-[#6D4EFF] text-white"
                  onClick={handleAddCampaign}
                >
                  Add Campaign (QR Code)
                </Button>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Upload BLook Perk (PDF/JPG/PNG)</label>
                  <input
                    type="file"
                    accept="application/pdf,image/jpeg,image/png"
                    onChange={handleFileChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  <Button
                    className="w-full bg-teal-500 hover:bg-teal-600 text-white mt-2"
                    onClick={handleAddPerk}
                    disabled={!perkFile}
                  >
                    Add BLook Perk
                  </Button>
                </div>
                <Button
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                  onClick={handleBLookWorkVendor}
                >
                  Connect with BLook Work Vendor
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    console.log('Modal skipped'); // Debug
                    setShowOptionsModal(false);
                    navigate('/brand-dashboard');
                  }}
                >
                  Skip
                </Button>
              </div>
            </div>
          </div>
        )}

        <Button
          className="bg-[#4261FF] hover:bg-[#6D4EFF] text-white"
          onClick={() => navigate('/brand-dashboard')}
        >
          Go to Dashboard
        </Button>
      </main>
      <Footer />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default BookingSuccess;