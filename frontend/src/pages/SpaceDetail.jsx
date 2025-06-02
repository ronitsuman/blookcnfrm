// import { useEffect, useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { ArrowLeft, MapPin, Users, Clock, Star } from 'lucide-react';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';

// const SpaceDetails = () => {
//   const { id } = useParams();
//   const [space, setSpace] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState('exterior');
//   const [mapLoaded, setMapLoaded] = useState(false);
//   const [error, setError] = useState(null);

//   // Replace with your actual API key and Map ID
//   const apikey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
//   const mapId = import.meta.env.VITE_GOOGLE_MAPS_MAP_ID;
//   const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY; // Replace with your API key
//   const MAP_ID =  import.meta.env.VITE_GOOGLE_MAPS_MAP_ID; // Replace with your Map ID from Google Cloud Console

//   useEffect(() => {
//     const fetchSpaceDetails = async () => {
//       try {
//         const res = await fetch(`http://localhost:5000/api/spaces/${id}`);
//         const data = await res.json();
//         setSpace(data);

//         // Load Google Maps script if not already loaded
//         if (data.location?.coordinates && !window.google) {
//           const script = document.createElement('script');
//           script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&loading=async&callback=initMap&libraries=maps,marker&v=beta`;
//           script.async = true;
//           script.defer = true;
//           script.onerror = () => {
//             setError('Failed to load Google Maps script');
//             setLoading(false);
//           };
//           document.head.appendChild(script);
//           window.initMap = () => {
//             setMapLoaded(true);
//           };
//         } else if (window.google) {
//           setMapLoaded(true); // If Google Maps is already loaded
//         }
//       } catch (error) {
//         console.error('Error fetching space details:', error);
//         setError('Error fetching space details');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSpaceDetails();

//     // Cleanup script on component unmount
//     return () => {
//       const script = document.querySelector(`script[src*="maps.googleapis.com"]`);
//       if (script) document.head.removeChild(script);
//       delete window.initMap;
//     };
//   }, [id]);

//   useEffect(() => {
//     if (mapLoaded && space?.location?.coordinates) {
//       const mapElement = document.getElementById('map');
//       if (!mapElement) {
//         console.error('Map container not found');
//         setError('Map container not found');
//         return;
//       }

//       try {
//         const map = new window.google.maps.Map(mapElement, {
//           center: {
//             lat: space.location.coordinates[1],
//             lng: space.location.coordinates[0],
//           },
//           zoom: 15,
//           mapId: MAP_ID, // Include Map ID for Advanced Markers
//         });

//         new window.google.maps.marker.AdvancedMarkerElement({
//           position: {
//             lat: space.location.coordinates[1],
//             lng: space.location.coordinates[0],
//           },
//           map: map,
//           title: space.businessName,
//         });
//       } catch (err) {
//         console.error('Error initializing map:', err);
//         setError('Failed to initialize map');
//       }
//     }
//   }, [mapLoaded, space]);

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

//   if (!space) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-lg">Space not found</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       <Navbar />
//       <main className="flex-grow container mx-auto px-4 py-8">
//         <Link
//           to="/browse-spaces"
//           className="flex items-center text-blue-600 mb-6 hover:text-blue-800 transition"
//         >
//           <ArrowLeft className="mr-2" size={20} />
//           Back to All Spaces
//         </Link>

//         {space.listingType === 'premium' && (
//           <div className="absolute top-24 right-6 bg-yellow-400 text-black px-3 py-1 rounded-md flex items-center font-bold z-10">
//             <Star size={16} className="mr-1 fill-black" />
//             TOP CHOICE
//           </div>
//         )}

//         <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//           <div className="relative h-96 bg-gray-200">
//             {activeTab === 'exterior' && space.photos?.exteriorPhoto && (
//               <img
//                 src={space.photos.exteriorPhoto}
//                 alt="Exterior"
//                 className="w-full h-full object-cover"
//               />
//             )}
//             {activeTab === 'interior' && space.photos?.interiorPhoto && (
//               <img
//                 src={space.photos.interiorPhoto}
//                 alt="Interior"
//                 className="w-full h-full object-cover"
//               />
//             )}
//             {activeTab === 'branding' && space.photos?.brandingZonePhoto && (
//               <img
//                 src={space.photos.brandingZonePhoto}
//                 alt="Branding Zone"
//                 className="w-full h-full object-cover"
//               />
//             )}
//           </div>

//           <div className="p-6">
//             <div className="flex justify-between items-start mb-4">
//               <div>
//                 <h1 className="text-3xl font-bold">{space.businessName}</h1>
//                 <div className="flex items-center text-gray-600 mt-2">
//                   <MapPin size={16} className="mr-1" />
//                   <span>
//                     {space.address}, {space.city}
//                   </span>
//                 </div>
//               </div>
//               <div className="bg-gray-100 px-3 py-1 rounded-full text-sm capitalize">
//                 {space.spaceType}
//               </div>
//             </div>

//             <div className="flex border-b mb-6">
//               <button
//                 onClick={() => setActiveTab('exterior')}
//                 className={`px-4 py-2 font-medium ${
//                   activeTab === 'exterior' ? 'border-b-2 border-blue-600' : 'text-gray-500'
//                 }`}
//               >
//                 Exterior
//               </button>
//               <button
//                 onClick={() => setActiveTab('interior')}
//                 className={`px-4 py-2 font-medium ${
//                   activeTab === 'interior' ? 'border-b-2 border-blue-600' : 'text-gray-500'
//                 }`}
//               >
//                 Interior
//               </button>
//               <button
//                 onClick={() => setActiveTab('branding')}
//                 className={`px-4 py-2 font-medium ${
//                   activeTab === 'branding' ? 'border-b-2 border-blue-600' : 'text-gray-500'
//                 }`}
//               >
//                 Branding Zone
//               </button>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//               <div className="space-y-4">
//                 <div>
//                   <h3 className="font-semibold text-gray-700">Footfall Data</h3>
//                   <div className="grid grid-cols-2 gap-4 mt-2">
//                     <div className="bg-gray-50 p-4 rounded-lg">
//                       <h4 className="text-sm text-gray-500">Weekday</h4>
//                       <p className="text-xl font-bold">{space.weekdayFootfall}</p>
//                     </div>
//                     <div className="bg-gray-50 p-4 rounded-lg">
//                       <h4 className="text-sm text-gray-500">Weekend</h4>
//                       <p className="text-xl font-bold">{space.weekendFootfall}</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <h3 className="font-semibold text-gray-700">Features</h3>
//                   <div className="flex flex-wrap gap-2 mt-2">
//                     {space.hasCCTV === 'yes' && (
//                       <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
//                         CCTV
//                       </span>
//                     )}
//                     {space.heatMapping === 'yes' && (
//                       <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
//                         Heat Mapping
//                       </span>
//                     )}
//                     <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
//                       {space.brandingAreaSize} branding area
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div>
//                 <h3 className="font-semibold text-gray-700">Location</h3>
//                 <div
//                   id="map"
//                   className="h-64 mt-2 rounded-lg bg-gray-200"
//                   style={{ minHeight: '256px', width: '100%' }} // Ensure explicit dimensions
//                 ></div>
//                 {space.landmark && (
//                   <p className="mt-2 text-sm text-gray-600">
//                     <span className="font-medium">Landmark:</span> {space.landmark}
//                   </p>
//                 )}
//               </div>
//             </div>

//             <div className="mb-6">
//               <h3 className="font-semibold text-gray-700 mb-2">Preferred Timing</h3>
//               <p>{space.preferredTiming}</p>
//             </div>

//             <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition">
//               Contact for Booking
//             </button>
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default SpaceDetails;
// frontend/src/pages/SpaceDetails.jsx
// // frontend/src/pages/SpaceDetails.jsx
// import { useEffect, useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { ArrowLeft, MapPin, Users, Clock, Star, ChevronLeft, ChevronRight, X } from 'lucide-react';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';

// const SpaceDetails = () => {
//   const { id } = useParams();
//   const [space, setSpace] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [mapLoaded, setMapLoaded] = useState(false);
//   const [error, setError] = useState(null);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isFullScreen, setIsFullScreen] = useState(false);

//   const apikey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
//   const mapId = import.meta.env.VITE_GOOGLE_MAPS_MAP_ID;
//   const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
//   const MAP_ID = import.meta.env.VITE_GOOGLE_MAPS_MAP_ID;

//   useEffect(() => {
//     const fetchSpaceDetails = async () => {
//       try {
//         const res = await fetch(`http://localhost:5000/api/spaces/${id}`);
//         if (!res.ok) throw new Error('Failed to fetch space details');
//         const data = await res.json();
//         setSpace(data.data);

//         if (data.data?.location?.coordinates && !window.google) {
//           const script = document.createElement('script');
//           script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&loading=async&callback=initMap&libraries=maps,marker&v=beta`;
//           script.async = true;
//           script.defer = true;
//           script.onerror = () => {
//             setError('Failed to load Google Maps script');
//             setLoading(false);
//           };
//           document.head.appendChild(script);
//           window.initMap = () => {
//             setMapLoaded(true);
//           };
//         } else if (window.google) {
//           setMapLoaded(true);
//         }
//       } catch (error) {
//         console.error('Error fetching space details:', error);
//         setError('Error fetching space details');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSpaceDetails();

//     return () => {
//       const script = document.querySelector(`script[src*="maps.googleapis.com"]`);
//       if (script) document.head.removeChild(script);
//       delete window.initMap;
//     };
//   }, [id]);

//   useEffect(() => {
//     if (mapLoaded && space?.location?.coordinates) {
//       const mapElement = document.getElementById('map');
//       if (!mapElement) {
//         console.error('Map container not found');
//         setError('Map container not found');
//         return;
//       }

//       try {
//         const map = new window.google.maps.Map(mapElement, {
//           center: {
//             lat: space.location.coordinates[1],
//             lng: space.location.coordinates[0],
//           },
//           zoom: 15,
//           mapId: MAP_ID,
//         });

//         new window.google.maps.marker.AdvancedMarkerElement({
//           position: {
//             lat: space.location.coordinates[1],
//             lng: space.location.coordinates[0],
//           },
//           map: map,
//           title: space.name,
//         });
//       } catch (err) {
//         console.error('Error initializing map:', err);
//         setError('Failed to initialize map');
//       }
//     }
//   }, [mapLoaded, space]);

//   const handlePrevImage = () => {
//     if (space.photos && space.photos.length > 0) {
//       setCurrentImageIndex((prevIndex) =>
//         prevIndex === 0 ? space.photos.length - 1 : prevIndex - 1
//       );
//     }
//   };

//   const handleNextImage = () => {
//     if (space.photos && space.photos.length > 0) {
//       setCurrentImageIndex((prevIndex) =>
//         prevIndex === space.photos.length - 1 ? 0 : prevIndex + 1
//       );
//     }
//   };

//   const openFullScreen = () => {
//     setIsFullScreen(true);
//   };

//   const closeFullScreen = () => {
//     setIsFullScreen(false);
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

//   if (!space) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-lg">Space not found</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       <Navbar />
//       <main className="flex-grow container mx-auto px-4 py-8">
//         <Link
//           to="/browse-spaces"
//           className="flex items-center text-blue-600 mb-6 hover:text-blue-800 transition"
//         >
//           <ArrowLeft className="mr-2" size={20} />
//           Back to All Spaces
//         </Link>

//         {space.listingType === 'premium' && (
//           <div className="absolute top-24 right-6 bg-yellow-400 text-black px-3 py-1 rounded-md flex items-center font-bold z-10">
//             <Star size={16} className="mr-1 fill-black" />
//             TOP CHOICE
//           </div>
//         )}

//         <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//           {/* Image Gallery */}
//           <div className="relative h-96 bg-gray-200">
//             {space.photos && space.photos.length > 0 ? (
//               <>
//                 <img
//                   src={space.photos[currentImageIndex]}
//                   alt={`Space Image ${currentImageIndex + 1}`}
//                   className="w-full h-full object-cover cursor-pointer"
//                   onClick={openFullScreen}
//                 />
//                 {/* Arrows */}
//                 <button
//                   onClick={handlePrevImage}
//                   className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
//                 >
//                   <ChevronLeft size={24} />
//                 </button>
//                 <button
//                   onClick={handleNextImage}
//                   className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
//                 >
//                   <ChevronRight size={24} />
//                 </button>
//                 {/* Image Counter */}
//                 <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
//                   {currentImageIndex + 1} / {space.photos.length}
//                 </div>
//               </>
//             ) : (
//               <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
//                 No images available
//               </div>
//             )}
//           </div>

//           {/* Full-Screen Modal */}
//           {isFullScreen && space.photos && space.photos.length > 0 && (
//             <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
//               <button
//                 onClick={closeFullScreen}
//                 className="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-gray-700 transition"
//               >
//                 <X size={24} />
//               </button>
//               <button
//                 onClick={handlePrevImage}
//                 className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full hover:bg-gray-700 transition"
//               >
//                 <ChevronLeft size={24} />
//               </button>
//               <button
//                 onClick={handleNextImage}
//                 className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full hover:bg-gray-700 transition"
//               >
//                 <ChevronRight size={24} />
//               </button>
//               <img
//                 src={space.photos[currentImageIndex]}
//                 alt={`Space Image ${currentImageIndex + 1}`}
//                 className="max-w-full max-h-full object-contain"
//               />
//             </div>
//           )}

//           <div className="p-6">
//             <div className="flex justify-between items-start mb-4">
//               <div>
//                 <h1 className="text-3xl font-bold">{space.name}</h1>
//                 <div className="flex items-center text-gray-600 mt-2">
//                   <MapPin size={16} className="mr-1" />
//                   <span>
//                     {space.address}, {space.city}, {space.pincode}
//                   </span>
//                 </div>
//               </div>
//               <div className="bg-gray-100 px-3 py-1 rounded-full text-sm capitalize">
//                 {space.type}
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//               <div className="space-y-4">
//                 <div>
//                   <h3 className="font-semibold text-gray-700">Details</h3>
//                   <div className="grid grid-cols-2 gap-4 mt-2 text-sm text-gray-600">
//                     <div>
//                       <span className="font-medium">Manager:</span> {space.managerName}
//                     </div>
//                     <div>
//                       <span className="font-medium">Phone:</span> {space.phone}
//                     </div>
//                     <div>
//                       <span className="font-medium">Price:</span> ₹{space.price?.toLocaleString() || 'N/A'}
//                     </div>
//                     <div>
//                       <span className="font-medium">Listing Type:</span> {space.listingType}
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <h3 className="font-semibold text-gray-700">Footfall Data</h3>
//                   <div className="grid grid-cols-2 gap-4 mt-2">
//                     <div className="bg-gray-50 p-4 rounded-lg">
//                       <h4 className="text-sm text-gray-500">Weekday</h4>
//                       <p className="text-xl font-bold">{space.weekdayFootfall || 'N/A'}</p>
//                     </div>
//                     <div className="bg-gray-50 p-4 rounded-lg">
//                       <h4 className="text-sm text-gray-500">Weekend</h4>
//                       <p className="text-xl font-bold">{space.weekendFootfall || 'N/A'}</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <h3 className="font-semibold text-gray-700">Features</h3>
//                   <div className="flex flex-wrap gap-2 mt-2">
//                     {space.hasCCTV === 'yes' && (
//                       <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
//                         CCTV ({space.cameraCount} cameras, Aligned: {space.cameraAligned})
//                       </span>
//                     )}
//                     {space.heatMapping === 'yes' && (
//                       <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
//                         Heat Mapping
//                       </span>
//                     )}
//                     {space.brandingAreaSize && (
//                       <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
//                         {space.brandingAreaSize} Branding Area
//                       </span>
//                     )}
//                   </div>
//                 </div>

//                 <div>
//                   <h3 className="font-semibold text-gray-700">Compliance Details</h3>
//                   <div className="grid grid-cols-2 gap-4 mt-2 text-sm text-gray-600">
//                     {space.complianceDetails?.panNumber && (
//                       <div>
//                         <span className="font-medium">PAN:</span> {space.complianceDetails.panNumber}
//                       </div>
//                     )}
//                     {space.complianceDetails?.gstNumber && (
//                       <div>
//                         <span className="font-medium">GST:</span> {space.complianceDetails.gstNumber}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               <div>
//                 <h3 className="font-semibold text-gray-700">Location</h3>
//                 <div
//                   id="map"
//                   className="h-64 mt-2 rounded-lg bg-gray-200"
//                   style={{ minHeight: '256px', width: '100%' }}
//                 ></div>
//                 {space.landmark && (
//                   <p className="mt-2 text-sm text-gray-600">
//                     <span className="font-medium">Landmark:</span> {space.landmark}
//                   </p>
//                 )}
//               </div>
//             </div>

//             {space.preferredTiming && (
//               <div className="mb-6">
//                 <h3 className="font-semibold text-gray-700 mb-2">Preferred Timing</h3>
//                 <p>{space.preferredTiming}</p>
//               </div>
//             )}

//             <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition">
//               Contact for Booking
//             </button>
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default SpaceDetails;


import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Users, Clock, Star, ChevronLeft, ChevronRight, X, Calendar } from 'lucide-react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '../components/ui/Button';
import BookingForm from '../components/BookingForm';

const SpaceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [space, setSpace] = useState(null);
  const [availabilities, setAvailabilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const apikey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const mapId = import.meta.env.VITE_GOOGLE_MAPS_MAP_ID;
  const apiUrl =  'http://localhost:5000/api';

  useEffect(() => {
    if (!user) {
      toast.error('Login to view the details');
      navigate('/login');
      return;
    }

    const fetchSpaceDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const [spaceRes, availRes] = await Promise.all([
          axios.get(`${apiUrl}/spaces/${id}`),
          axios.get(`${apiUrl}/availabilities/space/${id}`),
        ]);

        setSpace(spaceRes.data.data);
        setAvailabilities(availRes.data.data || []);

        if (spaceRes.data.data?.location?.coordinates && !window.google) {
          const script = document.createElement('script');
          script.src = `https://maps.googleapis.com/maps/api/js?key=${apikey}&loading=async&callback=initMap&libraries=maps,marker&v=beta`;
          script.async = true;
          script.defer = true;
          script.onerror = () => {
            setError('Failed to load Google Maps script');
            setLoading(false);
          };
          document.head.appendChild(script);
          window.initMap = () => {
            setMapLoaded(true);
          };
        } else if (window.google) {
          setMapLoaded(true);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching space or availability details');
      } finally {
        setLoading(false);
      }
    };

    fetchSpaceDetails();

    return () => {
      const script = document.querySelector(`script[src*="maps.googleapis.com"]`);
      if (script) document.head.removeChild(script);
      delete window.initMap;
    };
  }, [id, apikey, user, navigate]);

  useEffect(() => {
    if (mapLoaded && space?.location?.coordinates) {
      const mapElement = document.getElementById('map');
      if (!mapElement) {
        console.error('Map container not found');
        setError('Map container not found');
        return;
      }

      try {
        const map = new window.google.maps.Map(mapElement, {
          center: {
            lat: space.location.coordinates[1],
            lng: space.location.coordinates[0],
          },
          zoom: 15,
          mapId: mapId,
        });

        new window.google.maps.marker.AdvancedMarkerElement({
          position: {
            lat: space.location.coordinates[1],
            lng: space.location.coordinates[0],
          },
          map: map,
          title: space.name,
        });
      } catch (err) {
        console.error('Error initializing map:', err);
        setError('Failed to initialize map');
      }
    }
  }, [mapLoaded, space]);

  const handlePrevImage = () => {
    if (space.photos && space.photos.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? space.photos.length - 1 : prevIndex - 1
      );
    }
  };

  const handleNextImage = () => {
    if (space.photos && space.photos.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === space.photos.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const openFullScreen = () => {
    setIsFullScreen(true);
  };

  const closeFullScreen = () => {
    setIsFullScreen(false);
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

  if (!space) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Space not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Link
          to="/browse-spaces"
          className="flex items-center text-blue-600 mb-6 hover:text-blue-800 transition"
        >
          <ArrowLeft className="mr-2" size={20} />
          Back to All Spaces
        </Link>

        {space.listingType === 'premium' && (
          <div className="absolute top-24 right-6 bg-yellow-400 text-black px-3 py-1 rounded-md flex items-center font-bold z-10">
            <Star size={16} className="mr-1 fill-black" />
            TOP CHOICE
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-96 bg-gray-200">
            {space.photos && space.photos.length > 0 ? (
              <>
                <img
                  src={space.photos[currentImageIndex]}
                  alt={`Space Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={openFullScreen}
                />
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
                >
                  <ChevronRight size={24} />
                </button>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {space.photos.length}
                </div>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                No images available
              </div>
            )}
          </div>

          {isFullScreen && space.photos && space.photos.length > 0 && (
            <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
              <button
                onClick={closeFullScreen}
                className="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-gray-700 transition"
              >
                <X size={24} />
              </button>
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full hover:bg-gray-700 transition"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full hover:bg-gray-700 transition"
              >
                <ChevronRight size={24} />
              </button>
              <img
                src={space.photos[currentImageIndex]}
                alt={`Space Image ${currentImageIndex + 1}`}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          )}

          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold">{space.name}</h1>
                <div className="flex items-center text-gray-600 mt-2">
                  <MapPin size={16} className="mr-1" />
                  <span>
                    {space.address}, {space.city}, {space.pincode}
                  </span>
                </div>
              </div>
              <div className="bg-gray-100 px-3 py-1 rounded-full text-sm capitalize">
                {space.type}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-700">Details</h3>
                  <div className="grid grid-cols-2 gap-4 mt-2 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Manager:</span> {space.managerName}
                    </div>
                    <div>
                      <span className="font-medium">Phone:</span> {space.phone}
                    </div>
                    <div>
                      <span className="font-medium">Email:</span> {space.email || 'N/A'}
                    </div>
                    <div>
                      <span className="font-medium">Price:</span> ₹{space.price?.toLocaleString() || 'N/A'}/month
                    </div>
                    <div>
                      <span className="font-medium">Listing Type:</span> {space.listingType}
                    </div>
                    <div>
                      <span className="font-medium">Age Group:</span> {space.ageGroupMix || 'N/A'}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700">Footfall Data</h3>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm text-gray-500">Weekday</h4>
                      <p className="text-xl font-bold">{space.weekdayFootfall || 'N/A'}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm text-gray-500">Weekend</h4>
                      <p className="text-xl font-bold">{space.weekendFootfall || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700">Features</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {space.hasCCTV === 'yes' && (
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        CCTV ({space.cameraCount} cameras, Aligned: {space.cameraAligned})
                      </span>
                    )}
                    {space.heatMapping === 'yes' && (
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        Heat Mapping
                      </span>
                    )}
                    {space.brandingAreaSize && (
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {space.brandingAreaSize} Branding Area
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700">Compliance Details</h3>
                  <div className="grid grid-cols-2 gap-4 mt-2 text-sm text-gray-600">
                    {space.complianceDetails?.panNumber && (
                      <div>
                        <span className="font-medium">PAN:</span> {space.complianceDetails.panNumber}
                      </div>
                    )}
                    {space.complianceDetails?.gstNumber && (
                      <div>
                        <span className="font-medium">GST:</span> {space.complianceDetails.gstNumber}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Availability</h3>
                  {availabilities.length > 0 ? (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <ul className="space-y-2 text-sm text-gray-600">
                        {availabilities.slice(0, 3).map((avail) => (
                          <li key={avail._id} className="flex items-center">
                            <Calendar size={16} className="mr-2 text-blue-600" />
                            <span>
                              {new Date(avail.startDate).toLocaleString()} - {new Date(avail.endDate).toLocaleString()}
                              {avail.price ? ` (₹${avail.price})` : ''}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        className="mt-4 bg-[#4261FF] hover:bg-[#6D4EFF] text-white"
                        onClick={() => navigate(`/spaces/${space._id}/availability`)}
                      >
                        View Full Calendar
                      </Button>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No availability slots available</p>
                  )}
                </div>

                <BookingForm spaceId={space._id} spacePrice={space.price} />
              </div>

              <div>
                <h3 className="font-semibold text-gray-700">Location</h3>
                <div
                  id="map"
                  className="h-64 mt-2 rounded-lg bg-gray-200"
                  style={{ minHeight: '256px', width: '100%' }}
                ></div>
                {space.landmark && (
                  <p className="mt-2 text-sm text-gray-600">
                    <span className="font-medium">Landmark:</span> {space.landmark}
                  </p>
                )}
              </div>
            </div>

            {space.preferredTiming && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-2">Preferred Timing</h3>
                <p>{space.preferredTiming}</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
      <ToastContainer position="bottom-right" autoClose={5000} />
    </div>
  );
};

export default SpaceDetails;