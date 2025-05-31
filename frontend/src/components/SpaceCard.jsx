// import { Star } from 'lucide-react';

// const SpaceCard = ({ space, onClick }) => {
//   return (
//     <div 
//       className="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer h-full"
//       onClick={onClick}
//     >
//       {space.listingType === 'premium' && (
//         <div className="absolute top-2 left-2 bg-yellow-400 text-black px-2 py-1 rounded-md flex items-center text-xs font-bold z-10">
//           <Star size={12} className="mr-1 fill-black" />
//           TOP CHOICE
//         </div>
//       )}

//       <div className="h-48 overflow-hidden">
//         <img 
//           src={space.photos?.exteriorPhoto || '/placeholder-space.jpg'} 
//           alt={space.businessName}
//           className="w-full h-full object-cover"
//         />
//       </div>

//       <div className="p-4">
//         <h3 className="font-bold text-lg mb-1">{space.businessName}</h3>
//         <div className="flex items-center text-gray-600 mb-2">
//           <span>{space.address}, {space.city}</span>
//         </div>
        
//         <div className="flex justify-between items-center">
//           <div>
//             <span className="text-sm text-gray-500">Weekday: </span>
//             <span className="font-medium">{space.weekdayFootfall}</span>
//           </div>
//           <div>
//             <span className="text-sm text-gray-500">Weekend: </span>
//             <span className="font-medium">{space.weekendFootfall}</span>
//           </div>
//         </div>

//         <div className="mt-2 flex flex-wrap gap-1">
//           {space.hasCCTV === 'yes' && (
//             <span className="bg-gray-100 text-xs px-2 py-1 rounded">CCTV</span>
//           )}
//           {space.heatMapping === 'yes' && (
//             <span className="bg-gray-100 text-xs px-2 py-1 rounded">Heat Map</span>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SpaceCard;

// import { Star } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// const SpaceCard = ({ space }) => {
//   const navigate = useNavigate();

//   const handleClick = () => {
//     navigate(`/spaces/${space._id}`);
//   };

//   return (
//     <div 
//       className="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer h-full"
//       onClick={handleClick}
//     >
//       {/* Premium Badge */}
//       {space.listingType === 'premium' && (
//         <div className="absolute top-2 left-2 bg-yellow-400 text-black px-2 py-1 rounded-md flex items-center text-xs font-bold z-10">
//           <Star size={12} className="mr-1 fill-black" />
//           PREMIUM
//         </div>
//       )}

//       {/* Space Image */}
//       <div className="h-48 overflow-hidden">
//         <img 
//           src={space.photos?.exteriorPhoto || '/placeholder-space.jpg'} 
//           alt={space.businessName}
//           className="w-full h-full object-cover"
//           onError={(e) => {
//             e.target.src = '/placeholder-space.jpg';
//           }}
//         />
//       </div>

//       {/* Space Details */}
//       <div className="p-4">
//         <h3 className="font-bold text-lg mb-1">{space.businessName}</h3>
//         <div className="flex items-center text-gray-600 mb-2">
//           <span>{space.address}, {space.city}</span>
//         </div>
        
//         {/* Footfall Information */}
//         <div className="flex justify-between items-center mb-2">
//           <div>
//             <span className="text-sm text-gray-500">Weekday: </span>
//             <span className="font-medium">{space.weekdayFootfall || 'N/A'}</span>
//           </div>
//           <div>
//             <span className="text-sm text-gray-500">Weekend: </span>
//             <span className="font-medium">{space.weekendFootfall || 'N/A'}</span>
//           </div>
//         </div>

//         {/* Price */}
//         <div className="mb-2">
//           <span className="text-sm text-gray-500">Price: </span>
//           <span className="font-medium text-blue-600">
//             ₹{space.price?.toLocaleString() || 'N/A'}
//           </span>
//         </div>

//         {/* Features */}
//         <div className="flex flex-wrap gap-1">
//           {space.hasCCTV === 'yes' && (
//             <span className="bg-gray-100 text-xs px-2 py-1 rounded">CCTV</span>
//           )}
//           {space.heatMapping === 'yes' && (
//             <span className="bg-gray-100 text-xs px-2 py-1 rounded">Heat Map</span>
//           )}
//           {space.brandingAreaSize && (
//             <span className="bg-gray-100 text-xs px-2 py-1 rounded">
//               {space.brandingAreaSize} branding
//             </span>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SpaceCard;
import { Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SpaceCard = ({ space }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/spaces/${space._id}`);
  };

  return (
    <div 
      className="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer h-full"
      onClick={handleClick}
    >
      {space.listingType === 'premium' && (
        <div className="absolute top-2 left-2 bg-yellow-400 text-black px-2 py-1 rounded-md flex items-center text-xs font-bold z-10">
          <Star size={12} className="mr-1 fill-black" />
          PREMIUM
        </div>
      )}

      <div className="h-48 overflow-hidden">
        <img 
          src={space.photos?.exteriorPhoto || '/placeholder-space.jpg'} 
          alt={space.businessName}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = '/placeholder-space.jpg';
          }}
        />
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">{space.businessName}</h3>
        <div className="flex items-center text-gray-600 mb-2">
          <span>{space.address}, {space.city}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-blue-600 font-medium">
            ₹{space.price?.toLocaleString() || 'N/A'}
          </span>
          <span className="text-sm text-gray-500 capitalize">
            {space.spaceType}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SpaceCard;