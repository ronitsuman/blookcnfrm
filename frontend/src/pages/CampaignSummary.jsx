// import { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// import { Button } from '../components/ui/Button';
// import QRCode from 'react-qr-code';

// const CampaignSummary = () => {
//   const { user } = useSelector((state) => state.user);
//   const navigate = useNavigate();
//   const { id } = useParams(); // Get campaign ID from URL
//   const [campaign, setCampaign] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const apiUrl = 'http://localhost:5000/api';

//   useEffect(() => {
//     console.log('User state:', user); // Debug
//     if (!user) {
//       toast.error('Please login to access campaign summary');
//       navigate('/login');
//       return;
//     }
//     if (user.role !== 'brand') {
//       toast.error('Access restricted to brands');
//       navigate('/');
//       return;
//     }

//     const fetchCampaign = async () => {
//       try {
//         const response = await axios.get(`${apiUrl}/campaigns/${id}`, {
//           headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//         });
//         setCampaign(response.data.data);
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching campaign:', err);
//         setError('Failed to load campaign details');
//         setLoading(false);
//         toast.error('Failed to load campaign details');
//       }
//     };

//     fetchCampaign();
//   }, [user, navigate, id]);

//   const downloadQRCode = () => {
//     if (!campaign) return;
//     const svg = document.getElementById(`qr-code-${campaign.qrCode}`);
//     if (!svg) {
//       toast.error('QR code not found');
//       return;
//     }
//     const svgData = new XMLSerializer().serializeToString(svg);
//     const canvas = document.createElement('canvas');
//     const ctx = canvas.getContext('2d');
//     const img = new Image();
//     img.onload = () => {
//       canvas.width = img.width;
//       canvas.height = img.height;
//       ctx.drawImage(img, 0, 0);
//       const pngUrl = canvas.toDataURL('image/png');
//       const downloadLink = document.createElement('a');
//       downloadLink.href = pngUrl;
//       downloadLink.download = `qr-code-${campaign.qrCode}.png`;
//       document.body.appendChild(downloadLink);
//       downloadLink.click();
//       document.body.removeChild(downloadLink);
//       toast.success(`QR code ${campaign.qrCode} downloaded!`);
//     };
//     img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
//   };

//   const printQRCode = () => {
//     if (!campaign) return;
//     const svg = document.getElementById(`qr-code-${campaign.qrCode}`);
//     if (!svg) {
//       toast.error('QR code not found');
//       return;
//     }
//     const svgData = new XMLSerializer().serializeToString(svg);
//     const printWindow = window.open('', '_blank');
//     printWindow.document.write(`
//       <html>
//         <body>
//           <img src="data:image/svg+xml;base64,${btoa(svgData)}" onload="window.print();window.close()" />
//         </body>
//       </html>
//     `);
//     printWindow.document.close();
//   };

//   const shareQRCode = () => {
//     if (!campaign) return;
//     const shareData = {
//       title: 'BLookPerks QR Code',
//       text: `Check out this QR code for ${campaign.name}!`,
//       url: window.location.href, // Mock URL
//     };
//     if (navigator.share) {
//       navigator.share(shareData)
//         .then(() => toast.success('QR code shared successfully!'))
//         .catch(() => toast.error('Error sharing QR code'));
//     } else {
//       toast.error('Sharing not supported on this device');
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-lg text-red-600">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       <Navbar />
//       <div className="flex flex-1">
//         {/* Sidebar */}
//         <aside className="w-64 bg-white shadow-md">
//           <nav className="mt-6">
//             <ul>
//               <li>
//                 <button
//                   onClick={() => navigate('/dashboard')}
//                   className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
//                 >
//                   Dashboard
//                 </button>
//               </li>
//               <li>
//                 <button
//                   onClick={() => navigate('/campaigns')}
//                   className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 font-semibold bg-gray-200"
//                 >
//                   Campaigns
//                 </button>
//               </li>
//               <li>
//                 <button
//                   onClick={() => navigate('/calendar')}
//                   className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
//                 >
//                   Calendar
//                 </button>
//               </li>
//               <li>
//                 <button
//                   onClick={() => navigate('/payments')}
//                   className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
//                 >
//                   Payments
//                 </button>
//               </li>
//               <li>
//                 <button
//                   onClick={() => navigate('/analytics')}
//                   className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
//                 >
//                   Analytics
//                 </button>
//               </li>
//               <li>
//                 <button
//                   onClick={() => navigate('/support')}
//                   className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
//                 >
//                   Support
//                 </button>
//               </li>
//             </ul>
//           </nav>
//         </aside>

//         {/* Main Content */}
//         <main className="flex-grow container mx-auto px-4 py-8">
//           <h1 className="text-3xl font-bold mb-6 text-blue-800">QR Code & Campaign Summary</h1>
//           {campaign ? (
//             <div className="bg-white rounded-lg shadow-md p-6">
//               <div className="flex justify-center mb-6">
//                 <QRCode
//                   id={`qr-code-${campaign.qrCode}`}
//                   value={campaign.qrCode}
//                   size={256}
//                   level="H"
//                   style={{ padding: '10px', background: 'white', borderRadius: '8px' }}
//                 />
//               </div>
//               <div className="flex justify-center space-x-4 mb-6">
//                 <Button
//                   className="bg-[#4261FF] hover:bg-[#6D4EFF] text-white"
//                   onClick={downloadQRCode}
//                 >
//                   Download
//                 </Button>
//                 <Button
//                   className="bg-[#4261FF] hover:bg-[#6D4EFF] text-white"
//                   onClick={printQRCode}
//                 >
//                   Print
//                 </Button>
//                 <Button
//                   className="bg-[#4261FF] hover:bg-[#6D4EFF] text-white"
//                   onClick={shareQRCode}
//                 >
//                   Share
//                 </Button>
//               </div>

//               <h2 className="text-2xl font-semibold mb-4 text-navy-800">Linked Campaigns</h2>
//               <div className="overflow-x-auto">
//                 <table className="w-full text-left border-collapse">
//                   <thead>
//                     <tr className="bg-gray-200">
//                       <th className="p-2">Campaign Name</th>
//                       <th className="p-2">Status</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr className="border-t">
//                       <td className="p-2">{campaign.name}</td>
//                       <td className="p-2">
//                         <span
//                           className={`px-2 py-1 rounded text-white text-sm ${
//                             campaign.status === 'Active'
//                               ? 'bg-green-500'
//                               : campaign.status === 'Scheduled'
//                               ? 'bg-yellow-500'
//                               : 'bg-red-500'
//                           }`}
//                         >
//                           {campaign.status}
//                         </span>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           ) : (
//             <div className="text-center">
//               <p className="text-gray-600 mb-4">No campaign found.</p>
//             </div>
//           )}
//         </main>
//       </div>
//       <Footer />
//       <ToastContainer position="bottom-right" autoClose={3000} />
//     </div>
//   );
// };

// export default CampaignSummary;


// import { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// import { Button } from '../components/ui/Button';
// import QRCode from 'react-qr-code';

// const CampaignSummary = () => {
//   const { user } = useSelector((state) => state.user);
//   const navigate = useNavigate();
//   const { id } = useParams(); // Get campaign ID from URL
//   const [campaign, setCampaign] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const apiUrl = 'http://localhost:5000/api';

//   useEffect(() => {
//     console.log('User state:', user); // Debug
//     console.log('Campaign ID from URL:', id); // Debug log

//     if (!user) {
//       toast.error('Please login to access campaign summary');
//       navigate('/login');
//       return;
//     }
//     if (user.role !== 'brand') {
//       toast.error('Access restricted to brands');
//       navigate('/');
//       return;
//     }

//     // Validate campaign ID format (basic check for ObjectId)
//     if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
//       console.log('Invalid campaign ID:', id); // Debug log
//       toast.error('Invalid campaign ID');
//       navigate('/campaigns');
//       return;
//     }

//     const fetchCampaign = async () => {
//       try {
//         const response = await axios.get(`${apiUrl}/campaigns/${id}`, {
//           headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//         });
//         setCampaign(response.data.data);
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching campaign:', err);
//         setError('Failed to load campaign details');
//         setLoading(false);
//         toast.error('Failed to load campaign details');
//       }
//     };

//     fetchCampaign();
//   }, [user, navigate, id]);

//   const downloadQRCode = () => {
//     if (!campaign) return;
//     const svg = document.getElementById(`qr-code-${campaign.qrCode}`);
//     if (!svg) {
//       toast.error('QR code not found');
//       return;
//     }
//     const svgData = new XMLSerializer().serializeToString(svg);
//     const canvas = document.createElement('canvas');
//     const ctx = canvas.getContext('2d');
//     const img = new Image();
//     img.onload = () => {
//       canvas.width = img.width;
//       canvas.height = img.height;
//       ctx.drawImage(img, 0, 0);
//       const pngUrl = canvas.toDataURL('image/png');
//       const downloadLink = document.createElement('a');
//       downloadLink.href = pngUrl;
//       downloadLink.download = `qr-code-${campaign.qrCode}.png`;
//       document.body.appendChild(downloadLink);
//       downloadLink.click();
//       document.body.removeChild(downloadLink);
//       toast.success(`QR code ${campaign.qrCode} downloaded!`);
//     };
//     img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
//   };

//   const printQRCode = () => {
//     if (!campaign) return;
//     const svg = document.getElementById(`qr-code-${campaign.qrCode}`);
//     if (!svg) {
//       toast.error('QR code not found');
//       return;
//     }
//     const svgData = new XMLSerializer().serializeToString(svg);
//     const printWindow = window.open('', '_blank');
//     printWindow.document.write(`
//       <html>
//         <body>
//           <img src="data:image/svg+xml;base64,${btoa(svgData)}" onload="window.print();window.close()" />
//         </body>
//       </html>
//     `);
//     printWindow.document.close();
//   };

//   const shareQRCode = () => {
//     if (!campaign) return;
//     const shareData = {
//       title: 'BLookPerks QR Code',
//       text: `Check out this QR code for ${campaign.name}!`,
//       url: window.location.href, // Mock URL
//     };
//     if (navigator.share) {
//       navigator.share(shareData)
//         .then(() => toast.success('QR code shared successfully!'))
//         .catch(() => toast.error('Error sharing QR code'));
//     } else {
//       toast.error('Sharing not supported on this device');
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-lg text-red-600">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       <Navbar />
//       <div className="flex flex-1">
//         {/* Sidebar */}
//         <aside className="w-64 bg-white shadow-md">
//           <nav className="mt-6">
//             <ul>
//               <li>
//                 <button
//                   onClick={() => navigate('/dashboard')}
//                   className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
//                 >
//                   Dashboard
//                 </button>
//               </li>
//               <li>
//                 <button
//                   onClick={() => navigate('/campaigns')}
//                   className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 font-semibold bg-gray-200"
//                 >
//                   Campaigns
//                 </button>
//               </li>
//               <li>
//                 <button
//                   onClick={() => navigate('/calendar')}
//                   className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
//                 >
//                   Calendar
//                 </button>
//               </li>
//               <li>
//                 <button
//                   onClick={() => navigate('/payments')}
//                   className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
//                 >
//                   Payments
//                 </button>
//               </li>
//               <li>
//                 <button
//                   onClick={() => navigate('/analytics')}
//                   className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
//                 >
//                   Analytics
//                 </button>
//               </li>
//               <li>
//                 <button
//                   onClick={() => navigate('/support')}
//                   className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
//                 >
//                   Support
//                 </button>
//               </li>
//             </ul>
//           </nav>
//         </aside>

//         {/* Main Content */}
//         <main className="flex-grow container mx-auto px-4 py-8">
//           <h1 className="text-3xl font-bold mb-6 text-blue-800">QR Code & Campaign Summary</h1>
//           {campaign ? (
//             <div className="bg-white rounded-lg shadow-md p-6">
//               <div className="flex justify-center mb-6">
//                 <QRCode
//                   id={`qr-code-${campaign.qrCode}`}
//                   value={campaign.qrCode}
//                   size={256}
//                   level="H"
//                   style={{ padding: '10px', background: 'white', borderRadius: '8px' }}
//                 />
//               </div>
//               <div className="flex justify-center space-x-4 mb-6">
//                 <Button
//                   className="bg-[#4261FF] hover:bg-[#6D4EFF] text-white"
//                   onClick={downloadQRCode}
//                 >
//                   Download
//                 </Button>
//                 <Button
//                   className="bg-[#4261FF] hover:bg-[#6D4EFF] text-white"
//                   onClick={printQRCode}
//                 >
//                   Print
//                 </Button>
//                 <Button
//                   className="bg-[#4261FF] hover:bg-[#6D4EFF] text-white"
//                   onClick={shareQRCode}
//                 >
//                   Share
//                 </Button>
//               </div>

//               <h2 className="text-2xl font-semibold mb-4 text-navy-800">Linked Campaigns</h2>
//               <div className="overflow-x-auto">
//                 <table className="w-full text-left border-collapse">
//                   <thead>
//                     <tr className="bg-gray-200">
//                       <th className="p-2">Campaign Name</th>
//                       <th className="p-2">Status</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr className="border-t">
//                       <td className="p-2">{campaign.name}</td>
//                       <td className="p-2">
//                         <span
//                           className={`px-2 py-1 rounded text-white text-sm ${
//                             campaign.status === 'Active'
//                               ? 'bg-green-500'
//                               : campaign.status === 'Scheduled'
//                               ? 'bg-yellow-500'
//                               : 'bg-red-500'
//                           }`}
//                         >
//                           {campaign.status}
//                         </span>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           ) : (
//             <div className="text-center">
//               <p className="text-gray-600 mb-4">No campaign found.</p>
//             </div>
//           )}
//         </main>
//       </div>
//       <Footer />
//       <ToastContainer position="bottom-right" autoClose={3000} />
//     </div>
//   );
// };

// export default CampaignSummary;



import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar'; // Import shared Sidebar
import { Button } from '../components/ui/Button';
import QRCode from 'react-qr-code';

const CampaignSummary = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { id } = useParams(); // Get campaign ID from URL
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = 'http://localhost:5000/api';

  useEffect(() => {
    console.log('CampaignSummary.jsx mounted'); // Debug log
    console.log('Campaign ID from URL:', id); // Debug log

    if (!user) {
      toast.error('Please login to access campaign summary');
      navigate('/login');
      return;
    }
    if (user.role !== 'brand') {
      toast.error('Access restricted to brands');
      navigate('/');
      return;
    }

    // Validate campaign ID format (basic check for ObjectId)
    if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
      console.log('Invalid campaign ID:', id); // Debug log
      toast.error('Invalid campaign ID');
      navigate('/dashboard'); // Redirect to dashboard
      return;
    }

    const fetchCampaign = async () => {
      try {
        const response = await axios.get(`${apiUrl}/campaigns/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setCampaign(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching campaign:', err);
        setError('Failed to load campaign details');
        setLoading(false);
        toast.error('Failed to load campaign details');
      }
    };

    fetchCampaign();
  }, [user, navigate, id]);

  const downloadQRCode = () => {
    if (!campaign) return;
    const svg = document.getElementById(`qr-code-${campaign.qrCode}`);
    if (!svg) {
      toast.error('QR code not found');
      return;
    }
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngUrl = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = `qr-code-${campaign.qrCode}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      toast.success(`QR code ${campaign.qrCode} downloaded!`);
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  const printQRCode = () => {
    if (!campaign) return;
    const svg = document.getElementById(`qr-code-${campaign.qrCode}`);
    if (!svg) {
      toast.error('QR code not found');
      return;
    }
    const svgData = new XMLSerializer().serializeToString(svg);
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <body>
          <img src="data:image/svg+xml;base64,${btoa(svgData)}" onload="window.print();window.close()" />
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const shareQRCode = () => {
    if (!campaign) return;
    const shareData = {
      title: 'BLookPerks QR Code',
      text: `Check out this QR code for ${campaign.name}!`,
      url: window.location.href, // Mock URL
    };
    if (navigator.share) {
      navigator.share(shareData)
        .then(() => toast.success('QR code shared successfully!'))
        .catch(() => toast.error('Error sharing QR code'));
    } else {
      toast.error('Sharing not supported on this device');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar activePage="campaigns" />

        {/* Main Content */}
        <main className="flex-grow container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 text-blue-800">QR Code & Campaign Summary</h1>
          {campaign ? (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-center mb-6">
                <QRCode
                  id={`qr-code-${campaign.qrCode}`}
                  value={campaign.qrCode}
                  size={256}
                  level="H"
                  style={{ padding: '10px', background: 'white', borderRadius: '8px' }}
                />
              </div>
              <div className="flex justify-center space-x-4 mb-6">
                <Button
                  className="bg-[#4261FF] hover:bg-[#6D4EFF] text-white"
                  onClick={downloadQRCode}
                >
                  Download
                </Button>
                <Button
                  className="bg-[#4261FF] hover:bg-[#6D4EFF] text-white"
                  onClick={printQRCode}
                >
                  Print
                </Button>
                <Button
                  className="bg-[#4261FF] hover:bg-[#6D4EFF] text-white"
                  onClick={shareQRCode}
                >
                  Share
                </Button>
              </div>

              <h2 className="text-2xl font-semibold mb-4 text-navy-800">Linked Campaigns</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="p-2">Campaign Name</th>
                      <th className="p-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="p-2">{campaign.name}</td>
                      <td className="p-2">
                        <span
                          className={`px-2 py-1 rounded text-white text-sm ${
                            campaign.status === 'Active'
                              ? 'bg-green-500'
                              : campaign.status === 'Scheduled'
                              ? 'bg-yellow-500'
                              : 'bg-red-500'
                          }`}
                        >
                          {campaign.status}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-gray-600 mb-4">No campaign found.</p>
            </div>
          )}
        </main>
      </div>
      <Footer />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default CampaignSummary;