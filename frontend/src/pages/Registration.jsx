// import { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Footer from '../components/Footer';
// import { Button } from '../components/ui/Button';
// import Navbar from '../components/Navbar';
// import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';

// const Registration = () => {
//   const apikey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
//   const mapId = import.meta.env.VITE_GOOGLE_MAPS_MAP_ID;
//   const apiUrl = import.meta.env.VITE_API_URL;

//   const { user } = useSelector((state) => state.user);
//   const navigate = useNavigate();
//   const [showLoginPopup, setShowLoginPopup] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [locationError, setLocationError] = useState('');
//   const [showMapModal, setShowMapModal] = useState(false);
//   const [markerPosition, setMarkerPosition] = useState(null);
//   const [formData, setFormData] = useState({
//     spaceType: '',
//     businessName: '',
//     address: '',
//     city: '',
//     landmark: '',
//     weekdayFootfall: '',
//     weekendFootfall: '',
//     brandingAreaSize: '',
//     hasCCTV: '',
//     cameraCount: '',
//     cameraAligned: '',
//     accountNumber: '',
//     ifscCode: '',
//     upiId: '',
//     panNumber: '',
//     gstNumber: '',
//     heatMapping: '',
//     listingType: 'free',
//     preferredTiming: '',
//     termsAccepted: false,
//     exteriorPhoto: null,
//     interiorPhoto: null,
//     brandingZonePhoto: null,
//     latitude: '',
//     longitude: '',
//     price:'',
//   });

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (!user) {
//         setShowLoginPopup(true);
//       }
//     }, 5000);

//     return () => clearTimeout(timer);
//   }, [user]);

//   const handleLoginRedirect = () => {
//     navigate('/login');
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   const handleFileUpload = (e, fieldName) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (!['image/jpeg', 'image/png'].includes(file.type)) {
//         toast.error('Please upload only JPG or PNG files');
//         return;
//       }
//       if (file.size > 2 * 1024 * 1024) {
//         toast.error('File size should be less than 2MB');
//         return;
//       }

//       setFormData((prev) => ({
//         ...prev,
//         [fieldName]: file,
//       }));
//     }
//   };

//   const handleGetLocation = () => {
//     if (navigator.geolocation) {
//       setLocationError('');
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setFormData((prev) => ({
//             ...prev,
//             latitude: position.coords.latitude.toString(),
//             longitude: position.coords.longitude.toString(),
//           }));
//           toast.success('Location captured successfully!');
//         },
//         (error) => {
//           let errorMessage = 'Unable to retrieve location.';
//           switch (error.code) {
//             case error.PERMISSION_DENIED:
//               errorMessage = 'Location access denied. Please allow location permissions.';
//               break;
//             case error.POSITION_UNAVAILABLE:
//               errorMessage = 'Location information is unavailable.';
//               break;
//             case error.TIMEOUT:
//               errorMessage = 'Location request timed out.';
//               break;
//             default:
//               errorMessage = 'An error occurred while retrieving location.';
//               break;
//           }
//           setLocationError(errorMessage);
//           toast.error(errorMessage);
//         }
//       );
//     } else {
//       const errorMessage = 'Geolocation is not supported by this browser.';
//       setLocationError(errorMessage);
//       toast.error(errorMessage);
//     }
//   };

//   const handleOpenMapModal = () => {
//     setShowMapModal(true);
//     setLocationError('');
//   };

//   const handleMapClick = (event) => {
//     if (event.detail.latLng) {
//       const newPosition = {
//         lat: event.detail.latLng.lat,
//         lng: event.detail.latLng.lng,
//       };
//       setMarkerPosition(newPosition);
//       console.log('Marker position set to:', newPosition);
//     } else {
//       console.error('Could not retrieve latLng from event:', event);
//     }
//   };

//   const handleMarkerDrag = (event) => {
//     setMarkerPosition({
//       lat: event.latLng.lat(),
//       lng: event.latLng.lng(),
//     });
//   };

//   const handleConfirmLocation = () => {
//     if (markerPosition) {
//       setFormData((prev) => {
//         const updatedFormData = {
//           ...prev,
//           latitude: markerPosition.lat.toString(),
//           longitude: markerPosition.lng.toString(),
//         };
//         console.log('Updated formData with location:', updatedFormData);
//         return updatedFormData;
//       });
//       toast.success('Location pinned successfully!');
//       setShowMapModal(false);
//       setMarkerPosition(null);
//     } else {
//       toast.error('Please select a location on the map');
//     }
//   };

//   const handleCloseMapModal = () => {
//     setShowMapModal(false);
//     setMarkerPosition(null);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     console.log('User from Redux:', user);
//     if (!user || !user.id) {
//       setShowLoginPopup(true);
//       toast.error('Please log in to submit the form');
//       return;
//     }

//     // Validate required fields
//     if (!formData.spaceType || !formData.businessName || !formData.address || !formData.city || !formData.landmark) {
//       toast.error('Please fill all required fields');
//       return;
//     }
//     if (!formData.weekdayFootfall || !formData.weekendFootfall || !formData.brandingAreaSize) {
//       toast.error('Please provide footfall and branding area details');
//       return;
//     }
//     if (!formData.hasCCTV) {
//       toast.error('Please specify if CCTV is available');
//       return;
//     }
    
//     if (formData.hasCCTV === 'yes' && (!formData.cameraCount || !formData.cameraAligned)) {
//       toast.error('Please provide CCTV details');
//       return;
//     }
//     if (!formData.accountNumber || !formData.ifscCode || !formData.panNumber) {
//       toast.error('Please provide bank and compliance details');
//       return;
//     }
//     if (!formData.exteriorPhoto || !formData.interiorPhoto || !formData.brandingZonePhoto) {
//       toast.error('Please upload all required photos');
//       return;
//     }
//     if (!formData.latitude || !formData.longitude) {
//       toast.error('Please select a location using "Get Current Location" or "Select Location on Map"');
//       return;
//     }
//     const lat = parseFloat(formData.latitude);
//     const lon = parseFloat(formData.longitude);
//     if (isNaN(lat) || isNaN(lon)) {
//       toast.error('Invalid latitude or longitude values');
//       return;
//     }
//     if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
//       toast.error('Latitude or longitude out of valid range');
//       return;
//     }
//     if (!formData.termsAccepted) {
//       toast.error('Please accept the terms and conditions');
//       return;
//     }

//     const token = localStorage.getItem('token');
//     console.log('Token:', token);
//     if (!token) {
//       toast.error('Authentication token is missing. Please log in again.');
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const formDataToSend = new FormData();
//       Object.keys(formData).forEach((key) => {
//         const value = key === 'termsAccepted' ? String(formData[key]) : formData[key];
//         if (value) {
//           formDataToSend.append(key, value);
//         }
//       });
//       formDataToSend.append('userId', user.id);

//       // Log FormData for debugging
//       console.log('FormData entries:');
//       for (let pair of formDataToSend.entries()) {
//         console.log(`${pair[0]}: ${pair[1]}`);
//       }

//       const response = await axios.post(
//         `http://localhost:5000/api/spaces/register`,
//         formDataToSend,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       toast.success('Space registered successfully!');
//       setFormData({
//         spaceType: '',
//         businessName: '',
//         address: '',
//         city: '',
//         landmark: '',
//         weekdayFootfall: '',
//         weekendFootfall: '',
//         brandingAreaSize: '',
//         hasCCTV: '',
//         cameraCount: '',
//         cameraAligned: '',
//         accountNumber: '',
//         ifscCode: '',
//         upiId: '',
//         price:'',
//         panNumber: '',
//         gstNumber: '',
//         heatMapping: '',
//         listingType: 'free',
//         preferredTiming: '',
//         termsAccepted: false,
//         exteriorPhoto: null,
//         interiorPhoto: null,
//         brandingZonePhoto: null,
//         latitude: '',
//         longitude: '',
//         // price:'',
//       });
//       setLocationError('');
//       navigate('/dashboard');
//     } catch (error) {
//       console.error('Registration error:', error);
//       const errorMessage =
//         error.response?.data?.message ||
//         error.message ||
//         'Registration failed. Please try again.';
//       toast.error(errorMessage);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Check if form is valid for submit button
//   const isFormValid = () =>
//     formData.spaceType &&
//     formData.businessName &&
//     formData.address &&
//     formData.city &&
//     formData.landmark &&
//     formData.weekdayFootfall &&
//     formData.weekendFootfall &&
//     formData.brandingAreaSize &&
//     formData.hasCCTV &&
//     (formData.hasCCTV !== 'yes' || (formData.cameraCount && formData.cameraAligned)) &&
//     formData.accountNumber &&
//     formData.price &&
//     formData.ifscCode &&
//     formData.panNumber &&
//     formData.exteriorPhoto &&
//     formData.interiorPhoto &&
//     formData.brandingZonePhoto &&
    
//     formData.latitude &&
//     formData.longitude &&
//     parseFloat(formData.latitude) >= -90 &&
//     parseFloat(formData.latitude) <= 90 &&
//     parseFloat(formData.longitude) >= -180 &&
//     parseFloat(formData.longitude) <= 180 &&
//     formData.termsAccepted &&
//     !isSubmitting;

//   const renderFileUpload = (fieldName, label) => (
//     <div>
//       <label className="block text-sm font-medium text-gray-700 mb-1">
//         {label} <span className="text-red-500">*</span>
//       </label>
//       <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
//         <input
//           type="file"
//           accept="image/jpeg, image/png"
//           onChange={(e) => handleFileUpload(e, fieldName)}
//           className="hidden"
//           id={fieldName}
//           aria-label={`Upload ${label}`}
//         />
//         <label htmlFor={fieldName} className="cursor-pointer">
//           <div className="flex justify-center">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-12 w-12 text-gray-400"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
//               />
//             </svg>
//           </div>
//           <p className="mt-2 text-sm text-gray-500">
//             {formData[fieldName] ? formData[fieldName].name : 'Click to upload or drag and drop'}
//           </p>
//           <p className="mt-1 text-xs text-gray-500">JPG or PNG (Max. 2MB)</p>
//         </label>
//       </div>
//     </div>
//   );

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen flex flex-col">
//         {showLoginPopup && !user && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full mx-4">
//               <h2 className="text-xl font-bold mb-4 text-center">Login Required</h2>
//               <p className="text-gray-600 mb-6 text-center">
//                 Please login to list your space. You will be redirected to the login page.
//               </p>
//               <div className="flex justify-center">
//                 <Button
//                   onClick={handleLoginRedirect}
//                   className="bg-[#4261FF] hover:bg-[#6D4EFF] text-white px-4 py-2 rounded"
//                 >
//                   Go to Login
//                 </Button>
//               </div>
//             </div>
//           </div>
//         )}

//         {showMapModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-[90vw] max-h-[80vh] mx-4 flex flex-col">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-bold">Select Location</h2>
//                 <Button
//                   onClick={handleCloseMapModal}
//                   className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
//                   aria-label="Close Map Modal"
//                 >
//                   Close
//                 </Button>
//               </div>
//               <div className="flex-grow w-full" style={{ height: '60vh' }}>
//                 {apikey && mapId ? (
//                   <APIProvider apiKey={apikey}>
//                     <Map
//                       defaultCenter={{ lat: 28.6139, lng: 77.2090 }}
//                       defaultZoom={13}
//                       mapTypeId="roadmap" // Options: 'roadmap', 'satellite', 'hybrid', 'terrain'
//                       mapId={mapId}
//                       onClick={handleMapClick}
//                       gestureHandling="greedy"
//                       style={{ height: '100%', width: '100%' }}
//                     >
//                       {markerPosition && (
//                         <AdvancedMarker
//                           position={markerPosition}
//                           draggable={true}
//                           onDragEnd={handleMarkerDrag}
//                         >
//                           <Pin background="#FBBC04" glyphColor="#000" borderColor="#000" />
//                         </AdvancedMarker>
//                       )}
//                     </Map>
//                   </APIProvider>
//                 ) : (
//                   <p className="text-red-600">
//                     {apikey ? 'Map ID is missing.' : 'Google Maps API key is missing.'}
//                   </p>
//                 )}
//               </div>
//               <div className="mt-4 flex justify-end">
//                 <Button
//                   onClick={handleConfirmLocation}
//                   className="bg-[#4261FF] hover:bg-[#6D4EFF] text-white px-4 py-2 rounded"
//                   aria-label="Confirm Location"
//                 >
//                   Confirm Location
//                 </Button>
//               </div>
//             </div>
//           </div>
//         )}

//         <main className="flex-grow text-black placeholder:text-black">
//           <section className="bg-gradient-to-r from-white to-[#D9D9F3] py-16">
//             <div className="container mx-auto px-4 text-center">
//               <h1 className="text-4xl font-bold mb-4">List Your Space</h1>
//               <p className="text-xl text-gray-700 max-w-2xl mx-auto">
//                 Start monetizing your unused space in minutes. Fill out the form below to get started.
//               </p>
//             </div>
//           </section>

//           <section className="py-16 bg-white">
//             <div className="container mx-auto px-4">
//               <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
//                 <div className="p-8">
//                   <h2 className="text-2xl font-bold mb-6">Space Registration Form</h2>
//                   <form onSubmit={handleSubmit} className="space-y-6">
//                     <div>
//                       <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">
//                         Space Details
//                       </h3>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Type of Space <span className="text-red-500">*</span>
//                           </label>
//                           <select
//                             name="spaceType"
//                             value={formData.spaceType}
//                             onChange={handleChange}
//                             required
//                             className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                             aria-label="Type of Space"
//                           >
//                             <option value="">Select your space type</option>
//                             <option value="retail">Retail Store</option>
//                             <option value="restaurant">Restaurant/Café</option>
//                             <option value="society">Residential Society</option>
//                             <option value="office">Office Space</option>
//                             <option value="clinic">Clinic/Hospital</option>
//                             <option value="gym">Gym</option>
//                             <option value="salon">Salon</option>
//                             <option value="other">Other</option>
//                           </select>
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Business Name <span className="text-red-500">*</span>
//                           </label>
//                           <input
//                             type="text"
//                             name="businessName"
//                             value={formData.businessName}
//                             onChange={handleChange}
//                             required
//                             className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                             placeholder="Your Business Name"
//                             aria-label="Business Name"
//                           />
//                         </div>
//                       </div>

//                       <div className="mt-4">
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Address with PIN Code <span className="text-red-500">*</span>
//                         </label>
//                         <textarea
//                           name="address"
//                           value={formData.address}
//                           onChange={handleChange}
//                           required
//                           className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                           rows={3}
//                           placeholder="Complete address with PIN code"
//                           aria-label="Address with PIN Code"
//                         ></textarea>
//                       </div>

//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             City <span className="text-red-500">*</span>
//                           </label>
//                           <input
//                             type="text"
//                             name="city"
//                             value={formData.city}
//                             onChange={handleChange}
//                             required
//                             className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                             placeholder="City"
//                             aria-label="City"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Nearby Landmark <span className="text-red-500">*</span>
//                           </label>
//                           <input
//                             type="text"
//                             name="landmark"
//                             value={formData.landmark}
//                             onChange={handleChange}
//                             required
//                             className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                             placeholder="Landmark for easy location"
//                             aria-label="Nearby Landmark"
//                           />
//                         </div>
//                       </div>

//                       <div className="mt-4">
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Location Coordinates <span className="text-red-500">*</span>
//                         </label>
//                         <div className="flex flex-col sm:flex-row gap-2 mb-2">
//                           <Button
//                             type="button"
//                             onClick={handleGetLocation}
//                             className="bg-[#4261FF] hover:bg-[#6D4EFF] text-white px-4 py-2 rounded"
//                             aria-label="Get Current Location"
//                           >
//                             Get Current Location
//                           </Button>
//                           <Button
//                             type="button"
//                             onClick={handleOpenMapModal}
//                             className="bg-[#4261FF] hover:bg-[#6D4EFF] text-white px-4 py-2 rounded"
//                             aria-label="Select Location on Map"
//                           >
//                             Select Location on Map
//                           </Button>
//                         </div>
//                         {formData.latitude && formData.longitude ? (
//                           <p className="text-sm text-gray-600">
//                             Latitude: {formData.latitude}, Longitude: {formData.longitude}
//                           </p>
//                         ) : locationError ? (
//                           <p className="text-sm text-red-600">{locationError}</p>
//                         ) : (
//                           <p className="text-sm text-gray-500">
//                             Please select a location using one of the buttons above
//                           </p>
//                         )}
//                       </div>

//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Weekday Footfall (Approx.) <span className="text-red-500">*</span>
//                           </label>
//                           <input
//                             type="number"
//                             name="weekdayFootfall"
//                             value={formData.weekdayFootfall}
//                             onChange={handleChange}
//                             required
//                             className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                             placeholder="Average daily visitors"
//                             aria-label="Weekday Footfall"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Weekend Footfall (Approx.) <span className="text-red-500">*</span>
//                           </label>
//                           <input
//                             type="number"
//                             name="weekendFootfall"
//                             value={formData.weekendFootfall}
//                             onChange={handleChange}
//                             required
//                             className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                             placeholder="Average weekend visitors"
//                             aria-label="Weekend Footfall"
//                           />
//                         </div>
//                       </div>
//                     </div>

//                     <div>
//                       <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">
//                         Upload Photos
//                       </h3>
//                       <div className="space-y-4">
//                         {renderFileUpload('exteriorPhoto', 'Exterior Photo')}
//                         {renderFileUpload('interiorPhoto', 'Interior Photo')}
//                         {renderFileUpload('brandingZonePhoto', 'Branding Zone Photo')}
//                       </div>

//                       <div className="mt-4">
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Branding Area Size (in sq.ft) <span className="text-red-500">*</span>
//                         </label>
//                         <input
//                           type="text"
//                           name="brandingAreaSize"
//                           value={formData.brandingAreaSize}
//                           onChange={handleChange}
//                           required
//                           className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                           placeholder="e.g., Wall: 8×6 ft, Menu: A4 size"
//                           aria-label="Branding Area Size"
//                         />
//                       </div>
//                       <div className="mt-4">
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Price (Monthly) <span className="text-red-500">*</span>
//                         </label>
//                         <div className='flex items-center gap-4'>
//                           <p>Rs</p>
//                         <input
//                           type="number"
//                           size={10}
//                           name="price"
//                           value={formData.price}
//                           onChange={handleChange}
//                           required
//                           className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                           placeholder="Rs 1000"
//                           aria-label="price"
//                         />


//                         </div>
                    
//                       </div>
//                     </div>

//                     <div>
//                       <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">
//                         Heat Mapping Info
//                       </h3>
//                       <div className="space-y-4">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Do you have CCTV cameras? <span className="text-red-500">*</span>
//                           </label>
//                           <select
//                             name="hasCCTV"
//                             value={formData.hasCCTV}
//                             onChange={handleChange}
//                             required
//                             className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                             aria-label="CCTV Cameras"
//                           >
//                             <option value="">Select</option>
//                             <option value="yes">Yes</option>
//                             <option value="no">No</option>
//                           </select>
//                         </div>

//                         {formData.hasCCTV === 'yes' && (
//                           <>
//                             <div>
//                               <label className="block text-sm font-medium text-gray-700 mb-1">
//                                 How many cameras installed? <span className="text-red-500">*</span>
//                               </label>
//                               <input
//                                 type="number"
//                                 name="cameraCount"
//                                 value={formData.cameraCount}
//                                 onChange={handleChange}
//                                 required
//                                 className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                                 placeholder="Number of cameras"
//                                 aria-label="Number of Cameras"
//                               />
//                             </div>
//                             <div>
//                               <label className="block text-sm font-medium text-gray-700 mb-1">
//                                 Are camera views aligned with branding zones?{' '}
//                                 <span className="text-red-500">*</span>
//                               </label>
//                               <select
//                                 name="cameraAligned"
//                                 value={formData.cameraAligned}
//                                 onChange={handleChange}
//                                 required
//                                 className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                                 aria-label="Camera Alignment with Branding Zones"
//                               >
//                                 <option value="">Select</option>
//                                 <option value="yes">Yes</option>
//                                 <option value="no">No</option>
//                                 <option value="unsure">Not sure</option>
//                               </select>
//                             </div>
//                           </>
//                         )}
//                       </div>
//                     </div>

//                     <div>
//                       <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">
//                         Bank & Compliance Details
//                       </h3>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Bank Account Number <span className="text-red-500">*</span>
//                           </label>
//                           <input
//                             type="text"
//                             name="accountNumber"
//                             value={formData.accountNumber}
//                             onChange={handleChange}
//                             required
//                             className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                             placeholder="Account number"
//                             aria-label="Bank Account Number"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             IFSC Code <span className="text-red-500">*</span>
//                           </label>
//                           <input
//                             type="text"
//                             name="ifscCode"
//                             value={formData.ifscCode}
//                             onChange={handleChange}
//                             required
//                             className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                             placeholder="IFSC code"
//                             aria-label="IFSC Code"
//                           />
//                         </div>
//                       </div>

//                       <div className="mt-4">
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           UPI ID (Optional)
//                         </label>
//                         <input
//                           type="text"
//                           name="upiId"
//                           value={formData.upiId}
//                           onChange={handleChange}
//                           className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                           placeholder="UPI ID for payments"
//                           aria-label="UPI ID"
//                         />
//                       </div>

//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             PAN Number <span className="text-red-500">*</span>
//                           </label>
//                           <input
//                             type="text"
//                             name="panNumber"
//                             value={formData.panNumber}
//                             onChange={handleChange}
//                             required
//                             className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                             placeholder="PAN number"
//                             aria-label="PAN Number"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             GST Number (Optional)
//                           </label>
//                           <input
//                             type="text"
//                             name="gstNumber"
//                             value={formData.gstNumber}
//                             onChange={handleChange}
//                             className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                             placeholder="GST number if applicable"
//                             aria-label="GST Number"
//                           />
//                         </div>
//                       </div>
//                     </div>

//                     <div>
//                       <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">
//                         Preferences
//                       </h3>
//                       <div className="space-y-4">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Willing to try Heat Mapping?
//                           </label>
//                           <select
//                             name="heatMapping"
//                             value={formData.heatMapping}
//                             onChange={handleChange}
//                             className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                             aria-label="Heat Mapping Preference"
//                           >
//                             <option value="">Select</option>
//                             <option value="yes">Yes</option>
//                             <option value="no">No</option>
//                           </select>
//                         </div>

//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Listing Type
//                           </label>
//                           <select
//                             name="listingType"
//                             value={formData.listingType}
//                             onChange={handleChange}
//                             className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                             aria-label="Listing Type"
//                           >
//                             <option value="free">Free Listing</option>
//                             <option value="premium">Premium Listing (₹999/month)</option>
//                           </select>
//                         </div>

//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Preferred days/times for branding (Optional)
//                           </label>
//                           <input
//                             type="text"
//                             name="preferredTiming"
//                             value={formData.preferredTiming}
//                             onChange={handleChange}
//                             className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                             placeholder="e.g., All days, weekends only, etc."
//                             aria-label="Preferred Branding Timing"
//                           />
//                         </div>

//                         <div className="flex items-center">
//                           <input
//                             id="terms"
//                             name="termsAccepted"
//                             type="checkbox"
//                             checked={formData.termsAccepted}
//                             onChange={handleChange}
//                             required
//                             className="h-4 w-4 text-[#4261FF] border-gray-300 rounded focus:ring-[#4261FF]"
//                             aria-label="Accept Terms and Conditions"
//                           />
//                           <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
//                             I agree to the Terms of Service and understand the platform's 25% commission
//                             structure <span className="text-red-500">*</span>
//                           </label>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="pt-4">
//                       <Button
//                         type="submit"
//                         className="w-full bg-[#6D4EFF] hover:bg-[#4261FF]"
//                         size="lg"
//                         disabled={!isFormValid()}
//                       >
//                         {isSubmitting ? 'Submitting...' : 'Submit Registration'}
//                       </Button>
//                       <p className="text-center text-sm text-gray-500 mt-4">
//                         Your space will be reviewed and verified within 48-72 hours
//                       </p>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </section>
//         </main>

//         <Footer />
//       </div>
//     </>
//   );
// };

// export default Registration;



//[art 2 space model]//
// /// src/pages/Registration.jsx
// import { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Footer from '../components/Footer';
// import { Button } from '../components/ui/Button';
// import Navbar from '../components/Navbar';
// import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';

// // Registration page for space owners to list their spaces
// const Registration = () => {
//   const apikey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
//   const mapId = import.meta.env.VITE_GOOGLE_MAPS_MAP_ID;
//   const apiUrl = import.meta.env.VITE_API_URL;

//   const { user } = useSelector((state) => state.user);
//   const navigate = useNavigate();

//   // State variables
//   const [showLoginPopup, setShowLoginPopup] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [locationError, setLocationError] = useState('');
//   const [showMapModal, setShowMapModal] = useState(false);
//   const [markerPosition, setMarkerPosition] = useState(null);
//   const [watchId, setWatchId] = useState(null);
//   const [spaceCount, setSpaceCount] = useState(null);
//   const [showPopup, setShowPopup] = useState(false); // For showing the popup
//   const [listingType, setListingType] = useState('free'); // To store listing type for popup
//   const [formData, setFormData] = useState({
//     spaceType: '',
//     businessName: '',
//     managerName: '',
//     phone: '',
//     email: '',
//     address: '',
//     city: '',
//     pincode: '',
//     landmark: '',
//     latitude: '',
//     longitude: '',
//     price: '',
//     bankDetails: {
//       accountNumber: '',
//       ifscCode: '',
//       bankName: '',
//       accountHolderName: '',
//     },
//     agentId: '',
//     weekdayFootfall: '',
//     weekendFootfall: '',
//     brandingAreaSize: '',
//     hasCCTV: '',
//     cameraCount: '',
//     cameraAligned: '',
//     panNumber: '',
//     gstNumber: '',
//     heatMapping: '',
//     listingType: 'free',
//     preferredTiming: '',
//     photos: [],
//   });

//   // Fetch spaceCount on component mount if user is logged in
//   useEffect(() => {
//     if (user && user.id) {
//       setFormData((prev) => ({ ...prev, agentId: user.id }));
//       const fetchSpaceCount = async () => {
//         try {
//           const token = localStorage.getItem('token');
//           if (!token) {
//             toast.error('Authentication token missing. Please log in again.');
//             return;
//           }
//           const userResponse = await axios.get(`${apiUrl}/users/me`, {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//           setSpaceCount(userResponse.data.data.user?.spaceCount || 0);
//         } catch (error) {
//           console.error('Failed to fetch spaceCount:', error);
//           setSpaceCount(0);
//           toast.error('Failed to fetch user data. Please try again.');
//         }
//       };
//       fetchSpaceCount();
//     }

//     const timer = setTimeout(() => {
//       if (!user) {
//         setShowLoginPopup(true);
//       }
//     }, 5000);

//     if (navigator.geolocation) {
//       const id = navigator.geolocation.watchPosition(
//         (position) => {
//           const lat = position.coords.latitude;
//           const lng = position.coords.longitude;
//           setFormData((prev) => ({
//             ...prev,
//             latitude: lat.toString(),
//             longitude: lng.toString(),
//           }));
//           setMarkerPosition({ lat, lng });
//           toast.success('Live location captured successfully!');
//           navigator.geolocation.clearWatch(id);
//           setWatchId(null);
//         },
//         (error) => {
//           let errorMessage = 'Unable to retrieve location.';
//           switch (error.code) {
//             case error.PERMISSION_DENIED:
//               errorMessage = 'Location access denied. Please allow location permissions.';
//               break;
//             case error.POSITION_UNAVAILABLE:
//               errorMessage = 'Location information is unavailable.';
//               break;
//             case error.TIMEOUT:
//               errorMessage = 'Location request timed out.';
//               break;
//           }
//           setLocationError(errorMessage);
//           toast.error(errorMessage);
//         },
//         { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 }
//       );
//       setWatchId(id);
//     } else {
//       const errorMessage = 'Geolocation is not supported by this browser.';
//       setLocationError(errorMessage);
//       toast.error(errorMessage);
//     }

//     return () => {
//       clearTimeout(timer);
//       if (watchId) {
//         navigator.geolocation.clearWatch(watchId);
//       }
//     };
//   }, [user]);

//   // Redirect to login page if user is not logged in
//   const handleLoginRedirect = () => {
//     navigate('/login');
//   };

//   // Handle form input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name.startsWith('bankDetails.')) {
//       const field = name.split('.')[1];
//       setFormData((prev) => ({
//         ...prev,
//         bankDetails: {
//           ...prev.bankDetails,
//           [field]: value,
//         },
//       }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   // Handle photo uploads
//   const handleFileUpload = (e) => {
//     const files = Array.from(e.target.files);
//     const validFiles = files.filter((file) => {
//       if (!['image/jpeg', 'image/png'].includes(file.type)) {
//         toast.error(`${file.name}: Please upload only JPG or PNG files`);
//         return false;
//       }
//       if (file.size > 2 * 1024 * 1024) {
//         toast.error(`${file.name}: File size should be less than 2MB`);
//         return false;
//       }
//       return true;
//     });

//     Promise.all(
//       validFiles.map((file) => {
//         return new Promise((resolve, reject) => {
//           const reader = new FileReader();
//           reader.onloadend = () => resolve(reader.result);
//           reader.onerror = reject;
//           reader.readAsDataURL(file);
//         });
//       })
//     )
//       .then((base64Images) => {
//         setFormData((prev) => ({
//           ...prev,
//           photos: [...prev.photos, ...base64Images],
//         }));
//         toast.success(`${validFiles.length} photo(s) uploaded successfully!`);
//       })
//       .catch((err) => {
//         console.error('Failed to convert photos to Base64:', err);
//         toast.error('Failed to process photos. Please try again.');
//       });
//   };

//   // Remove a photo from the uploaded list
//   const handleRemovePhoto = (index) => {
//     setFormData((prev) => ({
//       ...prev,
//       photos: prev.photos.filter((_, i) => i !== index),
//     }));
//     toast.info('Photo removed successfully!');
//   };

//   // Open Google Maps modal for location selection
//   const handleOpenMapModal = () => {
//     setShowMapModal(true);
//     setLocationError('');
//     if (formData.latitude && formData.longitude) {
//       setMarkerPosition({
//         lat: parseFloat(formData.latitude),
//         lng: parseFloat(formData.longitude),
//       });
//     } else {
//       toast.info('No location set yet. Please select a location on the map.');
//     }
//   };

//   // Handle map click to set location
//   const handleMapClick = (event) => {
//     if (event.detail.latLng) {
//       const lat = event.detail.latLng.lat;
//       const lng = event.detail.latLng.lng;
//       setMarkerPosition({ lat, lng });
//       setFormData((prev) => ({
//         ...prev,
//         latitude: lat.toString(),
//         longitude: lng.toString(),
//       }));
//     }
//   };

//   // Handle marker drag to update location
//   const handleMarkerDrag = (event) => {
//     const lat = event.latLng.lat();
//     const lng = event.latLng.lng();
//     setMarkerPosition({ lat, lng });
//     setFormData((prev) => ({
//       ...prev,
//       latitude: lat.toString(),
//       longitude: lng.toString(),
//     }));
//   };

//   // Confirm location from map modal
//   const handleConfirmLocation = () => {
//     if (markerPosition) {
//       setFormData((prev) => ({
//         ...prev,
//         latitude: markerPosition.lat.toString(),
//         longitude: markerPosition.lng.toString(),
//       }));
//       toast.success(
//         `Location of space is set to: Latitude: ${markerPosition.lat}, Longitude: ${markerPosition.lng}`
//       );
//       setShowMapModal(false);
//     } else {
//       toast.error('Please select a location on the map');
//     }
//   };

//   // Close map modal without saving
//   const handleCloseMapModal = () => {
//     setShowMapModal(false);
//     setMarkerPosition(null);
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!user || !user.id) {
//       setShowLoginPopup(true);
//       toast.error('Please log in to submit the form');
//       return;
//     }

//     if (
//       !formData.spaceType ||
//       !formData.businessName ||
//       !formData.managerName ||
//       !formData.phone ||
//       !formData.address ||
//       !formData.city ||
//       !formData.pincode ||
//       !formData.price ||
//       formData.photos.length === 0
//     ) {
//       toast.error('Please fill all required fields');
//       return;
//     }

//     if (formData.hasCCTV === 'yes' && (!formData.cameraCount || !formData.cameraAligned)) {
//       toast.error('Please provide CCTV details');
//       return;
//     }

//     if (!formData.latitude || !formData.longitude) {
//       toast.error('Please select a location on the map');
//       return;
//     }
//     const lat = parseFloat(formData.latitude);
//     const lon = parseFloat(formData.longitude);
//     if (isNaN(lat) || isNaN(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
//       toast.error('Invalid latitude or longitude values');
//       return;
//     }

//     const token = localStorage.getItem('token');
//     if (!token) {
//       toast.error('Authentication token is missing. Please log in again.');
//       return;
//     }

//     if (isSubmitting) {
//       toast.info('Submission in progress. Please wait...');
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const spaceData = {
//         name: formData.businessName || undefined,
//         type: formData.spaceType || undefined,
//         managerName: formData.managerName || undefined,
//         phone: formData.phone || undefined,
//         email: formData.email || undefined,
//         address: formData.address || undefined,
//         city: formData.city || undefined,
//         pincode: formData.pincode || undefined,
//         landmark: formData.landmark || undefined,
//         location: {
//           coordinates: [parseFloat(formData.longitude), parseFloat(formData.latitude)],
//         },
//         weekdayFootfall: formData.weekdayFootfall ? Number(formData.weekdayFootfall) : undefined,
//         weekendFootfall: formData.weekendFootfall ? Number(formData.weekendFootfall) : undefined,
//         brandingAreaSize: formData.brandingAreaSize || undefined,
//         hasCCTV: formData.hasCCTV || undefined,
//         cameraCount: formData.cameraCount ? Number(formData.cameraCount) : undefined,
//         cameraAligned: formData.cameraAligned || undefined,
//         complianceDetails: {
//           panNumber: formData.panNumber || undefined,
//           gstNumber: formData.gstNumber || undefined,
//         },
//         heatMapping: formData.heatMapping || undefined,
//         listingType: formData.listingType || 'free',
//         preferredTiming: formData.preferredTiming || undefined,
//         photos: formData.photos || [],
//         price: formData.price ? Number(formData.price) : undefined,
//         agentId: formData.agentId || undefined,
//       };

//       if (spaceCount === 0) {
//         if (
//           !formData.bankDetails.accountNumber ||
//           !formData.bankDetails.ifscCode ||
//           !formData.bankDetails.bankName ||
//           !formData.bankDetails.accountHolderName
//         ) {
//           toast.error('All bank details are required for your first space');
//           setIsSubmitting(false);
//           return;
//         }
//         spaceData.bankDetails = {
//           accountNumber: formData.bankDetails.accountNumber || undefined,
//           ifscCode: formData.bankDetails.ifscCode || undefined,
//           bankName: formData.bankDetails.bankName || undefined,
//           accountHolderName: formData.bankDetails.accountHolderName || undefined,
//         };
//       }

//       console.log('Sending space data to backend:', spaceData);
//       const spaceResponse = await axios.post(`${apiUrl}/spaces`, spaceData, {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       console.log('Space creation response:', spaceResponse.data);

//       // Set listing type and show popup
//       setListingType(formData.listingType);
//       setShowPopup(true);

//       // If free listing, reset form and navigate after popup
//       if (formData.listingType === 'free') {
//         setFormData({
//           spaceType: '',
//           businessName: '',
//           managerName: '',
//           phone: '',
//           email: '',
//           address: '',
//           city: '',
//           pincode: '',
//           landmark: '',
//           latitude: '',
//           longitude: '',
//           price: '',
//           bankDetails: {
//             accountNumber: '',
//             ifscCode: '',
//             bankName: '',
//             accountHolderName: '',
//           },
//           agentId: user?.id || '',
//           weekdayFootfall: '',
//           weekendFootfall: '',
//           brandingAreaSize: '',
//           hasCCTV: '',
//           cameraCount: '',
//           cameraAligned: '',
//           panNumber: '',
//           gstNumber: '',
//           heatMapping: '',
//           listingType: 'free',
//           preferredTiming: '',
//           photos: [],
//         });
//       }
//     } catch (error) {
//       console.error('Submission error:', error);
//       if (error.response) {
//         console.error('Error response:', error.response.data);
//         console.error('Error status:', error.response.status);
//         console.error('Error headers:', error.response.headers);
//       }
//       const errorMessage =
//         error.response?.data?.error?.message || error.message || 'Registration failed. Please try again.';
//       toast.error(errorMessage);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Handle Pay Now button click for premium listing
//   const handlePayNow = () => {
//     console.log('Proceeding to payment for premium listing');
//     navigate('/payment'); // Redirect to payment page
//   };

//   // Close the popup
//   const handleClosePopup = () => {
//     setShowPopup(false);
//     navigate('/dashboard');
//   };

//   // Form validation function
//   const isFormValid = () =>
//     formData.spaceType &&
//     formData.businessName &&
//     formData.managerName &&
//     formData.phone &&
//     formData.address &&
//     formData.city &&
//     formData.pincode &&
//     formData.price &&
//     formData.photos.length > 0 &&
//     (formData.hasCCTV !== 'yes' || (formData.cameraCount && formData.cameraAligned)) &&
//     formData.latitude &&
//     formData.longitude &&
//     !isSubmitting &&
//     (spaceCount !== 0 ||
//       (formData.bankDetails.accountNumber &&
//         formData.bankDetails.ifscCode &&
//         formData.bankDetails.bankName &&
//         formData.bankDetails.accountHolderName));

//   // Render file upload UI
//   const renderFileUpload = () => (
//     <div>
//       <label className="block text-sm font-medium text-gray-700 mb-1">
//         Upload Photos (At least one exterior photo required) <span className="text-red-500">*</span>
//       </label>
//       <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
//         <input
//           type="file"
//           accept="image/jpeg, image/png"
//           multiple
//           onChange={handleFileUpload}
//           className="hidden"
//           id="photos"
//           aria-label="Upload Photos"
//         />
//         <label htmlFor="photos" className="cursor-pointer">
//           <div className="flex justify-center">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-12 w-12 text-gray-400"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
//               />
//             </svg>
//           </div>
//           <p className="mt-2 text-sm text-gray-500">Click to upload or drag and drop</p>
//           <p className="mt-1 text-xs text-gray-500">JPG or PNG (Max. 2MB)</p>
//         </label>
//       </div>
//       {formData.photos.length > 0 && (
//         <div className="mt-4 flex flex-wrap gap-2">
//           {formData.photos.map((photo, index) => (
//             <div key={index} className="relative">
//               <img src={photo} alt={`Uploaded Photo ${index + 1}`} className="h-24 w-24 object-cover rounded" />
//               <button
//                 type="button"
//                 onClick={() => handleRemovePhoto(index)}
//                 className="absolute top-0 right-0 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center"
//               >
//                 ×
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen flex flex-col">
//         {showLoginPopup && !user && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full mx-4">
//               <h2 className="text-xl font-bold mb-4 text-center">Login Required</h2>
//               <p className="text-gray-600 mb-6 text-center">
//                 Please login to list your space. You will be redirected to the login page.
//               </p>
//               <div className="flex justify-center">
//                 <Button
//                   onClick={handleLoginRedirect}
//                   className="bg-[#4261FF] hover:bg-[#6D4EFF] text-white px-4 py-2 rounded"
//                 >
//                   Go to Login
//                 </Button>
//               </div>
//             </div>
//           </div>
//         )}

//         {showMapModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-[90vw] max-h-[80vh] mx-4 flex flex-col">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-bold">Set Location</h2>
//                 <Button
//                   onClick={handleCloseMapModal}
//                   className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
//                   aria-label="Close Map Modal"
//                 >
//                   Close
//                 </Button>
//               </div>
//               <div className="flex-grow w-full map-container" style={{ height: '60vh' }}>
//                 {apikey && mapId ? (
//                   <APIProvider apiKey={apikey}>
//                     <Map
//                       center={
//                         markerPosition
//                           ? { lat: markerPosition.lat, lng: markerPosition.lng }
//                           : { lat: 28.6139, lng: 77.2090 }
//                       }
//                       zoom={15}
//                       mapTypeId="roadmap"
//                       mapId={mapId}
//                       onClick={handleMapClick}
//                       gestureHandling="greedy"
//                       scrollwheel={true}
//                       disableDefaultUI={false}
//                       zoomControl={true}
//                       zoomControlOptions={{
//                         position: 'RIGHT_CENTER',
//                       }}
//                       style={{ height: '100%', width: '100%' }}
//                     >
//                       {markerPosition && (
//                         <AdvancedMarker position={markerPosition} draggable={true} onDragEnd={handleMarkerDrag}>
//                           <Pin background="#FBBC04" glyphColor="#000" borderColor="#000" />
//                         </AdvancedMarker>
//                       )}
//                     </Map>
//                   </APIProvider>
//                 ) : (
//                   <p className="text-red-600">{apikey ? 'Map ID is missing.' : 'Google Maps API key is missing.'}</p>
//                 )}
//               </div>
//               <div className="mt-4 flex justify-end">
//                 <Button
//                   onClick={handleConfirmLocation}
//                   className="bg-[#4261FF] hover:bg-[#6D4EFF] text-white px-4 py-2 rounded"
//                   aria-label="Confirm Location"
//                 >
//                   Confirm Location
//                 </Button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Custom Popup for Registration Success */}
//         {showPopup && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full mx-4">
//               <h2 className="text-xl font-bold mb-4 text-center">
//                 {listingType === 'free' ? 'Space Added' : 'Space Created'}
//               </h2>
//               <p className="text-gray-600 mb-6 text-center">
//                 {listingType === 'free'
//                   ? 'Your space was added and is waiting to be verified.'
//                   : 'Your space was created. To use premium listing, please proceed to payment.'}
//               </p>
//               <div className="flex justify-center">
//                 {listingType === 'premium' ? (
//                   <Button
//                     onClick={handlePayNow}
//                     className="bg-[#4261FF] hover:bg-[#6D4EFF] text-white px-4 py-2 rounded"
//                   >
//                     Pay Now
//                   </Button>
//                 ) : (
//                   <Button
//                     onClick={handleClosePopup}
//                     className="bg-[#4261FF] hover:bg-[#6D4EFF] text-white px-4 py-2 rounded"
//                   >
//                     Close
//                   </Button>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}

//         <main className="flex-grow text-black placeholder:text-black">
//           <section className="bg-gradient-to-r from-white to-[#D9D9F3] py-16">
//             <div className="container mx-auto px-4 text-center">
//               <h1 className="text-4xl font-bold mb-4">List Your Space</h1>
//               <p className="text-xl text-gray-700 max-w-2xl mx-auto">
//                 Start monetizing your unused space in minutes. Fill out the form below to get started.
//               </p>
//             </div>
//           </section>

//           <section className="py-16 bg-white">
//             <div className="container mx-auto px-4">
//               <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
//                 <div className="p-8">
//                   <h2 className="text-2xl font-bold mb-6">Space Registration Form</h2>
//                   <form onSubmit={handleSubmit} className="space-y-6">
//                     <div>
//                       <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">Space Details</h3>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Type of Space <span className="text-red-500">*</span>
//                           </label>
//                           <select
//                             name="spaceType"
//                             value={formData.spaceType}
//                             onChange={handleChange}
//                             required
//                             className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                             aria-label="Type of Space"
//                           >
//                             <option value="">Select your space type</option>
//                             <option value="RWA">RWA</option>
//                             <option value="Mall">Mall</option>
//                             <option value="Retail">Retail</option>
//                             <option value="Cafe">Cafe</option>
//                             <option value="store">Store</option>
//                             <option value="salon">Salon</option>
//                             <option value="gym">Gym</option>
//                             <option value="other">Other</option>
//                           </select>
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Business Name <span className="text-red-500">*</span>
//                           </label>
//                           <input
//                             type="text"
//                             name="businessName"
//                             value={formData.businessName}
//                             onChange={handleChange}
//                             required
//                             className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                             placeholder="Your Business Name"
//                             aria-label="Business Name"
//                           />
//                         </div>
//                       </div>

//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Manager Name <span className="text-red-500">*</span>
//                           </label>
//                           <input
//                             type="text"
//                             name="managerName"
//                             value={formData.managerName}
//                             onChange={handleChange}
//                             required
//                             className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                             placeholder="Manager Name"
//                             aria-label="Manager Name"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Phone Number <span className="text-red-500">*</span>
//                           </label>
//                           <input
//                             type="text"
//                             name="phone"
//                             value={formData.phone}
//                             onChange={handleChange}
//                             required
//                             className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                             placeholder="Phone Number"
//                             aria-label="Phone Number"
//                           />
//                         </div>
//                       </div>

//                       <div className="mt-4">
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Email (Optional)</label>
//                         <input
//                           type="email"
//                           name="email"
//                           value={formData.email}
//                           onChange={handleChange}
//                           className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                           placeholder="Email Address"
//                           aria-label="Email"
//                         />
//                       </div>

//                       <div className="mt-4">
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Address <span className="text-red-500">*</span>
//                         </label>
//                         <textarea
//                           name="address"
//                           value={formData.address}
//                           onChange={handleChange}
//                           required
//                           className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                           rows={3}
//                           placeholder="Complete address"
//                           aria-label="Address"
//                         ></textarea>
//                       </div>

//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             City <span className="text-red-500">*</span>
//                           </label>
//                           <input
//                             type="text"
//                             name="city"
//                             value={formData.city}
//                             onChange={handleChange}
//                             required
//                             className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                             placeholder="City"
//                             aria-label="City"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Pin Code <span className="text-red-500">*</span>
//                           </label>
//                           <input
//                             type="text"
//                             name="pincode"
//                             value={formData.pincode}
//                             onChange={handleChange}
//                             required
//                             className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                             placeholder="Pin Code"
//                             aria-label="Pin Code"
//                           />
//                         </div>
//                       </div>

//                       <div className="mt-4">
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Nearby Landmark (Optional)
//                         </label>
//                         <input
//                           type="text"
//                           name="landmark"
//                           value={formData.landmark}
//                           onChange={handleChange}
//                           className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                           placeholder="Landmark for easy location"
//                           aria-label="Nearby Landmark"
//                         />
//                       </div>

//                       <div className="mt-4">
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Location Coordinates <span className="text-red-500">*</span>
//                         </label>
//                         <div className="mb-4 map-container">
//                           {apikey && mapId ? (
//                             <APIProvider apiKey={apikey}>
//                               <Map
//                                 center={
//                                   formData.latitude && formData.longitude
//                                     ? { lat: parseFloat(formData.latitude), lng: parseFloat(formData.longitude) }
//                                     : { lat: 28.6139, lng: 77.2090 }
//                                 }
//                                 zoom={15}
//                                 mapTypeId="roadmap"
//                                 mapId={mapId}
//                                 gestureHandling="greedy"
//                                 scrollwheel={true}
//                                 disableDefaultUI={false}
//                                 zoomControl={true}
//                                 zoomControlOptions={{
//                                   position: 'RIGHT_CENTER',
//                                 }}
//                                 style={{ height: '300px', width: '100%' }}
//                               >
//                                 {formData.latitude && formData.longitude && (
//                                   <AdvancedMarker
//                                     position={{
//                                       lat: parseFloat(formData.latitude),
//                                       lng: parseFloat(formData.longitude),
//                                     }}
//                                   >
//                                     <Pin background="#FBBC04" glyphColor="#000" borderColor="#000" />
//                                   </AdvancedMarker>
//                                 )}
//                               </Map>
//                             </APIProvider>
//                           ) : (
//                             <p className="text-red-600">
//                               {apikey ? 'Map ID is missing.' : 'Google Maps API key is missing.'}
//                             </p>
//                           )}
//                         </div>
//                         <div className="flex flex-col sm:flex-row gap-2 mb-2">
//                           <Button
//                             type="button"
//                             onClick={handleOpenMapModal}
//                             className="bg-[#4261FF] hover:bg-[#6D4EFF] text-white px-4 py-2 rounded"
//                             aria-label="Verify Location"
//                           >
//                             Verify Location
//                           </Button>
//                         </div>
//                         {formData.latitude && formData.longitude ? (
//                           <p className="text-sm text-gray-600">
//                             Location captured: Latitude: {formData.latitude}, Longitude: {formData.longitude}. Adjust
//                             if needed.
//                           </p>
//                         ) : locationError ? (
//                           <p className="text-sm text-red-600">{locationError}</p>
//                         ) : (
//                           <p className="text-sm text-gray-500">Select a location for better visibility</p>
//                         )}
//                       </div>

//                       <div className="mt-4">
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Price (Monthly) <span className="text-red-500">*</span>
//                         </label>
//                         <div className="flex items-center gap-4">
//                           <p>Rs</p>
//                           <input
//                             type="number"
//                             name="price"
//                             value={formData.price}
//                             onChange={handleChange}
//                             required
//                             className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                             placeholder="1000"
//                             aria-label="Price"
//                           />
//                         </div>
//                       </div>
//                     </div>

//                     <div>
//                       <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">Upload Photos</h3>
//                       <div className="space-y-4">{renderFileUpload()}</div>
//                     </div>

//                     <div>
//                       <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">
//                         Additional Details (Optional)
//                       </h3>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Weekday Footfall</label>
//                           <input
//                             type="number"
//                             name="weekdayFootfall"
//                             value={formData.weekdayFootfall}
//                             onChange={handleChange}
//                             className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                             placeholder="Average daily visitors"
//                             aria-label="Weekday Footfall"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Weekend Footfall</label>
//                           <input
//                             type="number"
//                             name="weekendFootfall"
//                             value={formData.weekendFootfall}
//                             onChange={handleChange}
//                             className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                             placeholder="Average weekend visitors"
//                             aria-label="Weekend Footfall"
//                           />
//                         </div>
//                       </div>

//                       <div className="mt-4">
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Branding Area Size (in sq.ft)
//                         </label>
//                         <input
//                           type="text"
//                           name="brandingAreaSize"
//                           value={formData.brandingAreaSize}
//                           onChange={handleChange}
//                           className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                           placeholder="e.g., Wall: 8×6 ft"
//                           aria-label="Branding Area Size"
//                         />
//                       </div>

//                       <div className="mt-4">
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Do you have CCTV cameras?
//                         </label>
//                         <select
//                           name="hasCCTV"
//                           value={formData.hasCCTV}
//                           onChange={handleChange}
//                           className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                           aria-label="CCTV Cameras"
//                         >
//                           <option value="">Select</option>
//                           <option value="yes">Yes</option>
//                           <option value="no">No</option>
//                         </select>
//                       </div>

//                       {formData.hasCCTV === 'yes' && (
//                         <>
//                           <div className="mt-4">
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                               How many cameras installed?
//                             </label>
//                             <input
//                               type="number"
//                               name="cameraCount"
//                               value={formData.cameraCount}
//                               onChange={handleChange}
//                               required
//                               className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                               placeholder="Number of cameras"
//                               aria-label="Number of Cameras"
//                             />
//                           </div>
//                           <div className="mt-4">
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                               Are camera views aligned with branding zones?
//                             </label>
//                             <select
//                               name="cameraAligned"
//                               value={formData.cameraAligned}
//                               onChange={handleChange}
//                               required
//                               className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                               aria-label="Camera Alignment with Branding Zones"
//                             >
//                               <option value="">Select</option>
//                               <option value="yes">Yes</option>
//                               <option value="no">No</option>
//                               <option value="unsure">Not sure</option>
//                             </select>
//                           </div>
//                         </>
//                       )}

//                       {spaceCount === 0 && (
//                         <div className="mt-4">
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Bank Details (Required for First Space) <span className="text-red-500">*</span>
//                           </label>
//                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <input
//                               type="text"
//                               name="bankDetails.accountNumber"
//                               value={formData.bankDetails.accountNumber}
//                               onChange={handleChange}
//                               required={spaceCount === 0}
//                               className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                               placeholder="Account Number"
//                               aria-label="Bank Account Number"
//                             />
//                             <input
//                               type="text"
//                               name="bankDetails.ifscCode"
//                               value={formData.bankDetails.ifscCode}
//                               onChange={handleChange}
//                               required={spaceCount === 0}
//                               className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                               placeholder="IFSC Code"
//                               aria-label="IFSC Code"
//                             />
//                             <input
//                               type="text"
//                               name="bankDetails.bankName"
//                               value={formData.bankDetails.bankName}
//                               onChange={handleChange}
//                               required={spaceCount === 0}
//                               className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                               placeholder="Bank Name"
//                               aria-label="Bank Name"
//                             />
//                             <input
//                               type="text"
//                               name="bankDetails.accountHolderName"
//                               value={formData.bankDetails.accountHolderName}
//                               onChange={handleChange}
//                               required={spaceCount === 0}
//                               className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                               placeholder="Account Holder Name"
//                               aria-label="Account Holder Name"
//                             />
//                           </div>
//                         </div>
//                       )}

//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">PAN Number</label>
//                           <input
//                             type="text"
//                             name="panNumber"
//                             value={formData.panNumber}
//                             onChange={handleChange}
//                             className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                             placeholder="PAN number"
//                             aria-label="PAN Number"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">GST Number</label>
//                           <input
//                             type="text"
//                             name="gstNumber"
//                             value={formData.gstNumber}
//                             onChange={handleChange}
//                             className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                             placeholder="GST number if applicable"
//                             aria-label="GST Number"
//                           />
//                         </div>
//                       </div>

//                       <div className="mt-4">
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Willing to try Heat Mapping?
//                         </label>
//                         <select
//                           name="heatMapping"
//                           value={formData.heatMapping}
//                           onChange={handleChange}
//                           className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                           aria-label="Heat Mapping Preference"
//                         >
//                           <option value="">Select</option>
//                           <option value="yes">Yes</option>
//                           <option value="no">No</option>
//                         </select>
//                       </div>

//                       <div className="mt-4">
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Listing Type</label>
//                         <select
//                           name="listingType"
//                           value={formData.listingType}
//                           onChange={handleChange}
//                           className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                           aria-label="Listing Type"
//                         >
//                           <option value="free">Free Listing</option>
//                           <option value="premium">Premium Listing</option>
//                         </select>
//                       </div>

//                       <div className="mt-4">
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Preferred days/times for branding
//                         </label>
//                         <input
//                           type="text"
//                           name="preferredTiming"
//                           value={formData.preferredTiming}
//                           onChange={handleChange}
//                           className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                           placeholder="e.g., All days, weekends only"
//                           aria-label="Preferred Branding Timing"
//                         />
//                       </div>
//                     </div>

//                     <div className="pt-4">
//                       <Button
//                         type="submit"
//                         className="w-full bg-[#6D4EFF] hover:bg-[#4261FF]"
//                         size="lg"
//                         disabled={!isFormValid() || isSubmitting}
//                       >
//                         {isSubmitting ? 'Submitting...' : 'Submit Registration'}
//                       </Button>
//                       <p className="text-center text-sm text-gray-500 mt-4">
//                         Your space will be reviewed and verified within 48-72 hours
//                       </p>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </section>
//         </main>

//         <Footer />
//       </div>
//       <ToastContainer position="bottom-right" autoClose={5000} />
//     </>
//   );
// };

// export default Registration;


// //final registration
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../components/Footer';
import { Button } from '../components/ui/Button';
import Navbar from '../components/Navbar';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';

const Registration = () => {
  const apikey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const mapId = import.meta.env.VITE_GOOGLE_MAPS_MAP_ID;
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [showMapModal, setShowMapModal] = useState(false);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [watchId, setWatchId] = useState(null);
  const [spaceCount, setSpaceCount] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [listingType, setListingType] = useState('free');
  const [showAccountUpdate, setShowAccountUpdate] = useState(false);
  const [accountFormData, setAccountFormData] = useState({
    bankDetails: {
      accountNumber: '',
      ifscCode: '',
      bankName: '',
      accountHolderName: '',
    },
  });
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    managerName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    pincode: '',
    landmark: '',
    latitude: '',
    longitude: '',
    weekdayFootfall: '',
    weekendFootfall: '',
    brandingAreaSize: '',
    hasCCTV: '',
    cameraCount: '',
    cameraAligned: '',
    complianceDetails: {
      panNumber: '',
      gstNumber: '',
    },
    heatMapping: '',
    listingType: 'free',
    preferredTiming: '',
    photos: [],
    price: '',
    agentId: '',
    bankDetails: {
      accountNumber: '',
      ifscCode: '',
      bankName: '',
      accountHolderName: '',
    },
    ageGroupMix: '',
    availabilities: [], // For initial availability slots
  });

  useEffect(() => {
    if (user && user.id) {
      setFormData((prev) => ({ ...prev, agentId: user.id }));
      const fetchSpaceCount = async () => {
        try {
          const token = localStorage.getItem('token');
          const userResponse = await axios.get(`${apiUrl}/users/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setSpaceCount(userResponse.data.data.user?.spaceCount || 0);
        } catch (error) {
          console.error('Failed to fetch spaceCount:', error);
          setSpaceCount(0);
          toast.error('Failed to fetch user data.');
        }
      };
      fetchSpaceCount();
    }

    const timer = setTimeout(() => {
      if (!user) setShowLoginPopup(true);
    }, 5000);

    if (navigator.geolocation) {
      const id = navigator.geolocation.watchPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setFormData((prev) => ({
            ...prev,
            latitude: lat.toString(),
            longitude: lng.toString(),
          }));
          setMarkerPosition({ lat, lng });
          toast.success('Live location captured!');
          navigator.geolocation.clearWatch(id);
          setWatchId(null);
        },
        (error) => {
          let errorMessage = 'Unable to retrieve location.';
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Location access denied.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location unavailable.';
              break;
            case error.TIMEOUT:
              errorMessage = 'Location request timed out.';
              break;
          }
          setLocationError(errorMessage);
          toast.error(errorMessage);
        },
        { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 }
      );
      setWatchId(id);
    } else {
      setLocationError('Geolocation not supported.');
      toast.error('Geolocation not supported.');
    }

    return () => {
      clearTimeout(timer);
      if (watchId) navigator.geolocation.clearWatch(watchId);
    };
  }, [user]);

  const handleLoginRedirect = () => navigate('/login');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('bankDetails.') || name.startsWith('complianceDetails.')) {
      const [parent, field] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [field]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAccountChange = (e) => {
    const { name, value } = e.target;
    const field = name.split('.')[1];
    setAccountFormData((prev) => ({
      ...prev,
      bankDetails: { ...prev.bankDetails, [field]: value },
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter((file) => {
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        toast.error(`${file.name}: Only JPG/PNG allowed.`);
        return false;
      }
      if (file.size > 2 * 1024 * 1024) {
        toast.error(`${file.name}: File size must be < 2MB.`);
        return false;
      }
      return true;
    });

    Promise.all(
      validFiles.map((file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      }))
    )
      .then((base64Images) => {
        setFormData((prev) => ({
          ...prev,
          photos: [...prev.photos, ...base64Images],
        }));
        toast.success(`${validFiles.length} photo(s) uploaded!`);
      })
      .catch((err) => {
        console.error('Failed to convert photos:', err);
        toast.error('Failed to process photos.');
      });
  };

  const handleRemovePhoto = (index) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
    toast.info('Photo removed!');
  };

  const handleOpenMapModal = () => {
    setShowMapModal(true);
    setLocationError('');
    if (formData.latitude && formData.longitude) {
      setMarkerPosition({
        lat: parseFloat(formData.latitude),
        lng: parseFloat(formData.longitude),
      });
    }
  };

  const handleMapClick = (event) => {
    if (event.detail.latLng) {
      const lat = event.detail.latLng.lat;
      const lng = event.detail.latLng.lng;
      setMarkerPosition({ lat, lng });
      setFormData((prev) => ({
        ...prev,
        latitude: lat.toString(),
        longitude: lng.toString(),
      }));
    }
  };

  const handleMarkerDrag = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setMarkerPosition({ lat, lng });
    setFormData((prev) => ({
      ...prev,
      latitude: lat.toString(),
      longitude: lng.toString(),
    }));
  };

  const handleConfirmLocation = () => {
    if (markerPosition) {
      setFormData((prev) => ({
        ...prev,
        latitude: markerPosition.lat.toString(),
        longitude: markerPosition.lng.toString(),
      }));
      toast.success(`Location set: Lat: ${markerPosition.lat}, Lng: ${markerPosition.lng}`);
      setShowMapModal(false);
    } else {
      toast.error('Please select a location on the map.');
    }
  };

  const handleCloseMapModal = () => {
    setShowMapModal(false);
    setMarkerPosition(null);
  };

  const handleAddAvailability = () => {
    setFormData(prev => ({
      ...prev,
      availabilities: [...prev.availabilities, { startDate: '', endDate: '', price: '' }],
    }));
  };

  const handleAvailabilityChange = (index, e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updatedAvailabilities = [...prev.availabilities];
      updatedAvailabilities[index] = { ...updatedAvailabilities[index], [name]: value };
      return { ...prev, availabilities: updatedAvailabilities };
    });
  };

  const handleRemoveAvailability = (index) => {
    setFormData(prev => ({
      ...prev,
      availabilities: prev.availabilities.filter((_, i) => i !== index),
    }));
    toast.info('Availability slot removed');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.id) {
      setShowLoginPopup(true);
      toast.error('Please log in to submit.');
      return;
    }

    if (!isFormValid()) {
      toast.error('Please fill all required fields.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Authentication token missing.');
      return;
    }

    if (isSubmitting) {
      toast.info('Submission in progress...');
      return;
    }

    setIsSubmitting(true);

    try {
      const spaceData = {
        name: formData.name,
        type: formData.type,
        managerName: formData.managerName,
        phone: formData.phone,
        email: formData.email || undefined,
        address: formData.address,
        city: formData.city,
        pincode: formData.pincode,
        landmark: formData.landmark || undefined,
        location: {
          coordinates: [parseFloat(formData.longitude), parseFloat(formData.latitude)],
        },
        weekdayFootfall: formData.weekdayFootfall ? Number(formData.weekdayFootfall) : undefined,
        weekendFootfall: formData.weekendFootfall ? Number(formData.weekendFootfall) : undefined,
        brandingAreaSize: formData.brandingAreaSize || undefined,
        hasCCTV: formData.hasCCTV || undefined,
        cameraCount: formData.cameraCount ? Number(formData.cameraCount) : undefined,
        cameraAligned: formData.cameraAligned || undefined,
        complianceDetails: {
          panNumber: formData.complianceDetails.panNumber || undefined,
          gstNumber: formData.complianceDetails.gstNumber || undefined,
        },
        heatMapping: formData.heatMapping || undefined,
        listingType: formData.listingType || 'free',
        preferredTiming: formData.preferredTiming || undefined,
        photos: formData.photos,
        price: Number(formData.price),
        agentId: formData.agentId || undefined,
        bankDetails: spaceCount === 0 ? formData.bankDetails : undefined,
        ageGroupMix: formData.ageGroupMix || undefined,
        availabilities: formData.availabilities.filter(avail => avail.startDate && avail.endDate),
      };

      const response = await axios.post(`${apiUrl}/spaces`, spaceData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      setListingType(formData.listingType);
      setShowPopup(true);

      if (formData.listingType === 'free') {
        setFormData({
          name: '',
          type: '',
          managerName: '',
          phone: '',
          email: '',
          address: '',
          city: '',
          pincode: '',
          landmark: '',
          latitude: '',
          longitude: '',
          weekdayFootfall: '',
          weekendFootfall: '',
          brandingAreaSize: '',
          hasCCTV: '',
          cameraCount: '',
          cameraAligned: '',
          complianceDetails: { panNumber: '', gstNumber: '' },
          heatMapping: '',
          listingType: 'free',
          preferredTiming: '',
          photos: [],
          price: '',
          agentId: user?.id || '',
          bankDetails: {
            accountNumber: '',
            ifscCode: '',
            bankName: '',
            accountHolderName: '',
          },
          ageGroupMix: '',
          availabilities: [],
        });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error?.message || 'Registration failed.';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAccountUpdateSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Authentication token missing.');
      return;
    }

    try {
      await axios.put(`${apiUrl}/spaces/update-account`, accountFormData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Bank details updated successfully!');
      setShowAccountUpdate(false);
    } catch (error) {
      const errorMessage = error.response?.data?.error?.message || 'Failed to update bank details.';
      toast.error(errorMessage);
    }
  };

  const isFormValid = () => (
    formData.name &&
    formData.type &&
    formData.managerName &&
    formData.phone &&
    formData.address &&
    formData.city &&
    formData.pincode &&
    formData.price &&
    formData.photos.length > 0 &&
    formData.latitude &&
    formData.longitude &&
    (formData.hasCCTV !== 'yes' || (formData.cameraCount && formData.cameraAligned)) &&
    !isSubmitting &&
    (spaceCount !== 0 ||
      (formData.bankDetails.accountNumber &&
        formData.bankDetails.ifscCode &&
        formData.bankDetails.bankName &&
        formData.bankDetails.accountHolderName))
  );

  const renderFileUpload = () => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Upload Photos (At least one required) <span className="text-red-500">*</span>
      </label>
      <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
        <input
          type="file"
          accept="image/jpeg,image/png"
          multiple
          onChange={handleFileUpload}
          className="hidden"
          id="photos"
          aria-label="Upload Photos"
        />
        <label htmlFor="photos" className="cursor-pointer">
          <div className="flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <p className="mt-2 text-sm text-gray-500">Click to upload or drag and drop</p>
          <p className="mt-1 text-xs text-gray-500">JPG or PNG (Max. 2MB)</p>
        </label>
      </div>
      {formData.photos.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {formData.photos.map((photo, index) => (
            <div key={index} className="relative">
              <img src={photo} alt={`Photo ${index + 1}`} className="h-24 w-24 object-cover rounded" />
              <button
                type="button"
                onClick={() => handleRemovePhoto(index)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderAvailabilityForm = () => (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">Initial Availability (Optional)</h3>
      {formData.availabilities.map((avail, index) => (
        <div key={index} className="mb-4 p-4 bg-gray-100 rounded-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date & Time</label>
              <input
                type="datetime-local"
                name="startDate"
                value={avail.startDate}
                onChange={(e) => handleAvailabilityChange(index, e)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date & Time</label>
              <input
                type="datetime-local"
                name="endDate"
                value={avail.endDate}
                onChange={(e) => handleAvailabilityChange(index, e)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (Optional)</label>
              <input
                type="number"
                name="price"
                value={avail.price}
                onChange={(e) => handleAvailabilityChange(index, e)}
                placeholder="Price per slot"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <Button
            type="button"
            onClick={() => handleRemoveAvailability(index)}
            className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Remove
          </Button>
        </div>
      ))}
      <Button
        type="button"
        onClick={handleAddAvailability}
        className="bg-[#4261FF] hover:bg-[#6D4EFF] text-white px-4 py-2 rounded"
      >
        Add Availability Slot
      </Button>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col">
        {showLoginPopup && !user && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full mx-4">
              <h2 className="text-xl font-bold mb-4 text-center">Login Required</h2>
              <p className="text-gray-600 mb-6 text-center">Please login to list your space.</p>
              <div className="flex justify-center">
                <Button
                  onClick={handleLoginRedirect}
                  className="bg-[#4261FF] hover:bg-[#6D4EFF] text-white px-4 py-2 rounded"
                >
                  Go to Login
                </Button>
              </div>
            </div>
          </div>
        )}

        {showMapModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-[90vw] max-h-[80vh] mx-4 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Set Location</h2>
                <Button
                  onClick={handleCloseMapModal}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Close
                </Button>
              </div>
              <div className="flex-grow w-full map-container" style={{ height: '60vh' }}>
                {apikey && mapId ? (
                  <APIProvider apiKey={apikey}>
                    <Map
                      center={markerPosition || { lat: 28.6139, lng: 77.2090 }}
                      zoom={15}
                      mapTypeId="roadmap"
                      mapId={mapId}
                      onClick={handleMapClick}
                      gestureHandling="greedy"
                      scrollwheel={true}
                      disableDefaultUI={false}
                      zoomControl={true}
                      zoomControlOptions={{ position: 'RIGHT_CENTER' }}
                      style={{ height: '100%', width: '100%' }}
                    >
                      {markerPosition && (
                        <AdvancedMarker position={markerPosition} draggable={true} onDragEnd={handleMarkerDrag}>
                          <Pin background="#FBBC04" glyphColor="#000" borderColor="#000" />
                        </AdvancedMarker>
                      )}
                    </Map>
                  </APIProvider>
                ) : (
                  <p className="text-red-600">{apikey ? 'Map ID is missing.' : 'Google Maps API key is missing.'}</p>
                )}
              </div>
              <div className="mt-4 flex justify-end">
                <Button
                  onClick={handleConfirmLocation}
                  className="bg-[#4261FF] hover:bg-[#6D4EFF] text-white px-4 py-2 rounded"
                >
                  Confirm Location
                </Button>
              </div>
            </div>
          </div>
        )}

        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full mx-4">
              <h2 className="text-xl font-bold mb-4 text-center">{listingType === 'free' ? 'Space Added' : 'Space Created'}</h2>
              <p className="text-gray-600 mb-6 text-center">
                {listingType === 'free' ? 'Your space is pending verification.' : 'Proceed to payment for premium listing.'}
              </p>
              <div className="flex justify-center">
                {listingType === 'premium' ? (
                  <Button
                    onClick={() => navigate('/payment')}
                    className="bg-[#4261FF] hover:bg-[#6D4EFF] text-white px-4 py-2 rounded"
                  >
                    Pay Now
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      setShowPopup(false);
                      if (spaceCount === 0) setShowAccountUpdate(true);
                      else navigate('/dashboard');
                    }}
                    className="bg-[#4261FF] hover:bg-[#6D4EFF] text-white px-4 py-2 rounded"
                  >
                    Close
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        {showAccountUpdate && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
              <h2 className="text-xl font-bold mb-4 text-center">Update Bank Details</h2>
              <form onSubmit={handleAccountUpdateSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Account Number *</label>
                  <input
                    type="text"
                    name="bankDetails.accountNumber"
                    value={accountFormData.bankDetails.accountNumber}
                    onChange={handleAccountChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">IFSC Code *</label>
                  <input
                    type="text"
                    name="bankDetails.ifscCode"
                    value={accountFormData.bankDetails.ifscCode}
                    onChange={handleAccountChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name *</label>
                  <input
                    type="text"
                    name="bankDetails.bankName"
                    value={accountFormData.bankDetails.bankName}
                    onChange={handleAccountChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Account Holder Name *</label>
                  <input
                    type="text"
                    name="bankDetails.accountHolderName"
                    value={accountFormData.bankDetails.accountHolderName}
                    onChange={handleAccountChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    onClick={() => setShowAccountUpdate(false)}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-[#4261FF] hover:bg-[#6D4EFF] text-white px-4 py-2 rounded"
                  >
                    Update
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        <main className="flex-grow text-black placeholder:text-black">
          <section className="bg-gradient-to-r from-white to-[#D9D9F3] py-16">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl font-bold mb-4">List Your Space</h1>
              <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                Start monetizing your unused space in minutes. Fill out the form below to get started.
              </p>
            </div>
          </section>

          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Space Registration Form</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">Space Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Type of Space <span className="text-red-500">*</span>
                          </label>
                          <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
                          >
                            <option value="">Select type</option>
                            <option value="RWA">RWA</option>
                            <option value="Mall">Mall</option>
                            <option value="Retail">Retail</option>
                            <option value="Cafe">Cafe</option>
                            <option value="store">Store</option>
                            <option value="salon">Salon</option>
                            <option value="gym">Gym</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Space Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
                            placeholder="Space Name"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Manager Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="managerName"
                            value={formData.managerName}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
                            placeholder="Manager Name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
                            placeholder="Phone Number"
                          />
                        </div>
                      </div>

                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email (Optional)</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
                          placeholder="Email Address"
                        />
                      </div>

                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Address <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          required
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
                          rows={3}
                          placeholder="Complete address"
                        ></textarea>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            City <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
                            placeholder="City"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Pin Code <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
                            placeholder="Pin Code"
                          />
                        </div>
                      </div>

                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Landmark (Optional)</label>
                        <input
                          type="text"
                          name="landmark"
                          value={formData.landmark}
                          onChange={handleChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
                          placeholder="Nearby landmark"
                        />
                      </div>

                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Location Coordinates <span className="text-red-500">*</span>
                        </label>
                        <div className="mb-4 map-container">
                          {apikey && mapId ? (
                            <APIProvider apiKey={apikey}>
                              <Map
                                center={
                                  formData.latitude && formData.longitude
                                    ? { lat: parseFloat(formData.latitude), lng: parseFloat(formData.longitude) }
                                    : { lat: 28.6139, lng: 77.2090 }
                                }
                                zoom={15}
                                mapTypeId="roadmap"
                                mapId={mapId}
                                gestureHandling="greedy"
                                scrollwheel={true}
                                disableDefaultUI={false}
                                zoomControl={true}
                                zoomControlOptions={{ position: 'RIGHT_CENTER' }}
                                style={{ height: '300px', width: '100%' }}
                              >
                                {formData.latitude && formData.longitude && (
                                  <AdvancedMarker
                                    position={{
                                      lat: parseFloat(formData.latitude),
                                      lng: parseFloat(formData.longitude),
                                    }}
                                  >
                                    <Pin background="#FBBC04" glyphColor="#000" borderColor="#000" />
                                  </AdvancedMarker>
                                )}
                              </Map>
                            </APIProvider>
                          ) : (
                            <p className="text-red-600">{apikey ? 'Map ID is missing.' : 'Google Maps API key is missing.'}</p>
                          )}
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 mb-2">
                          <Button
                            type="button"
                            onClick={handleOpenMapModal}
                            className="bg-[#4261FF] hover:bg-[#6D4EFF] text-white px-4 py-2 rounded"
                          >
                            Verify Location
                          </Button>
                        </div>
                        {formData.latitude && formData.longitude ? (
                          <p className="text-sm text-gray-600">
                            Location: Lat: {formData.latitude}, Lng: {formData.longitude}
                          </p>
                        ) : locationError ? (
                          <p className="text-sm text-red-600">{locationError}</p>
                        ) : (
                          <p className="text-sm text-gray-500">Select a location</p>
                        )}
                      </div>

                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Price (Monthly) <span className="text-red-500">*</span>
                        </label>
                        <div className="flex items-center gap-4">
                          <p>Rs</p>
                          <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
                            placeholder="1000"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">Upload Photos</h3>
                      <div className="space-y-4">{renderFileUpload()}</div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">Additional Details (Optional)</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Weekday Footfall</label>
                          <input
                            type="number"
                            name="weekdayFootfall"
                            value={formData.weekdayFootfall}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
                            placeholder="Average daily visitors"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Weekend Footfall</label>
                          <input
                            type="number"
                            name="weekendFootfall"
                            value={formData.weekendFootfall}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
                            placeholder="Average weekend visitors"
                          />
                        </div>
                      </div>

                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Branding Area Size (sq.ft)</label>
                        <input
                          type="text"
                          name="brandingAreaSize"
                          value={formData.brandingAreaSize}
                          onChange={handleChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
                          placeholder="e.g., Wall: 8×6 ft"
                        />
                      </div>

                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Age Group Mix</label>
                        <input
                          type="text"
                          name="ageGroupMix"
                          value={formData.ageGroupMix}
                          onChange={handleChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
                          placeholder="e.g., Young adults, Families"
                        />
                      </div>

                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">CCTV Cameras?</label>
                        <select
                          name="hasCCTV"
                          value={formData.hasCCTV}
                          onChange={handleChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
                        >
                          <option value="">Select</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>

                      {formData.hasCCTV === 'yes' && (
                        <>
                          <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Camera Count *</label>
                            <input
                              type="number"
                              name="cameraCount"
                              value={formData.cameraCount}
                              onChange={handleChange}
                              required
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
                              placeholder="Number of cameras"
                            />
                          </div>
                          <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Camera Aligned with Branding Zones? *</label>
                            <select
                              name="cameraAligned"
                              value={formData.cameraAligned}
                              onChange={handleChange}
                              required
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
                            >
                              <option value="">Select</option>
                              <option value="yes">Yes</option>
                              <option value="no">No</option>
                              <option value="unsure">Not sure</option>
                            </select>
                          </div>
                        </>
                      )}

                      {spaceCount === 0 && (
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Bank Details (Required for First Space) <span className="text-red-500">*</span>
                          </label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                              type="text"
                              name="bankDetails.accountNumber"
                              value={formData.bankDetails.accountNumber}
                              onChange={handleChange}
                              required
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
                              placeholder="Account Number"
                            />
                            <input
                              type="text"
                              name="bankDetails.ifscCode"
                              value={formData.bankDetails.ifscCode}
                              onChange={handleChange}
                              required
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
                              placeholder="IFSC Code"
                            />
                            <input
                              type="text"
                              name="bankDetails.bankName"
                              value={formData.bankDetails.bankName}
                              onChange={handleChange}
                              required
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
                              placeholder="Bank Name"
                            />
                            <input
                              type="text"
                              name="bankDetails.accountHolderName"
                              value={formData.bankDetails.accountHolderName}
                              onChange={handleChange}
                              required
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
                              placeholder="Account Holder Name"
                            />
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">PAN Number</label>
                          <input
                            type="text"
                            name="complianceDetails.panNumber"
                            value={formData.complianceDetails.panNumber}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
                            placeholder="PAN number"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">GST Number</label>
                          <input
                            type="text"
                            name="complianceDetails.gstNumber"
                            value={formData.complianceDetails.gstNumber}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
                            placeholder="GST number"
                          />
                        </div>
                      </div>

                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Heat Mapping?</label>
                        <select
                          name="heatMapping"
                          value={formData.heatMapping}
                          onChange={handleChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
                        >
                          <option value="">Select</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>

                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Listing Type</label>
                        <select
                          name="listingType"
                          value={formData.listingType}
                          onChange={handleChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
                        >
                          <option value="free">Free Listing</option>
                          <option value="premium">Premium Listing</option>
                        </select>
                      </div>

                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Branding Timing</label>
                        <input
                          type="text"
                          name="preferredTiming"
                          value={formData.preferredTiming}
                          onChange={handleChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
                          placeholder="e.g., Weekends only"
                        />
                      </div>

                      {renderAvailabilityForm()}
                    </div>

                    <div className="pt-4">
                      <Button
                        type="submit"
                        className="w-full bg-[#6D4EFF] hover:bg-[#4261FF]"
                        size="lg"
                        disabled={!isFormValid() || isSubmitting}
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit Registration'}
                      </Button>
                      <p className="text-center text-sm text-gray-500 mt-4">
                        Your space will be reviewed within 48-72 hours.
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
      <ToastContainer position="bottom-right" autoClose={5000} />
    </>
  );
};

export default Registration;



// import { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Footer from '../components/Footer';
// import { Button } from '../components/ui/Button';
// import Navbar from '../components/Navbar';
// import SubscriptionModal from '../components/SubscriptionModal';
// import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';

// const Registration = () => {
//   const apikey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
//   const mapId = import.meta.env.VITE_GOOGLE_MAPS_MAP_ID;
//   const apiUrl =  'http://localhost:5000/api';

//   const { user } = useSelector((state) => state.user);
//   const navigate = useNavigate();

//   const [showLoginPopup, setShowLoginPopup] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [locationError, setLocationError] = useState('');
//   const [showMapModal, setShowMapModal] = useState(false);
//   const [markerPosition, setMarkerPosition] = useState(null);
//   const [watchId, setWatchId] = useState(null);
//   const [spaceCount, setSpaceCount] = useState(null);
//   const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
//   const [tempSpaceData, setTempSpaceData] = useState(null);
//   const [showAccountUpdate, setShowAccountUpdate] = useState(false);
//   const [accountFormData, setAccountFormData] = useState({
//     bankDetails: {
//       accountNumber: '',
//       ifscCode: '',
//       bankName: '',
//       accountHolderName: '',
//     },
//   });
//   const [formData, setFormData] = useState({
//     name: '',
//     type: '',
//     managerName: '',
//     phone: '',
//     email: '',
//     address: '',
//     city: '',
//     pincode: '',
//     landmark: '',
//     latitude: '',
//     longitude: '',
//     weekdayFootfall: '',
//     weekendFootfall: '',
//     brandingAreaSize: '',
//     hasCCTV: '',
//     cameraCount: '',
//     cameraAligned: '',
//     complianceDetails: {
//       panNumber: '',
//       gstNumber: '',
//     },
//     heatMapping: '',
//     listingType: 'free',
//     preferredTiming: '',
//     photos: [],
//     price: '',
//     agentId: '',
//     bankDetails: {
//       accountNumber: '',
//       ifscCode: '',
//       bankName: '',
//       accountHolderName: '',
//     },
//     ageGroupMix: '',
//     availabilities: [],
//   });

//   useEffect(() => {
//     console.log('Registration useEffect: user=', user); // Debug
//     if (user && user.id) {
//       setFormData((prev) => ({ ...prev, agentId: user.id }));
//       const fetchSpaceCount = async () => {
//         try {
//           const token = localStorage.getItem('token');
//           console.log('Fetching space count: token=', token); // Debug
//           const userResponse = await axios.get(`${apiUrl}/users/me`, {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//           console.log('Space count response:', userResponse.data); // Debug
//           setSpaceCount(userResponse.data.data.user?.spaceCount || 0);
//         } catch (error) {
//           console.error('Failed to fetch spaceCount:', error);
//           setSpaceCount(0);
//           toast.error('Failed to fetch user data.');
//         }
//       };
//       fetchSpaceCount();
//     }

//     const timer = setTimeout(() => {
//       if (!user) {
//         console.log('No user, showing login popup'); // Debug
//         setShowLoginPopup(true);
//       }
//     }, 5000);

//     if (navigator.geolocation) {
//       console.log('Starting geolocation watch'); // Debug
//       const id = navigator.geolocation.watchPosition(
//         (position) => {
//           const lat = position.coords.latitude;
//           const lng = position.coords.longitude;
//           console.log('Geolocation success: lat=', lat, 'lng=', lng); // Debug
//           setFormData((prev) => ({
//             ...prev,
//             latitude: lat.toString(),
//             longitude: lng.toString(),
//           }));
//           setMarkerPosition({ lat, lng });
//           toast.success('Live location captured!');
//           navigator.geolocation.clearWatch(id);
//           setWatchId(null);
//         },
//         (error) => {
//           let errorMessage = 'Unable to retrieve location.';
//           switch (error.code) {
//             case error.PERMISSION_DENIED:
//               errorMessage = 'Location access denied.';
//               break;
//             case error.POSITION_UNAVAILABLE:
//               errorMessage = 'Location unavailable.';
//               break;
//             case error.TIMEOUT:
//               errorMessage = 'Location request timed out.';
//               break;
//           }
//           console.error('Geolocation error:', errorMessage); // Debug
//           setLocationError(errorMessage);
//           toast.error(errorMessage);
//         },
//         { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 }
//       );
//       setWatchId(id);
//     } else {
//       console.error('Geolocation not supported'); // Debug
//       setLocationError('Geolocation not supported.');
//       toast.error('Geolocation not supported.');
//     }

//     return () => {
//       console.log('Cleaning up useEffect'); // Debug
//       clearTimeout(timer);
//       if (watchId) navigator.geolocation.clearWatch(watchId);
//     };
//   }, [user]);

//   const handleLoginRedirect = () => {
//     console.log('Redirecting to login'); // Debug
//     navigate('/login');
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     console.log('Form change:', name, '=', value); // Debug
//     if (name.startsWith('bankDetails.') || name.startsWith('complianceDetails.')) {
//       const [parent, field] = name.split('.');
//       setFormData((prev) => ({
//         ...prev,
//         [parent]: { ...prev[parent], [field]: value },
//       }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleAccountChange = (e) => {
//     const { name, value } = e.target;
//     const field = name.split('.')[1];
//     console.log('Account form change:', name, '=', value); // Debug
//     setAccountFormData((prev) => ({
//       ...prev,
//       bankDetails: { ...prev.bankDetails, [field]: value },
//     }));
//   };

//   const handleFileUpload = (e) => {
//     console.log('File upload triggered'); // Debug
//     const files = Array.from(e.target.files);
//     const validFiles = files.filter((file) => {
//       if (!['image/jpeg', 'image/png'].includes(file.type)) {
//         console.error('Invalid file type:', file.name); // Debug
//         toast.error(`${file.name}: Only JPG/PNG allowed.`);
//         return false;
//       }
//       if (file.size > 2 * 1024 * 1024) {
//         console.error('File too large:', file.name); // Debug
//         toast.error(`${file.name}: File size must be < 2MB.`);
//         return false;
//       }
//       return true;
//     });

//     Promise.all(
//       validFiles.map((file) => new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onloadend = () => resolve(reader.result);
//         reader.onerror = reject;
//         reader.readAsDataURL(file);
//       }))
//     )
//       .then((base64Images) => {
//         console.log('Uploaded photos:', base64Images.length); // Debug
//         setFormData((prev) => ({
//           ...prev,
//           photos: [...prev.photos, ...base64Images],
//         }));
//         toast.success(`${validFiles.length} photo(s) uploaded!`);
//       })
//       .catch((err) => {
//         console.error('Failed to convert photos:', err); // Debug
//         toast.error('Failed to process photos.');
//       });
//   };

//   const handleRemovePhoto = (index) => {
//     console.log('Removing photo at index:', index); // Debug
//     setFormData((prev) => ({
//       ...prev,
//       photos: prev.photos.filter((_, i) => i !== index),
//     }));
//     toast.info('Photo removed!');
//   };

//   const handleOpenMapModal = () => {
//     console.log('Opening map modal'); // Debug
//     setShowMapModal(true);
//     setLocationError('');
//     if (formData.latitude && formData.longitude) {
//       setMarkerPosition({
//         lat: parseFloat(formData.latitude),
//         lng: parseFloat(formData.longitude),
//       });
//     }
//   };

//   const handleMapClick = (event) => {
//     if (event.detail.latLng) {
//       const lat = event.detail.latLng.lat;
//       const lng = event.detail.latLng.lng;
//       console.log('Map click: lat=', lat, 'lng=', lng); // Debug
//       setMarkerPosition({ lat, lng });
//       setFormData((prev) => ({
//         ...prev,
//         latitude: lat.toString(),
//         longitude: lng.toString(),
//       }));
//     }
//   };

//   const handleMarkerDrag = (event) => {
//     const lat = event.latLng.lat();
//     const lng = event.latLng.lng();
//     console.log('Marker drag: lat=', lat, 'lng=', lng); // Debug
//     setMarkerPosition({ lat, lng });
//     setFormData((prev) => ({
//       ...prev,
//       latitude: lat.toString(),
//       longitude: lng.toString(),
//     }));
//   };

//   const handleConfirmLocation = () => {
//     if (markerPosition) {
//       console.log('Confirming location: lat=', markerPosition.lat, 'lng=', markerPosition.lng); // Debug
//       setFormData((prev) => ({
//         ...prev,
//         latitude: markerPosition.lat.toString(),
//         longitude: markerPosition.lng.toString(),
//       }));
//       toast.success(`Location set: Lat: ${markerPosition.lat}, Lng: ${markerPosition.lng}`);
//       setShowMapModal(false);
//     } else {
//       console.error('No marker position selected'); // Debug
//       toast.error('Please select a location on the map.');
//     }
//   };

//   const handleCloseMapModal = () => {
//     console.log('Closing map modal'); // Debug
//     setShowMapModal(false);
//     setMarkerPosition(null);
//   };

//   const handleAddAvailability = () => {
//     console.log('Adding availability slot'); // Debug
//     setFormData((prev) => ({
//       ...prev,
//       availabilities: [...prev.availabilities, { startDate: '', endDate: '', price: '' }],
//     }));
//   };

//   const handleAvailabilityChange = (index, e) => {
//     const { name, value } = e.target;
//     console.log('Availability change: index=', index, name, '=', value); // Debug
//     setFormData((prev) => {
//       const updatedAvailabilities = [...prev.availabilities];
//       updatedAvailabilities[index] = { ...updatedAvailabilities[index], [name]: value };
//       return { ...prev, availabilities: updatedAvailabilities };
//     });
//   };

//   const handleRemoveAvailability = (index) => {
//     console.log('Removing availability slot at index:', index); // Debug
//     setFormData((prev) => ({
//       ...prev,
//       availabilities: prev.availabilities.filter((_, i) => i !== index),
//     }));
//     toast.info('Availability slot removed');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     console.log('Form submit triggered'); // Debug
//     console.log('Form data:', JSON.stringify(formData, null, 2)); // Debug

//     if (!user || !user.id) {
//       console.error('No user authenticated'); // Debug
//       setShowLoginPopup(true);
//       toast.error('Please log in to submit.');
//       return;
//     }

//     if (!isFormValid()) {
//       console.error('Form validation failed'); // Debug
//       toast.error('Please fill all required fields.');
//       return;
//     }

//     if (isSubmitting) {
//       console.warn('Submission already in progress'); // Debug
//       toast.info('Submission in progress...');
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const spaceData = {
//         name: formData.name,
//         type: formData.type,
//         managerName: formData.managerName,
//         phone: formData.phone,
//         email: formData.email || undefined,
//         address: formData.address,
//         city: formData.city,
//         pincode: formData.pincode,
//         landmark: formData.landmark || undefined,
//         location: {
//           coordinates: [parseFloat(formData.longitude), parseFloat(formData.latitude)],
//         },
//         weekdayFootfall: formData.weekdayFootfall ? Number(formData.weekdayFootfall) : undefined,
//         weekendFootfall: formData.weekendFootfall ? Number(formData.weekendFootfall) : undefined,
//         brandingAreaSize: formData.brandingAreaSize || undefined,
//         hasCCTV: formData.hasCCTV || undefined,
//         cameraCount: formData.cameraCount ? Number(formData.cameraCount) : undefined,
//         cameraAligned: formData.cameraAligned || undefined,
//         complianceDetails: {
//           panNumber: formData.complianceDetails.panNumber || undefined,
//           gstNumber: formData.complianceDetails.gstNumber || undefined,
//         },
//         heatMapping: formData.heatMapping || undefined,
//         listingType: formData.listingType || 'free',
//         preferredTiming: formData.preferredTiming || undefined,
//         photos: formData.photos,
//         price: Number(formData.price),
//         agentId: formData.agentId || undefined,
//         bankDetails: spaceCount === 0 ? formData.bankDetails : undefined,
//         ageGroupMix: formData.ageGroupMix || undefined,
//         availabilities: formData.availabilities.filter((avail) => avail.startDate && avail.endDate),
//       };

//       console.log('Prepared spaceData:', JSON.stringify(spaceData, null, 2)); // Debug

//       // Store space data and open subscription modal
//       setTempSpaceData(spaceData);
//       setShowSubscriptionModal(true);
//     } catch (error) {
//       console.error('Error in handleSubmit:', error); // Debug
//       const errorMessage = error.response?.data?.error?.message || 'Failed to prepare registration.';
//       toast.error(errorMessage);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleSubscriptionSuccess = async (planType) => {
//     setIsSubmitting(true);

//     console.log('handleSubscriptionSuccess: planType=', planType, 'tempSpaceData=', JSON.stringify(tempSpaceData, null, 2)); // Debug

//     try {
//       // Create space
//       let spaceId;
//       try {
//         const spaceResponse = await axios.post(
//           `${apiUrl}/spaces`,
//           { ...tempSpaceData, listingType: planType === 'paid' ? 'premium' : 'free' },
//           {
//             headers: {
//               'Content-Type': 'application/json',
//               Authorization: `Bearer ${localStorage.getItem('token')}`,
//             },
//           }
//         );

//         console.log('Space creation response:', JSON.stringify(spaceResponse.data, null, 2)); // Debug
//         spaceId = spaceResponse.data.data?._id;

//         if (!spaceId) {
//           console.error('Space ID not returned in response'); // Debug
//           throw new Error('Space ID not returned in response');
//         }

//         toast.success('Space registered successfully');
//       } catch (spaceError) {
//         console.error('Error creating space:', spaceError); // Debug
//         console.error('Space error response:', spaceError.response?.data); // Debug
//         toast.error(spaceError.response?.data?.error?.message || 'Failed to register space.');
//         // Continue to dashboard to ensure flow doesn't break
//         setShowSubscriptionModal(false);
//         setTempSpaceData(null);
//         if (spaceCount === 0) setShowAccountUpdate(true);
//         else navigate('/spaceowner-dashboard');
//         return;
//       }

//       // Create subscription (optional)
//       if (planType !== 'free') {
//         try {
//           const subscriptionResponse = await axios.post(
//             `${apiUrl}/subscriptions`,
//             { planType, spaceId },
//             {
//               headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//             }
//           );
//           console.log('Subscription creation response:', JSON.stringify(subscriptionResponse.data, null, 2)); // Debug
//           toast.success('Subscription created successfully');
//         } catch (subError) {
//           console.error('Error creating subscription:', subError); // Debug
//           console.error('Subscription error response:', subError.response?.data); // Debug
//           toast.warn(subError.response?.data?.error?.message || 'Space added, but subscription creation failed.');
//         }
//       }

//       setShowSubscriptionModal(false);
//       setTempSpaceData(null);
//       if (spaceCount === 0) setShowAccountUpdate(true);
//       else navigate('/spaceowner-dashboard');
//     } catch (error) {
//       console.error('Error in handleSubscriptionSuccess:', error); // Debug
//       const errorMessage = error.response?.data?.error?.message || 'Registration failed.';
//       toast.error(errorMessage);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleAccountUpdateSubmit = async (e) => {
//     e.preventDefault();
//     console.log('Submitting account update:', JSON.stringify(accountFormData, null, 2)); // Debug
//     const token = localStorage.getItem('token');
//     if (!token) {
//       console.error('No authentication token'); // Debug
//       toast.error('Authentication token missing.');
//       return;
//     }

//     try {
//       const response = await axios.put(`${apiUrl}/spaces/update-account`, accountFormData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       console.log('Account update response:', response.data); // Debug
//       toast.success('Bank details updated successfully!');
//       setShowAccountUpdate(false);
//       navigate('/spaceowner-dashboard');
//     } catch (error) {
//       console.error('Error updating account:', error); // Debug
//       const errorMessage = error.response?.data?.error?.message || 'Failed to update bank details.';
//       toast.error(errorMessage);
//     }
//   };

//   const isFormValid = () => {
//     const valid = (
//       formData.name &&
//       formData.type &&
//       formData.managerName &&
//       formData.phone &&
//       formData.address &&
//       formData.city &&
//       formData.pincode &&
//       formData.price &&
//       formData.photos.length > 0 &&
//       formData.latitude &&
//       formData.longitude &&
//       (formData.hasCCTV !== 'yes' || (formData.cameraCount && formData.cameraAligned)) &&
//       !isSubmitting &&
//       (spaceCount !== 0 ||
//         (formData.bankDetails.accountNumber &&
//           formData.bankDetails.ifscCode &&
//           formData.bankDetails.bankName &&
//           formData.bankDetails.accountHolderName))
//     );
//     console.log('Form validation:', valid); // Debug
//     return valid;
//   };

//   const renderFileUpload = () => (
//     <div>
//       <label className="block text-sm font-medium text-gray-700 mb-1">
//         Upload Photos (At least one required) <span className="text-red-500">*</span>
//       </label>
//       <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
//         <input
//           type="file"
//           accept="image/jpeg,image/png"
//           multiple
//           onChange={handleFileUpload}
//           className="hidden"
//           id="photos"
//           aria-label="Upload Photos"
//         />
//         <label htmlFor="photos" className="cursor-pointer">
//           <div className="flex justify-center">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-12 w-12 text-gray-400"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
//               />
//             </svg>
//           </div>
//           <p className="mt-2 text-sm text-gray-500">Click to upload or drag and drop</p>
//           <p className="mt-1 text-xs text-gray-500">JPG or PNG (Max. 2MB)</p>
//         </label>
//       </div>
//       {formData.photos.length > 0 && (
//         <div className="mt-4 flex flex-wrap gap-2">
//           {formData.photos.map((photo, index) => (
//             <div key={index} className="relative">
//               <img src={photo} alt={`Photo ${index + 1}`} className="h-24 w-24 object-cover rounded" />
//               <button
//                 type="button"
//                 onClick={() => handleRemovePhoto(index)}
//                 className="absolute top-0 right-0 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center"
//               >
//                 ×
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );

//   const renderAvailabilityForm = () => (
//     <div className="mt-6">
//       <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">Initial Availability (Optional)</h3>
//       {formData.availabilities.map((avail, index) => (
//         <div key={index} className="mb-4 p-4 bg-gray-100 rounded-md">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Start Date & Time</label>
//               <input
//                 type="datetime-local"
//                 name="startDate"
//                 value={avail.startDate}
//                 onChange={(e) => handleAvailabilityChange(index, e)}
//                 className="w-full p-2 border border-gray-300 rounded-md"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">End Date & Time</label>
//               <input
//                 type="datetime-local"
//                 name="endDate"
//                 value={avail.endDate}
//                 onChange={(e) => handleAvailabilityChange(index, e)}
//                 className="w-full p-2 border border-gray-300 rounded-md"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Price (Optional)</label>
//               <input
//                 type="number"
//                 name="price"
//                 value={avail.price}
//                 onChange={(e) => handleAvailabilityChange(index, e)}
//                 placeholder="Price per slot"
//                 className="w-full p-2 border border-gray-300 rounded-md"
//               />
//             </div>
//           </div>
//           <Button
//             type="button"
//             onClick={() => handleRemoveAvailability(index)}
//             className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
//           >
//             Remove
//           </Button>
//         </div>
//       ))}
//       <Button
//         type="button"
//         onClick={handleAddAvailability}
//         className="bg-[#4261FF] hover:bg-[#6D4EFF] text-white px-4 py-2 rounded"
//       >
//         Add Availability Slot
//       </Button>
//     </div>
//   );

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen flex flex-col">
//         {showLoginPopup && !user && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full mx-4">
//               <h2 className="text-xl font-bold mb-4 text-center">Login Required</h2>
//               <p className="text-gray-600 mb-6 text-center">Please login to list your space.</p>
//               <div className="flex justify-center">
//                 <Button
//                   onClick={handleLoginRedirect}
//                   className="bg-[#4261FF] hover:bg-[#6D4EFF] text-white px-4 py-2 rounded"
//                 >
//                   Go to Login
//                 </Button>
//               </div>
//             </div>
//           </div>
//         )}

//         {showMapModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-[90vw] max-h-[80vh] mx-4 flex flex-col">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-bold">Set Location</h2>
//                 <Button
//                   onClick={handleCloseMapModal}
//                   className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
//                 >
//                   Close
//                 </Button>
//               </div>
//               <div className="flex-grow w-full map-container" style={{ height: '60vh' }}>
//                 {apikey && mapId ? (
//                   <APIProvider apiKey={apikey}>
//                     <Map
//                       center={markerPosition || { lat: 28.6139, lng: 77.2090 }}
//                       zoom={15}
//                       mapTypeId="roadmap"
//                       mapId={mapId}
//                       onClick={handleMapClick}
//                       gestureHandling="greedy"
//                       scrollwheel={true}
//                       disableDefaultUI={false}
//                       zoomControl={true}
//                       zoomControlOptions={{ position: 'RIGHT_CENTER' }}
//                       style={{ height: '100%', width: '100%' }}
//                     >
//                       {markerPosition && (
//                         <AdvancedMarker position={markerPosition} draggable={true} onDragEnd={handleMarkerDrag}>
//                           <Pin background="#FBBC04" glyphColor="#000" borderColor="#000" />
//                         </AdvancedMarker>
//                       )}
//                     </Map>
//                   </APIProvider>
//                 ) : (
//                   <p className="text-red-600">{apikey ? 'Map ID is missing.' : 'Google Maps API key is missing.'}</p>
//                 )}
//               </div>
//               <div className="mt-4 flex justify-end">
//                 <Button
//                   onClick={handleConfirmLocation}
//                   className="bg-[#4261FF] hover:bg-[#6D4EFF] text-white px-4 py-2 rounded"
//                 >
//                   Confirm Location
//                 </Button>
//               </div>
//             </div>
//           </div>
//         )}

//         {showSubscriptionModal && (
//           <SubscriptionModal
//             onClose={() => {
//               console.log('Subscription modal closed, defaulting to Free plan'); // Debug
//               handleSubscriptionSuccess('free');
//             }}
//             onSubscriptionSuccess={(planType) => {
//               console.log('Subscription modal success: planType=', planType); // Debug
//               handleSubscriptionSuccess(planType);
//             }}
//           />
//         )}

//         {showAccountUpdate && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
//               <h2 className="text-xl font-bold mb-4 text-center">Update Bank Details</h2>
//               <form onSubmit={handleAccountUpdateSubmit} className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Account Number *</label>
//                   <input
//                     type="text"
//                     name="bankDetails.accountNumber"
//                     value={accountFormData.bankDetails.accountNumber}
//                     onChange={handleAccountChange}
//                     required
//                     className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">IFSC Code *</label>
//                   <input
//                     type="text"
//                     name="bankDetails.ifscCode"
//                     value={accountFormData.bankDetails.ifscCode}
//                     onChange={handleAccountChange}
//                     required
//                     className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name *</label>
//                   <input
//                     type="text"
//                     name="bankDetails.bankName"
//                     value={accountFormData.bankDetails.bankName}
//                     onChange={handleAccountChange}
//                     required
//                     className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Account Holder Name *</label>
//                   <input
//                     type="text"
//                     name="bankDetails.accountHolderName"
//                     value={accountFormData.bankDetails.accountHolderName}
//                     onChange={handleAccountChange}
//                     required
//                     className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                   />
//                 </div>
//                 <div className="flex justify-end space-x-2">
//                   <Button
//                     type="button"
//                     onClick={() => setShowAccountUpdate(false)}
//                     className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
//                   >
//                     Cancel
//                   </Button>
//                   <Button
//                     type="submit"
//                     className="bg-[#4261FF] hover:bg-[#6D4EFF] text-white px-4 py-2 rounded"
//                   >
//                     Update
//                   </Button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}

//         <main className="flex-grow text-black placeholder:text-black">
//           <section className="bg-gradient-to-r from-white to-[#D9D9F3] py-16">
//             <div className="container mx-auto px-4 text-center">
//               <h1 className="text-4xl font-bold mb-4">List Your Space</h1>
//               <p className="text-xl text-gray-700 max-w-2xl mx-auto">
//                 Start monetizing your unused space in minutes. Fill out the form below to get started.
//               </p>
//             </div>
//           </section>

//           <section className="py-16 bg-white">
//             <div className="container mx-auto px-4">
//               <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
//                 <div className="p-8">
//                   <h2 className="text-2xl font-bold mb-6">Space Registration Form</h2>
//                   <form onSubmit={handleSubmit} className="space-y-6">
//                     <div>
//                       <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">Space Details</h3>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Type of Space <span className="text-red-500">*</span>
//                           </label>
//                           <select
//                             name="type"
//                             value={formData.type}
//                             onChange={handleChange}
//                             required
//                             className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                           >
//                             <option value="">Select type</option>
//                             <option value="RWA">RWA</option>
//                             <option value="Mall">Mall</option>
//                             <option value="Retail">Retail</option>
//                             <option value="Cafe">Cafe</option>
//                             <option value="store">Store</option>
//                             <option value="salon">Salon</option>
//                             <option value="gym">Gym</option>
//                             <option value="other">Other</option>
//                           </select>
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Space Name <span className="text-red-500">*</span>
//                           </label>
//                           <input
//                             type="text"
//                             name="name"
//                             value={formData.name}
//                             onChange={handleChange}
//                             required
//                             className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                             placeholder="Space Name"
//                           />
//                         </div>
//                       </div>

//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Manager Name <span className="text-red-500">*</span>
//                           </label>
//                           <input
//                             type="text"
//                             name="managerName"
//                             value={formData.managerName}
//                             onChange={handleChange}
//                             required
//                             className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                             placeholder="Manager Name"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Phone Number <span className="text-red-500">*</span>
//                           </label>
//                           <input
//                             type="text"
//                             name="phone"
//                             value={formData.phone}
//                             onChange={handleChange}
//                             required
//                             className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                             placeholder="Phone Number"
//                           />
//                         </div>
//                       </div>

//                       <div className="mt-4">
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//                         <input
//                           type="email"
//                           name="email"
//                           value={formData.email}
//                           onChange={handleChange}
//                           className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                           placeholder="Email Address"
//                         />
//                       </div>

//                       <div className="mt-4">
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Address <span className="text-red-500">*</span>
//                         </label>
//                         <textarea
//                           name="address"
//                           value={formData.address}
//                           onChange={handleChange}
//                           required
//                           className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                           rows={3}
//                           placeholder="Complete address"
//                         ></textarea>
//                       </div>

//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             City <span className="text-red-500">*</span>
//                           </label>
//                           <input
//                             type="text"
//                             name="city"
//                             value={formData.city}
//                             onChange={handleChange}
//                             required
//                             className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                             placeholder="City"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Pin Code <span className="text-red-500">*</span>
//                           </label>
//                           <input
//                             type="text"
//                             name="pincode"
//                             value={formData.pincode}
//                             onChange={handleChange}
//                             required
//                             className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                             placeholder="Pin Code"
//                           />
//                         </div>
//                       </div>

//                       <div className="mt-4">
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Landmark</label>
//                         <input
//                           type="text"
//                           name="landmark"
//                           value={formData.landmark}
//                           onChange={handleChange}
//                           className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                           placeholder="Nearby landmark"
//                         />
//                       </div>

//                       <div className="mt-4">
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Location Coordinates <span className="text-red-500">*</span>
//                         </label>
//                         <div className="mb-4 map-container">
//                           {apikey && mapId ? (
//                             <APIProvider apiKey={apikey}>
//                               <Map
//                                 center={
//                                   formData.latitude && formData.longitude
//                                     ? { lat: parseFloat(formData.latitude), lng: parseFloat(formData.longitude) }
//                                     : { lat: 28.6139, lng: 77.2090 }
//                                 }
//                                 zoom={15}
//                                 mapTypeId="roadmap"
//                                 mapId={mapId}
//                                 gestureHandling="greedy"
//                                 scrollwheel={true}
//                                 disableDefaultUI={false}
//                                 zoomControl={true}
//                                 zoomControlOptions={{ position: 'RIGHT_CENTER' }}
//                                 style={{ height: '300px', width: '100%' }}
//                               >
//                                 {formData.latitude && formData.longitude && (
//                                   <AdvancedMarker
//                                     position={{
//                                       lat: parseFloat(formData.latitude),
//                                       lng: parseFloat(formData.longitude),
//                                     }}
//                                   >
//                                     <Pin background="#FBBC04" glyphColor="#000" borderColor="#000" />
//                                   </AdvancedMarker>
//                                 )}
//                               </Map>
//                             </APIProvider>
//                           ) : (
//                             <p className="text-red-600">{apikey ? 'Map ID is missing.' : 'Google Maps API key is missing.'}</p>
//                           )}
//                         </div>
//                         <div className="flex flex-col sm:flex-row gap-2 mb-2">
//                           <Button
//                             type="button"
//                             onClick={handleOpenMapModal}
//                             className="bg-[#4261FF] hover:bg-[#6D4EFF] text-white px-4 py-2 rounded"
//                           >
//                             Verify Location
//                           </Button>
//                         </div>
//                         {formData.latitude && formData.longitude ? (
//                           <p className="text-sm text-gray-600">
//                             Location: Lat: {formData.latitude}, Lng: {formData.longitude}
//                           </p>
//                         ) : locationError ? (
//                           <p className="text-sm text-red-600">{locationError}</p>
//                         ) : (
//                           <p className="text-sm text-gray-500">Select a location</p>
//                         )}
//                       </div>

//                       <div className="mt-4">
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Price (Monthly) <span className="text-red-500">*</span>
//                         </label>
//                         <div className="flex items-center gap-4">
//                           <p>Rs</p>
//                           <input
//                             type="number"
//                             name="price"
//                             value={formData.price}
//                             onChange={handleChange}
//                             required
//                             className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                             placeholder="1000"
//                           />
//                         </div>
//                       </div>
//                     </div>

//                     <div>
//                       <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">Upload Photos</h3>
//                       <div className="space-y-4">{renderFileUpload()}</div>
//                     </div>

//                     <div>
//                       <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">Additional Details</h3>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Weekday Footfall</label>
//                           <input
//                             type="number"
//                             name="weekdayFootfall"
//                             value={formData.weekdayFootfall}
//                             onChange={handleChange}
//                             className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                             placeholder="Average daily visitors"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Weekend Footfall</label>
//                           <input
//                             type="number"
//                             name="weekendFootfall"
//                             value={formData.weekendFootfall}
//                             onChange={handleChange}
//                             className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                             placeholder="Average weekend visitors"
//                           />
//                         </div>
//                       </div>

//                       <div className="mt-4">
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Branding Area Size (sq.ft)</label>
//                         <input
//                           type="text"
//                           name="brandingAreaSize"
//                           value={formData.brandingAreaSize}
//                           onChange={handleChange}
//                           className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                           placeholder="e.g., Wall: 8×6 ft"
//                         />
//                       </div>

//                       <div className="mt-4">
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Age Group Mix</label>
//                         <input
//                           type="text"
//                           name="ageGroupMix"
//                           value={formData.ageGroupMix}
//                           onChange={handleChange}
//                           className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                           placeholder="e.g., Young adults, Families"
//                         />
//                       </div>

//                       <div className="mt-4">
//                         <label className="block text-sm font-medium text-gray-700 mb-1">CCTV Cameras?</label>
//                         <select
//                           name="hasCCTV"
//                           value={formData.hasCCTV}
//                           onChange={handleChange}
//                           className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                         >
//                           <option value="">Select</option>
//                           <option value="yes">Yes</option>
//                           <option value="no">No</option>
//                         </select>
//                       </div>

//                       {formData.hasCCTV === 'yes' && (
//                         <>
//                           <div className="mt-4">
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Camera Count *</label>
//                             <input
//                               type="number"
//                               name="cameraCount"
//                               value={formData.cameraCount}
//                               onChange={handleChange}
//                               required
//                               className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                               placeholder="Number of cameras"
//                             />
//                           </div>
//                           <div className="mt-4">
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Camera Aligned with Branding Zones? *</label>
//                             <select
//                               name="cameraAligned"
//                               value={formData.cameraAligned}
//                               onChange={handleChange}
//                               required
//                               className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                             >
//                               <option value="">Select</option>
//                               <option value="yes">Yes</option>
//                               <option value="no">No</option>
//                               <option value="unsure">Not sure</option>
//                             </select>
//                           </div>
//                         </>
//                       )}

//                       {spaceCount === 0 && (
//                         <div className="mt-4">
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Bank Details (Required for First Space) <span className="text-red-500">*</span>
//                           </label>
//                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <input
//                               type="text"
//                               name="bankDetails.accountNumber"
//                               value={formData.bankDetails.accountNumber}
//                               onChange={handleChange}
//                               required
//                               className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                               placeholder="Account Number"
//                             />
//                             <input
//                               type="text"
//                               name="bankDetails.ifscCode"
//                               value={formData.bankDetails.ifscCode}
//                               onChange={handleChange}
//                               required
//                               className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                               placeholder="IFSC Code"
//                             />
//                             <input
//                               type="text"
//                               name="bankDetails.bankName"
//                               value={formData.bankDetails.bankName}
//                               onChange={handleChange}
//                               required
//                               className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                               placeholder="Bank Name"
//                             />
//                             <input
//                               type="text"
//                               name="bankDetails.accountHolderName"
//                               value={formData.bankDetails.accountHolderName}
//                               onChange={handleChange}
//                               required
//                               className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                               placeholder="Account Holder Name"
//                             />
//                           </div>
//                         </div>
//                       )}

//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">PAN Number</label>
//                           <input
//                             type="text"
//                             name="complianceDetails.panNumber"
//                             value={formData.complianceDetails.panNumber}
//                             onChange={handleChange}
//                             className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                             placeholder="PAN number"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">GST Number</label>
//                           <input
//                             type="text"
//                             name="complianceDetails.gstNumber"
//                             value={formData.complianceDetails.gstNumber}
//                             onChange={handleChange}
//                             className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                             placeholder="GST number"
//                           />
//                         </div>
//                       </div>

//                       <div className="mt-4">
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Heat Mapping?</label>
//                         <select
//                           name="heatMapping"
//                           value={formData.heatMapping}
//                           onChange={handleChange}
//                           className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                         >
//                           <option value="">Select</option>
//                           <option value="yes">Yes</option>
//                           <option value="no">No</option>
//                         </select>
//                       </div>

//                       <div className="mt-4">
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Listing Type</label>
//                         <select
//                           name="listingType"
//                           value={formData.listingType}
//                           onChange={handleChange}
//                           className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                         >
//                           <option value="free">Free Listing</option>
//                           <option value="premium">Premium Listing</option>
//                         </select>
//                       </div>

//                       <div className="mt-4">
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Branding Timing</label>
//                         <input
//                           type="text"
//                           name="preferredTiming"
//                           value={formData.preferredTiming}
//                           onChange={handleChange}
//                           className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                           placeholder="e.g., Weekends only"
//                         />
//                       </div>

//                       {renderAvailabilityForm()}
//                     </div>

//                     <div className="pt-4">
//                       <Button
//                         type="submit"
//                         className="w-full bg-[#6D4EFF] hover:bg-[#4261FF]"
//                         size="lg"
//                         disabled={!isFormValid() || isSubmitting}
//                       >
//                         {isSubmitting ? 'Submitting...' : 'Submit Registration'}
//                       </Button>
//                       <p className="text-center text-sm text-gray-500 mt-4">
//                         Your space will be reviewed within 48-72 hours.
//                       </p>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </section>
//         </main>

//         <Footer />
//       </div>
//       <ToastContainer position="bottom-right" autoClose={5000} />
//     </>
//   );
// };

// export default Registration;