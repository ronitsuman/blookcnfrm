import React from 'react';
import { MapPin } from 'lucide-react';
import { Button } from './ui/Button';
import { useNavigate } from 'react-router-dom';

const SpaceCard = ({ space }) => {
  const navigate = useNavigate();

  const handleCheckAvailability = () => {
    if (!space?._id) {
      console.error('Invalid space ID:', space);
      toast.error('Unable to check availability: Invalid space');
      return;
    }
    console.log('Navigating to availability for space ID:', space._id);
    navigate(`/spaces/${space._id}/availability`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <img
        src={space.photos[0] || 'https://via.placeholder.com/300x200'}
        alt={space.name || 'Space'}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{space.name || 'Untitled Space'}</h3>
        <div className="flex items-center text-sm text-gray-500 mt-1">
          <MapPin className="h-4 w-4 mr-1" />
          {space.city || 'N/A'}
        </div>
        <p className="text-sm text-gray-600 mt-1">Type: {space.type || 'N/A'}</p>
        <p className="text-sm text-gray-600 mt-1">Price: ₹{space.price || 0}/month</p>
        <p className="text-sm text-gray-600 mt-1">Age Group: {space.ageGroupMix || 'N/A'}</p>
        <p className="text-sm text-gray-600 mt-1">Weekday Footfall: {space.weekdayFootfall || 'N/A'}</p>
        <p className="text-sm text-gray-600 mt-1">Weekend Footfall: {space.weekendFootfall || 'N/A'}</p>
        <Button
          className="mt-4 bg-[#4261FF] hover:bg-[#6D4EFF] text-white"
          onClick={handleCheckAvailability}
        >
          Check Availability
        </Button>
      </div>
    </div>
  );
};

export default SpaceCard;