import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Users, Clock, Star } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SpaceDetails = () => {
  const { id } = useParams();
  const [space, setSpace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('exterior');
  const [mapLoaded, setMapLoaded] = useState(false);
  const [error, setError] = useState(null);

  // Replace with your actual API key and Map ID
  const apikey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const mapId = import.meta.env.VITE_GOOGLE_MAPS_MAP_ID;
  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY; // Replace with your API key
  const MAP_ID =  import.meta.env.VITE_GOOGLE_MAPS_MAP_ID; // Replace with your Map ID from Google Cloud Console

  useEffect(() => {
    const fetchSpaceDetails = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/spaces/${id}`);
        const data = await res.json();
        setSpace(data);

        // Load Google Maps script if not already loaded
        if (data.location?.coordinates && !window.google) {
          const script = document.createElement('script');
          script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&loading=async&callback=initMap&libraries=maps,marker&v=beta`;
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
          setMapLoaded(true); // If Google Maps is already loaded
        }
      } catch (error) {
        console.error('Error fetching space details:', error);
        setError('Error fetching space details');
      } finally {
        setLoading(false);
      }
    };

    fetchSpaceDetails();

    // Cleanup script on component unmount
    return () => {
      const script = document.querySelector(`script[src*="maps.googleapis.com"]`);
      if (script) document.head.removeChild(script);
      delete window.initMap;
    };
  }, [id]);

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
          mapId: MAP_ID, // Include Map ID for Advanced Markers
        });

        new window.google.maps.marker.AdvancedMarkerElement({
          position: {
            lat: space.location.coordinates[1],
            lng: space.location.coordinates[0],
          },
          map: map,
          title: space.businessName,
        });
      } catch (err) {
        console.error('Error initializing map:', err);
        setError('Failed to initialize map');
      }
    }
  }, [mapLoaded, space]);

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
            {activeTab === 'exterior' && space.photos?.exteriorPhoto && (
              <img
                src={space.photos.exteriorPhoto}
                alt="Exterior"
                className="w-full h-full object-cover"
              />
            )}
            {activeTab === 'interior' && space.photos?.interiorPhoto && (
              <img
                src={space.photos.interiorPhoto}
                alt="Interior"
                className="w-full h-full object-cover"
              />
            )}
            {activeTab === 'branding' && space.photos?.brandingZonePhoto && (
              <img
                src={space.photos.brandingZonePhoto}
                alt="Branding Zone"
                className="w-full h-full object-cover"
              />
            )}
          </div>

          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold">{space.businessName}</h1>
                <div className="flex items-center text-gray-600 mt-2">
                  <MapPin size={16} className="mr-1" />
                  <span>
                    {space.address}, {space.city}
                  </span>
                </div>
              </div>
              <div className="bg-gray-100 px-3 py-1 rounded-full text-sm capitalize">
                {space.spaceType}
              </div>
            </div>

            <div className="flex border-b mb-6">
              <button
                onClick={() => setActiveTab('exterior')}
                className={`px-4 py-2 font-medium ${
                  activeTab === 'exterior' ? 'border-b-2 border-blue-600' : 'text-gray-500'
                }`}
              >
                Exterior
              </button>
              <button
                onClick={() => setActiveTab('interior')}
                className={`px-4 py-2 font-medium ${
                  activeTab === 'interior' ? 'border-b-2 border-blue-600' : 'text-gray-500'
                }`}
              >
                Interior
              </button>
              <button
                onClick={() => setActiveTab('branding')}
                className={`px-4 py-2 font-medium ${
                  activeTab === 'branding' ? 'border-b-2 border-blue-600' : 'text-gray-500'
                }`}
              >
                Branding Zone
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-700">Footfall Data</h3>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm text-gray-500">Weekday</h4>
                      <p className="text-xl font-bold">{space.weekdayFootfall}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm text-gray-500">Weekend</h4>
                      <p className="text-xl font-bold">{space.weekendFootfall}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700">Features</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {space.hasCCTV === 'yes' && (
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        CCTV
                      </span>
                    )}
                    {space.heatMapping === 'yes' && (
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        Heat Mapping
                      </span>
                    )}
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {space.brandingAreaSize} branding area
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700">Location</h3>
                <div
                  id="map"
                  className="h-64 mt-2 rounded-lg bg-gray-200"
                  style={{ minHeight: '256px', width: '100%' }} // Ensure explicit dimensions
                ></div>
                {space.landmark && (
                  <p className="mt-2 text-sm text-gray-600">
                    <span className="font-medium">Landmark:</span> {space.landmark}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-2">Preferred Timing</h3>
              <p>{space.preferredTiming}</p>
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition">
              Contact for Booking
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SpaceDetails;