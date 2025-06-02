// // import { Star } from 'lucide-react';

// // const SpaceCard = ({ space, onClick }) => {
// //   return (
// //     <div 
// //       className="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer h-full"
// //       onClick={onClick}
// //     >
// //       {space.listingType === 'premium' && (
// //         <div className="absolute top-2 left-2 bg-yellow-400 text-black px-2 py-1 rounded-md flex items-center text-xs font-bold z-10">
// //           <Star size={12} className="mr-1 fill-black" />
// //           TOP CHOICE
// //         </div>
// //       )}

// //       <div className="h-48 overflow-hidden">
// //         <img 
// //           src={space.photos?.exteriorPhoto || '/placeholder-space.jpg'} 
// //           alt={space.businessName}
// //           className="w-full h-full object-cover"
// //         />
// //       </div>

// //       <div className="p-4">
// //         <h3 className="font-bold text-lg mb-1">{space.businessName}</h3>
// //         <div className="flex items-center text-gray-600 mb-2">
// //           <span>{space.address}, {space.city}</span>
// //         </div>
        
// //         <div className="flex justify-between items-center">
// //           <div>
// //             <span className="text-sm text-gray-500">Weekday: </span>
// //             <span className="font-medium">{space.weekdayFootfall}</span>
// //           </div>
// //           <div>
// //             <span className="text-sm text-gray-500">Weekend: </span>
// //             <span className="font-medium">{space.weekendFootfall}</span>
// //           </div>
// //         </div>

// //         <div className="mt-2 flex flex-wrap gap-1">
// //           {space.hasCCTV === 'yes' && (
// //             <span className="bg-gray-100 text-xs px-2 py-1 rounded">CCTV</span>
// //           )}
// //           {space.heatMapping === 'yes' && (
// //             <span className="bg-gray-100 text-xs px-2 py-1 rounded">Heat Map</span>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default SpaceCard;

// // import { Star } from 'lucide-react';
// // import { useNavigate } from 'react-router-dom';

// // const SpaceCard = ({ space }) => {
// //   const navigate = useNavigate();

// //   const handleClick = () => {
// //     navigate(`/spaces/${space._id}`);
// //   };

// //   return (
// //     <div 
// //       className="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer h-full"
// //       onClick={handleClick}
// //     >
// //       {/* Premium Badge */}
// //       {space.listingType === 'premium' && (
// //         <div className="absolute top-2 left-2 bg-yellow-400 text-black px-2 py-1 rounded-md flex items-center text-xs font-bold z-10">
// //           <Star size={12} className="mr-1 fill-black" />
// //           PREMIUM
// //         </div>
// //       )}

// //       {/* Space Image */}
// //       <div className="h-48 overflow-hidden">
// //         <img 
// //           src={space.photos?.exteriorPhoto || '/placeholder-space.jpg'} 
// //           alt={space.businessName}
// //           className="w-full h-full object-cover"
// //           onError={(e) => {
// //             e.target.src = '/placeholder-space.jpg';
// //           }}
// //         />
// //       </div>

// //       {/* Space Details */}
// //       <div className="p-4">
// //         <h3 className="font-bold text-lg mb-1">{space.businessName}</h3>
// //         <div className="flex items-center text-gray-600 mb-2">
// //           <span>{space.address}, {space.city}</span>
// //         </div>
        
// //         {/* Footfall Information */}
// //         <div className="flex justify-between items-center mb-2">
// //           <div>
// //             <span className="text-sm text-gray-500">Weekday: </span>
// //             <span className="font-medium">{space.weekdayFootfall || 'N/A'}</span>
// //           </div>
// //           <div>
// //             <span className="text-sm text-gray-500">Weekend: </span>
// //             <span className="font-medium">{space.weekendFootfall || 'N/A'}</span>
// //           </div>
// //         </div>

// //         {/* Price */}
// //         <div className="mb-2">
// //           <span className="text-sm text-gray-500">Price: </span>
// //           <span className="font-medium text-blue-600">
// //             ₹{space.price?.toLocaleString() || 'N/A'}
// //           </span>
// //         </div>

// //         {/* Features */}
// //         <div className="flex flex-wrap gap-1">
// //           {space.hasCCTV === 'yes' && (
// //             <span className="bg-gray-100 text-xs px-2 py-1 rounded">CCTV</span>
// //           )}
// //           {space.heatMapping === 'yes' && (
// //             <span className="bg-gray-100 text-xs px-2 py-1 rounded">Heat Map</span>
// //           )}
// //           {space.brandingAreaSize && (
// //             <span className="bg-gray-100 text-xs px-2 py-1 rounded">
// //               {space.brandingAreaSize} branding
// //             </span>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default SpaceCard;
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
//       {space.listingType === 'premium' && (
//         <div className="absolute top-2 left-2 bg-yellow-400 text-black px-2 py-1 rounded-md flex items-center text-xs font-bold z-10">
//           <Star size={12} className="mr-1 fill-black" />
//           PREMIUM
//         </div>
//       )}

//       <div className="h-48 overflow-hidden">
//         <img 
//           src={space.photos || '/placeholder-space.jpg'} 
//           alt={space.businessName}
//           className="w-full h-full object-cover"
//           onError={(e) => {
//             e.target.src = '/placeholder-space.jpg';
//           }}
//         />
//       </div>

//       <div className="p-4">
//         <h3 className="font-bold text-lg mb-1">{space.businessName}</h3>
//         <div className="flex items-center text-gray-600 mb-2">
//           <span>{space.address}, {space.city}</span>
//         </div>
        
//         <div className="flex justify-between items-center">
//           <span className="text-blue-600 font-medium">
//             ₹{space.price?.toLocaleString() || 'N/A'}
//           </span>
//           <span className="text-sm text-gray-500 capitalize">
//             {space.spaceType}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SpaceCard;

// // frontend/src/components/SpaceCard.jsx
// import { Star, MapPin } from 'lucide-react';
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
//       {space.listingType === 'premium' && (
//         <div className="absolute top-2 left-2 bg-yellow-400 text-black px-2 py-1 rounded-md flex items-center text-xs font-bold z-10">
//           <Star size={12} className="mr-1 fill-black" />
//           PREMIUM
//         </div>
//       )}

//       <div className="h-48 overflow-hidden">
//         <img 
//           src={space.photos && space.photos.length > 0 ? space.photos[0] : '/placeholder-space.jpg'} 
//           alt={space.name}
//           className="w-full h-full object-cover"
//           onError={(e) => {
//             e.target.src = '/placeholder-space.jpg';
//           }}
//         />
//       </div>

//       <div className="p-4">
//         <h3 className="font-bold text-lg mb-1">{space.name}</h3>
//         <div className="flex items-center text-gray-600 mb-2">
//           <MapPin size={16} className="mr-1" />
//           <span>{space.address}, {space.city}, {space.pincode}</span>
//         </div>
        
//         <div className="grid grid-cols-2 gap-2 mb-2 text-sm text-gray-600">
//           <div>
//             <span className="font-medium">Type:</span> {space.type}
//           </div>
//           <div>
//             <span className="font-medium">Price:</span> ₹{space.price?.toLocaleString() || 'N/A'}
//           </div>
//           {space.weekdayFootfall && (
//             <div>
//               <span className="font-medium">Weekday Footfall:</span> {space.weekdayFootfall}
//             </div>
//           )}
//           {space.weekendFootfall && (
//             <div>
//               <span className="font-medium">Weekend Footfall:</span> {space.weekendFootfall}
//             </div>
//           )}
//         </div>

//         <div className="flex flex-wrap gap-2 text-xs text-blue-800">
//           {space.hasCCTV === 'yes' && (
//             <span className="bg-blue-100 px-2 py-1 rounded-full">CCTV</span>
//           )}
//           {space.heatMapping === 'yes' && (
//             <span className="bg-blue-100 px-2 py-1 rounded-full">Heat Mapping</span>
//           )}
//           {space.brandingAreaSize && (
//             <span className="bg-blue-100 px-2 py-1 rounded-full">
//               {space.brandingAreaSize} Branding Area
//             </span>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SpaceCard;

//part 3 final 
import React from 'react';
import { MapPin } from 'lucide-react';

const SpaceCard = ({ space }) => {
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
        <p className="text-sm text-gray-600 mt-1">Age Group: {space.ageGroupMix}</p>
        <p className="text-sm text-gray-600 mt-1">Weekday Footfall: {space.weekdayFootfall}</p>
        <p className="text-sm text-gray-600 mt-1">Weekend Footfall: {space.weekendFootfall}</p>
      </div>
    </div>
  );
};

export default SpaceCard;