// import { Link } from 'react-router-dom';
// import Footer from '../components/Footer';
// import { Button } from '../components/ui/Button';
// import { Search, MapPin, Users, Clock } from 'lucide-react';
// import Navbar from '../components/Navbar';

// const BrowseSpaces = () => {
//   return (
//     <>
//     <Navbar/>
//     <div className="min-h-screen flex flex-col">
//       <main className="flex-grow">
//         {/* Header Section */}
//         <section className="text-black bg-gradient-to-r from-white to-[#D9D9F3] py-16">
//           <div className="container mx-auto px-4 text-center">
//             <h1 className="text-4xl font-bold mb-4 text-black">Find Your Perfect Advertising Space</h1>
//             <p className="text-xl text-gray-700 max-w-2xl mx-auto">
//               Browse through verified spaces across India and connect with space owners directly.
//             </p>
//           </div>
//         </section>

//         {/* Search & Filter Section */}
//         <section className="py-8 bg-white border-b text-black">
//           <div className="container mx-auto px-4">
//             <div className="flex flex-col md:flex-row gap-4">
//               <div className="relative flex-grow">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Search className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   type="text"
//                   className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4261FF] focus:border-[#4261FF] transition duration-150 ease-in-out sm:text-sm"
//                   placeholder="Search by location, type, or keywords..."
//                 />
//               </div>
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
//                 <select className="p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#4261FF] focus:border-[#4261FF]">
//                   <option value="">City / Area</option>
//                   <option value="delhi">Delhi NCR</option>
//                   <option value="mumbai">Mumbai</option>
//                   <option value="bangalore">Bangalore</option>
//                   <option value="pune">Pune</option>
//                   <option value="chennai">Chennai</option>
//                 </select>
//                 <select className="p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#4261FF] focus:border-[#4261FF]">
//                   <option value="">Space Type</option>
//                   <option value="retail">Retail</option>
//                   <option value="restaurant">Restaurant/Café</option>
//                   <option value="society">Residential Society</option>
//                   <option value="office">Office Space</option>
//                   <option value="clinic">Clinic/Hospital</option>
//                 </select>
//                 <select className="p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#4261FF] focus:border-[#4261FF]">
//                   <option value="">Footfall Range</option>
//                   <option value="low">50-100 daily</option>
//                   <option value="medium">100-500 daily</option>
//                   <option value="high">500-1000 daily</option>
//                   <option value="very-high">1000+ daily</option>
//                 </select>
//                 <select className="p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#4261FF] focus:border-[#4261FF]">
//                   <option value="">Price Range</option>
//                   <option value="low">₹1K-5K / month</option>
//                   <option value="medium">₹5K-10K / month</option>
//                   <option value="high">₹10K-25K / month</option>
//                   <option value="premium">₹25K+ / month</option>
//                 </select>
//               </div>
//               <Button className="bg-[#4261FF] hover:bg-[#6D4EFF]">Filter</Button>
//             </div>
//           </div>
//         </section>

//         {/* Browse Spaces */}
//         <section className="py-12 bg-gray-50">
//           <div className="container mx-auto px-4">
//             <div className="flex justify-between items-center mb-8">
//               <h2 className="text-2xl font-bold text-black">Available Spaces (26)</h2>
//               <div className="flex items-center space-x-2">
//                 <span className="text-sm text-gray-500">Sort by:</span>
//                 <select className="p-1.5 text-sm border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#4261FF]">
//                   <option value="recommended">Recommended</option>
//                   <option value="price-low">Price: Low to High</option>
//                   <option value="price-high">Price: High to Low</option>
//                   <option value="footfall">Highest Footfall</option>
//                   <option value="newest">Newest Listings</option>
//                 </select>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {spaces.map((space, index) => (
//                 <SpaceCard key={index} space={space} />
//               ))}
//             </div>

//             {/* Pagination */}
//             <div className="mt-10 flex justify-center">
//               <nav className="inline-flex rounded-md shadow">
//                 <Link to="#" className="py-2 px-4 border border-gray-300 bg-white rounded-l-md hover:bg-gray-50">
//                   Previous
//                 </Link>
//                 <Link to="#" className="py-2 px-4 border-t border-b border-gray-300 bg-white hover:bg-gray-50">
//                   1
//                 </Link>
//                 <Link to="#" className="py-2 px-4 border-t border-b border-gray-300 bg-[#4261FF] text-white">
//                   2
//                 </Link>
//                 <Link to="#" className="py-2 px-4 border-t border-b border-gray-300 bg-white hover:bg-gray-50">
//                   3
//                 </Link>
//                 <Link to="#" className="py-2 px-4 border border-gray-300 bg-white rounded-r-md hover:bg-gray-50">
//                   Next
//                 </Link>
//               </nav>
//             </div>
//           </div>
//         </section>

//         {/* Post a Custom Requirement */}
//         <section className="py-16 bg-white text-black placeholder:text-black">
//           <div className="container mx-auto px-4">
//             <div className="max-w-4xl mx-auto bg-[#D9D9F3]/30 rounded-lg p-8">
//               <h2 className="text-3xl font-bold mb-6 text-center">Don't find what you need?</h2>
//               <p className="text-lg text-center mb-8">
//                 Post a custom requirement and let space owners come to you.
//               </p>
//               <div className="bg-white rounded-lg shadow-sm p-6">
//                 <div className="space-y-4">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
//                       <input
//                         type="text"
//                         className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                         placeholder="Full name"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
//                       <input
//                         type="text"
//                         className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                         placeholder="Your company"
//                       />
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
//                       <input
//                         type="email"
//                         className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                         placeholder="email@example.com"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
//                       <input
//                         type="tel"
//                         className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                         placeholder="+91 98765 43210"
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Location Requirements</label>
//                     <input
//                       type="text"
//                       className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                       placeholder="e.g., South Delhi, Mumbai Suburbs, etc."
//                     />
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Space Type Needed</label>
//                       <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none">
//                         <option value="">Select space type</option>
//                         <option value="retail">Retail Store</option>
//                         <option value="restaurant">Restaurant/Café</option>
//                         <option value="society">Residential Society</option>
//                         <option value="office">Office Space</option>
//                         <option value="clinic">Clinic/Hospital</option>
//                         <option value="any">Any Type</option>
//                       </select>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Budget Range (Monthly)</label>
//                       <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none">
//                         <option value="">Select budget</option>
//                         <option value="low">₹1K-5K</option>
//                         <option value="medium">₹5K-10K</option>
//                         <option value="high">₹10K-25K</option>
//                         <option value="premium">₹25K+</option>
//                         <option value="flexible">Flexible</option>
//                       </select>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Duration</label>
//                       <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none">
//                         <option value="">Select duration</option>
//                         <option value="short">1-3 months</option>
//                         <option value="medium">3-6 months</option>
//                         <option value="long">6-12 months</option>
//                         <option value="ongoing">Ongoing</option>
//                       </select>
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Additional Requirements</label>
//                     <textarea
//                       className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                       rows={4}
//                       placeholder="Describe your specific needs, target audience, branding requirements, etc."
//                     ></textarea>
//                   </div>

//                   <Button className="w-full bg-[#4261FF] hover:bg-[#6D4EFF]">
//                     Submit Requirement
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>

//       <Footer />
//     </div>
//     </>
//   );
// };

// const SpaceCard = ({ space }) => {
//   return (
//     <div
//       className={`bg-white rounded-lg shadow-sm overflow-hidden border ${
//         space.premium ? 'border-[#4261FF]' : 'border-transparent'
//       } transition-transform hover:shadow-md hover:-translate-y-1`}
//     >
//       {space.premium && (
//         <div className="bg-[#4261FF] text-white text-xs font-bold py-1 px-3 text-center">
//           PREMIUM LISTING
//         </div>
//       )}

//       <div className="relative h-48 bg-gray-200">
//         <div className="absolute inset-0 flex items-center justify-center">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-16 w-16 text-gray-400"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
//             />
//           </svg>
//         </div>
//       </div>

//       <div className="p-5 text-black">
//         <div className="flex justify-between items-start mb-2">
//           <h3 className="font-semibold text-lg">{space.name}</h3>
//           <span className="bg-[#D9D9F3] text-[#4261FF] text-xs px-2 py-1 rounded">
//             {space.type}
//           </span>
//         </div>

//         <div className="space-y-2 mb-4">
//           <div className="flex items-start">
//             <MapPin className="h-4 w-4 text-gray-500 mr-1 mt-0.5" />
//             <span className="text-sm text-gray-700">{space.location}</span>
//           </div>
//           <div className="flex items-start">
//             <Users className="h-4 w-4 text-gray-500 mr-1 mt-0.5" />
//             <span className="text-sm text-gray-700">Footfall: {space.footfall}</span>
//           </div>
//           <div className="flex items-start">
//             <Clock className="h-4 w-4 text-gray-500 mr-1 mt-0.5" />
//             <span className="text-sm text-gray-700">Available: Immediate</span>
//           </div>
//         </div>

//         <div className="flex justify-between items-center">
//           <span className="font-medium text-[#4261FF]">{space.price}</span>
//           <Button variant="outline" className="bg-white">
//             Contact Owner
//           </Button>
//         </div>
//       </div>
//     </div>
    
//   );
// };

// const spaces = [
//   {
//     id: 1,
//     name: "Coffee Corner Café",
//     type: "Restaurant",
//     location: "Connaught Place, Delhi",
//     footfall: "150-200 daily",
//     price: "₹8K-12K/month",
//     imageUrl: "",
//     premium: true
//   },
//   {
//     id: 2,
//     name: "Green Valley Society",
//     type: "Residential",
//     location: "Powai, Mumbai",
//     footfall: "500+ daily",
//     price: "₹15K-20K/month",
//     imageUrl: ""
//   },
//   {
//     id: 3,
//     name: "City Supermarket",
//     type: "Retail",
//     location: "Indiranagar, Bangalore",
//     footfall: "300-400 daily",
//     price: "₹12K-18K/month",
//     imageUrl: ""
//   },
//   {
//     id: 4,
//     name: "HealthFirst Clinic",
//     type: "Healthcare",
//     location: "Sector 15, Gurgaon",
//     footfall: "80-100 daily",
//     price: "₹6K-10K/month",
//     imageUrl: "",
//     premium: true
//   },
//   {
//     id: 5,
//     name: "TechHub Co-working",
//     type: "Office",
//     location: "Koramangala, Bangalore",
//     footfall: "200-250 daily",
//     price: "₹18K-25K/month",
//     imageUrl: ""
//   },
//   {
//     id: 6,
//     name: "FitZone Gym",
//     type: "Fitness",
//     location: "Bandra, Mumbai",
//     footfall: "120-150 daily",
//     price: "₹10K-15K/month",
//     imageUrl: ""
//   }
// ];

// export default BrowseSpaces;




//part 2
// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import Footer from '../components/Footer';
// import { Button } from '../components/ui/Button';
// import { Search, MapPin, Users, Clock } from 'lucide-react';
// import Navbar from '../components/Navbar';

// const BrowseSpaces = () => {
//   const [spaces, setSpaces] = useState([]);

//   useEffect(() => {
//     // Fetch spaces from API using Axios
//     axios
//       .get('/api/spaces') // Placeholder API endpoint
//       .then((response) => {
//         setSpaces(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching spaces:', error);
//         // Fallback to static data if API fails
//         setSpaces(fallbackSpaces);
//       });
//   }, []);

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen flex flex-col">
//         <main className="flex-grow">
//           {/* Header Section */}
//           <section className="text-black bg-gradient-to-r from-white to-[#D9D9F3] py-16">
//             <div className="container mx-auto px-4 text-center">
//               <h1 className="text-4xl font-bold mb-4 text-black">Find Your Perfect Advertising Space</h1>
//               <p className="text-xl text-gray-700 max-w-2xl mx-auto">
//                 Browse through verified spaces across India and connect with space owners directly.
//               </p>
//             </div>
//           </section>

//           {/* Search & Filter Section */}
//           <section className="py-8 bg-white border-b text-black">
//             <div className="container mx-auto px-4">
//               <div className="flex flex-col md:flex-row gap-4">
//                 <div className="relative flex-grow">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Search className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     type="text"
//                     className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4261FF] focus:border-[#4261FF] transition duration-150 ease-in-out sm:text-sm"
//                     placeholder="Search by location, type, or keywords..."
//                   />
//                 </div>
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
//                   <select className="p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#4261FF] focus:border-[#4261FF]">
//                     <option value="">City / Area</option>
//                     <option value="delhi">Delhi NCR</option>
//                     <option value="mumbai">Mumbai</option>
//                     <option value="bangalore">Bangalore</option>
//                     <option value="pune">Pune</option>
//                     <option value="chennai">Chennai</option>
//                   </select>
//                   <select className="p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#4261FF] focus:border-[#4261FF]">
//                     <option value="">Space Type</option>
//                     <option value="retail">Retail</option>
//                     <option value="restaurant">Restaurant/Café</option>
//                     <option value="society">Residential Society</option>
//                     <option value="office">Office Space</option>
//                     <option value="clinic">Clinic/Hospital</option>
//                   </select>
//                   <select className="p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#4261FF] focus:border-[#4261FF]">
//                     <option value="">Footfall Range</option>
//                     <option value="low">50-100 daily</option>
//                     <option value="medium">100-500 daily</option>
//                     <option value="high">500-1000 daily</option>
//                     <option value="very-high">1000+ daily</option>
//                   </select>
//                   <select className="p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#4261FF] focus:border-[#4261FF]">
//                     <option value="">Price Range</option>
//                     <option value="low">₹1K-5K / month</option>
//                     <option value="medium">₹5K-10K / month</option>
//                     <option value="high">₹10K-25K / month</option>
//                     <option value="premium">₹25K+ / month</option>
//                   </select>
//                 </div>
//                 <Button className="bg-[#4261FF] hover:bg-[#6D4EFF]">Filter</Button>
//               </div>
//             </div>
//           </section>

//           {/* Browse Spaces */}
//           <section className="py-12 bg-gray-50">
//             <div className="container mx-auto px-4">
//               <div className="flex justify-between items-center mb-8">
//                 <h2 className="text-2xl font-bold text-black">Available Spaces ({spaces.length})</h2>
//                 <div className="flex items-center space-x-2">
//                   <span className="text-sm text-gray-500">Sort by:</span>
//                   <select className="p-1.5 text-sm border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#4261FF]">
//                     <option value="recommended">Recommended</option>
//                     <option value="price-low">Price: Low to High</option>
//                     <option value="price-high">Price: High to Low</option>
//                     <option value="footfall">Highest Footfall</option>
//                     <option value="newest">Newest Listings</option>
//                   </select>
//                 </div>
//               </div>

//                {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {spaces.map((space) => (
//                   <SpaceCard key={space.id} space={space} />
//                 ))}
//               </div> */} 

//               {/* Pagination */}
//               <div className="mt-10 flex justify-center">
//                 <nav className="inline-flex rounded-md shadow">
//                   <Link to="#" className="py-2 px-4 border border-gray-300 bg-white rounded-l-md hover:bg-gray-50">
//                     Previous
//                   </Link>
//                   <Link to="#" className="py-2 px-4 border-t border-b border-gray-300 bg-white hover:bg-gray-50">
//                     1
//                   </Link>
//                   <Link to="#" className="py-2 px-4 border-t border-b border-gray-300 bg-[#4261FF] text-white">
//                     2
//                   </Link>
//                   <Link to="#" className="py-2 px-4 border-t border-b border-gray-300 bg-white hover:bg-gray-50">
//                     3
//                   </Link>
//                   <Link to="#" className="py-2 px-4 border border-gray-300 bg-white rounded-r-md hover:bg-gray-50">
//                     Next
//                   </Link>
//                 </nav>
//               </div>
//             </div>
//           </section>

//           {/* Post a Custom Requirement */}
//           <section className="py-16 bg-white text-black placeholder:text-black">
//             <div className="container mx-auto px-4">
//               <div className="max-w-4xl mx-auto bg-[#D9D9F3]/30 rounded-lg p-8">
//                 <h2 className="text-3xl font-bold mb-6 text-center">Don't find what you need?</h2>
//                 <p className="text-lg text-center mb-8">
//                   Post a custom requirement and let space owners come to you.
//                 </p>
//                 <div className="bg-white rounded-lg shadow-sm p-6">
//                   <div className="space-y-4">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
//                         <input
//                           type="text"
//                           className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                           placeholder="Full name"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
//                         <input
//                           type="text"
//                           className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                           placeholder="Your company"
//                         />
//                       </div>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
//                         <input
//                           type="email"
//                           className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                           placeholder="email@example.com"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
//                         <input
//                           type="tel"
//                           className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                           placeholder="+91 98765 43210"
//                         />
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Location Requirements</label>
//                       <input
//                         type="text"
//                         className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                         placeholder="e.g., South Delhi, Mumbai Suburbs, etc."
//                       />
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Space Type Needed</label>
//                         <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none">
//                           <option value="">Select space type</option>
//                           <option value="retail">Retail Store</option>
//                           <option value="restaurant">Restaurant/Café</option>
//                           <option value="society">Residential Society</option>
//                           <option value="office">Office Space</option>
//                           <option value="clinic">Clinic/Hospital</option>
//                           <option value="any">Any Type</option>
//                         </select>
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Budget Range (Monthly)</label>
//                         <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none">
//                           <option value="">Select budget</option>
//                           <option value="low">₹1K-5K</option>
//                           <option value="medium">₹5K-10K</option>
//                           <option value="high">₹10K-25K</option>
//                           <option value="premium">₹25K+</option>
//                           <option value="flexible">Flexible</option>
//                         </select>
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Duration</label>
//                         <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none">
//                           <option value="">Select duration</option>
//                           <option value="short">1-3 months</option>
//                           <option value="medium">3-6 months</option>
//                           <option value="long">6-12 months</option>
//                           <option value="ongoing">Ongoing</option>
//                         </select>
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Additional Requirements</label>
//                       <textarea
//                         className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
//                         rows={4}
//                         placeholder="Describe your specific needs, target audience, branding requirements, etc."
//                       ></textarea>
//                     </div>

//                     <Button className="w-full bg-[#4261FF] hover:bg-[#6D4EFF]">
//                       Submit Requirement
//                     </Button>
//                   </div>
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

// const SpaceCard = ({ space }) => {
//   return (
//     <div
//       className={`bg-white rounded-lg shadow-sm overflow-hidden border ${
//         space.premium ? 'border-[#4261FF]' : 'border-transparent'
//       } transition-transform hover:shadow-md hover:-translate-y-1`}
//     >
//       {space.premium && (
//         <div className="bg-[#4261FF] text-white text-xs font-bold py-1 px-3 text-center">
//           PREMIUM LISTING
//         </div>
//       )}

//       <div className="grid grid-cols-3 h-48">
//         <img
//           src="https://picsum.photos/200/150?random=1"
//           alt={`${space.name} interior`}
//           className="w-full h-full object-cover"
//         />
//         <img
//           src="https://picsum.photos/200/150?random=2"
//           alt={`${space.name} exterior`}
//           className="w-full h-full object-cover"
//         />
//         <img
//           src="https://picsum.photos/200/150?random=3"
//           alt={`${space.name} branding zone`}
//           className="w-full h-full object-cover"
//         />
//       </div>

//       <div className="p-5 text-black">
//         <div className="flex justify-between items-start mb-2">
//           <h3 className="font-semibold text-lg">{space.name}</h3>
//           <span className="bg-[#D9D9F3] text-[#4261FF] text-xs px-2 py-1 rounded">
//             {space.type}
//           </span>
//         </div>

//         <div className="space-y-2 mb-4">
//           <div className="flex items-start">
//             <MapPin className="h-4 w-4 text-gray-500 mr-1 mt-0.5" />
//             <span className="text-sm text-gray-700">{space.location}</span>
//           </div>
//           <div className="flex items-start">
//             <Users className="h-4 w-4 text-gray-500 mr-1 mt-0.5" />
//             <span className="text-sm text-gray-700">Footfall: {space.footfall}</span>
//           </div>
//           <div className="flex items-start">
//             <Clock className="h-4 w-4 text-gray-500 mr-1 mt-0.5" />
//             <span className="text-sm text-gray-700">Available: Immediate</span>
//           </div>
//         </div>

//         <div className="flex justify-between items-center">
//           <span className="font-medium text-[#4261FF]">{space.price}</span>
//           <Button variant="outline" className="bg-white">
//             Contact Owner
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Commented-out SpaceCard for Backend API Image Integration
// /*
// const SpaceCard = ({ space }) => {
//   return (
//     <div
//       className={`bg-white rounded-lg shadow-sm overflow-hidden border ${
//         space.premium ? 'border-[#4261FF]' : 'border-transparent'
//       } transition-transform hover:shadow-md hover:-translate-y-1`}
//     >
//       {space.premium && (
//         <div className="bg-[#4261FF] text-white text-xs font-bold py-1 px-3 text-center">
//           PREMIUM LISTING
//         </div>
//       )}

//       <div className="grid grid-cols-3 h-48">
//         {space.images?.interior ? (
//           <img
//             src={space.images.interior}
//             alt={`${space.name} interior`}
//             className="w-full h-full object-cover"
//           />
//         ) : (
//           <div className="w-full h-full bg-gray-200 flex items-center justify-center">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-16 w-16 text-gray-400"
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
//         )}
//         {space.images?.exterior ? (
//           <img
//             src={space.images.exterior}
//             alt={`${space.name} exterior`}
//             className="w-full h-full object-cover"
//           />
//         ) : (
//           <div className="w-full h-full bg-gray-200 flex items-center justify-center">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-16 w-16 text-gray-400"
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
//         )}
//         {space.images?.brandingZone ? (
//           <img
//             src={space.images.brandingZone}
//             alt={`${space.name} branding zone`}
//             className="w-full h-full object-cover"
//           />
//         ) : (
//           <div className="w-full h-full bg-gray-200 flex items-center justify-center">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-16 w-16 text-gray-400"
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
//         )}
//       </div>

//       <div className="p-5 text-black">
//         <div className="flex justify-between items-start mb-2">
//           <h3 className="font-semibold text-lg">{space.name}</h3>
//           <span className="bg-[#D9D9F3] text-[#4261FF] text-xs px-2 py-1 rounded">
//             {space.type}
//           </span>
//         </div>

//         <div className="space-y-2 mb-4">
//           <div className="flex items-start">
//             <MapPin className="h-4 w-4 text-gray-500 mr-1 mt-0.5" />
//             <span className="text-sm text-gray-700">{space.location}</span>
//           </div>
//           <div className="flex items-start">
//             <Users className="h-4 w-4 text-gray-500 mr-1 mt-0.5" />
//             <span className="text-sm text-gray-700">Footfall: {space.footfall}</span>
//           </div>
//           <div className="flex items-start">
//             <Clock className="h-4 w-4 text-gray-500 mr-1 mt-0.5" />
//             <span className="text-sm text-gray-700">Available: {space.availability || 'Immediate'}</span>
//           </div>
//         </div>

//         <div className="flex justify-between items-center">
//           <span className="font-medium text-[#4261FF]">{space.price}</span>
//           <Button variant="outline" className="bg-white">
//             Contact Owner
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };
// */

// const fallbackSpaces = [
//   {
//     id: 1,
//     name: "Coffee Corner Café",
//     type: "Restaurant",
//     location: "Connaught Place, Delhi",
//     footfall: "150-200 daily",
//     price: "₹8K-12K/month",
//     premium: true
//   },
//   {
//     id: 2,
//     name: "Green Valley Society",
//     type: "Residential",
//     location: "Powai, Mumbai",
//     footfall: "500+ daily",
//     price: "₹15K-20K/month"
//   },
//   {
//     id: 3,
//     name: "City Supermarket",
//     type: "Retail",
//     location: "Indiranagar, Bangalore",
//     footfall: "300-400 daily",
//     price: "₹12K-18K/month"
//   },
//   {
//     id: 4,
//     name: "HealthFirst Clinic",
//     type: "Healthcare",
//     location: "Sector 15, Gurgaon",
//     footfall: "80-100 daily",
//     price: "₹6K-10K/month",
//     premium: true
//   },
//   {
//     id: 5,
//     name: "TechHub Co-working",
//     type: "Office",
//     location: "Koramangala, Bangalore",
//     footfall: "200-250 daily",
//     price: "₹18K-25K/month"
//   },
//   {
//     id: 6,
//     name: "FitZone Gym",
//     type: "Fitness",
//     location: "Bandra, Mumbai",
//     footfall: "120-150 daily",
//     price: "₹10K-15K/month"
//   }
// ];

// export default BrowseSpaces;



//part 3
// import { useEffect, useState, useCallback, useMemo } from 'react';
// import { useSelector, useDispatch, shallowEqual } from 'react-redux';
// import { setFilter, resetFilters } from '../redux/filterSlice';
// import { Button } from '../components/ui/Button';
// import { Search, MapPin, Users, Clock, Star } from 'lucide-react';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// import SpaceCard from '../components/SpaceCard';
// import { debounce } from 'lodash';

// const BrowseSpaces = () => {
//   const [spaces, setSpaces] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const dispatch = useDispatch();

//   // Memoized selector with shallowEqual to prevent unnecessary re-renders
//   const filters = useSelector((state) => state.filters, shallowEqual);

//   // Memoized safeFilters with default values
//   const safeFilters = useMemo(() => ({
//     searchQuery: '',
//     city: '',
//     spaceType: '',
//     footfallRange: '',
//     priceRange: '',
//     weekdayFootfall: '',
//     weekendFootfall: '',
//     ageGroup: '',
//     ...filters
//   }), [filters]);

//   // Debounced search function
//   const debouncedSearch = useCallback(
//     debounce((searchValue) => {
//       dispatch(setFilter({ searchQuery: searchValue }));
//     }, 500),
//     [dispatch]
//   );

//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     dispatch(setFilter({ searchQuery: value }));
//     debouncedSearch(value);
//   };

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     dispatch(setFilter({ [name]: value }));
//   };

//   useEffect(() => {
//     const fetchSpaces = async () => {
//       try {
//         setLoading(true);
//         setError(null);
        
//         // Construct query params from filters with null checks
//         const params = new URLSearchParams();
//         Object.entries(safeFilters).forEach(([key, value]) => {
//           if (value) params.append(key, value);
//         });

//         const res = await fetch(`http://localhost:5000/api/spaces/getallspaces?${params.toString()}`);
//         if (!res.ok) throw new Error('Failed to fetch spaces');
//         const data = await res.json();
//         setSpaces(data || []);
//       } catch (err) {
//         console.error('Error fetching spaces:', err);
//         setError(err.message);
//         setSpaces([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     const timer = setTimeout(fetchSpaces, 300);
//     return () => clearTimeout(timer);
//   }, [safeFilters]);

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       <Navbar />
      
//       <main className="flex-grow">
//         {/* Filter Section */}
//         <section className="py-8 bg-white border-b text-black">
//           <div className="container mx-auto px-4">
//             <div className="flex flex-col md:flex-row gap-4">
//               {/* Search Input */}
//               <div className="relative flex-grow">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Search className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   type="text"
//                   name="searchQuery"
//                   className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4261FF] focus:border-[#4261FF] transition duration-150 ease-in-out sm:text-sm"
//                   placeholder="Search by location, type, or keywords..."
//                   value={safeFilters.searchQuery}
//                   onChange={handleSearchChange}
//                 />
//               </div>
              
//               {/* Filter Dropdowns */}
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
//                 {/* City/Area */}
//                 <select
//                   name="city"
//                   className="p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#4261FF] focus:border-[#4261FF]"
//                   value={safeFilters.city}
//                   onChange={handleFilterChange}
//                 >
//                   <option value="">City / Area</option>
//                   <option value="delhi">Delhi NCR</option>
//                   <option value="mumbai">Mumbai</option>
//                   <option value="bangalore">Bangalore</option>
//                   <option value="pune">Pune</option>
//                   <option value="chennai">Chennai</option>
//                 </select>

//                 {/* Space Type */}
//                 <select
//                   name="spaceType"
//                   className="p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#4261FF] focus:border-[#4261FF]"
//                   value={safeFilters.spaceType}
//                   onChange={handleFilterChange}
//                 >
//                   <option value="">Space Type</option>
//                   <option value="retail">Retail</option>
//                   <option value="restaurant">Restaurant/Café</option>
//                   <option value="society">Residential Society</option>
//                   <option value="office">Office Space</option>
//                   <option value="clinic">Clinic/Hospital</option>
//                   <option value="salon">Salon</option>
//                 </select>

//                 {/* Price Range */}
//                 <select
//                   name="priceRange"
//                   className="p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#4261FF] focus:border-[#4261FF]"
//                   value={safeFilters.priceRange}
//                   onChange={handleFilterChange}
//                 >
//                   <option value="">Price Range</option>
//                   <option value="low">₹1K-5K / month</option>
//                   <option value="medium">₹5K-10K / month</option>
//                   <option value="high">₹10K-25K / month</option>
//                   <option value="premium">₹25K+ / month</option>
//                 </select>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex gap-2">
//                 <Button 
//                   className="bg-[#4261FF] hover:bg-[#6D4EFF]"
//                 >
//                   Apply Filters
//                 </Button>
//                 <Button 
//                   variant="outline"
//                   onClick={() => dispatch(resetFilters())}
//                 >
//                   Reset
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Spaces Listing */}
//         <section className="py-12 bg-gray-50">
//           <div className="container mx-auto px-4">
//             <div className="flex justify-between items-center mb-8">
//               <h2 className="text-2xl font-bold text-black">
//                 Available Spaces ({spaces.length})
//               </h2>
//             </div>

//             {error ? (
//               <div className="text-center py-12">
//                 <div className="text-red-500 mb-4">Error: {error}</div>
//                 <Button 
//                   variant="outline"
//                   onClick={() => window.location.reload()}
//                 >
//                   Retry
//                 </Button>
//               </div>
//             ) : loading ? (
//               <div className="flex justify-center items-center h-64">
//                 <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//               </div>
//             ) : spaces.length === 0 ? (
//               <div className="text-center py-12">
//                 <Search className="mx-auto h-12 w-12 text-gray-400" />
//                 <h3 className="mt-2 text-lg font-medium text-gray-900">No spaces found</h3>
//                 <p className="mt-1 text-gray-500">
//                   {Object.values(safeFilters).some(Boolean) 
//                     ? "Try adjusting your filters"
//                     : "No spaces available at the moment"}
//                 </p>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {spaces.map((space) => (
//                   <SpaceCard 
//                     key={space._id} 
//                     space={{
//                       ...space,
//                       photos: space.photos || {}, // Ensure photos exists
//                       location: space.location || {} // Ensure location exists
//                     }} 
//                   />
//                 ))}
//               </div>
//             )}
//           </div>
//         </section>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default BrowseSpaces;
// import { useEffect, useState, useCallback, useMemo } from 'react';
// import { useSelector, useDispatch, shallowEqual } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { setFilter, resetFilters } from '../redux/filterSlice';
// import { Button } from '../components/ui/Button';
// import { Search, MapPin, Star } from 'lucide-react';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// import SpaceCard from '../components/SpaceCard';
// import { debounce } from 'lodash';

// const BrowseSpaces = () => {
//   const [spaces, setSpaces] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Memoized selector with shallowEqual
//   const filters = useSelector((state) => state.filters, shallowEqual);

//   // Memoized safeFilters with default values
//   const safeFilters = useMemo(() => ({
//     searchQuery: '',
//     city: '',
//     spaceType: '',
//     priceRange: '',
//     ...filters
//   }), [filters]);

//   // Debounced search function
//   const debouncedSearch = useCallback(
//     debounce((searchValue) => {
//       dispatch(setFilter({ searchQuery: searchValue }));
//     }, 500),
//     [dispatch]
//   );

//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     dispatch(setFilter({ searchQuery: value }));
//     debouncedSearch(value);
//   };

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     dispatch(setFilter({ [name]: value }));
//   };

//   const handleSpaceClick = (spaceId) => {
//     navigate(`/spaces/${spaceId}`);
//   };

//   useEffect(() => {
//     const fetchSpaces = async () => {
//       try {
//         setLoading(true);
//         setError(null);
        
//         const params = new URLSearchParams();
//         Object.entries(safeFilters).forEach(([key, value]) => {
//           if (value) params.append(key, value);
//         });

//         const res = await fetch(`http://localhost:5000/api/spaces/getallspaces?${params.toString()}`);
//         if (!res.ok) throw new Error('Failed to fetch spaces');
//         const data = await res.json();
//         console.log(data)
//         setSpaces(data || []);
//       } catch (err) {
//         console.error('Error fetching spaces:', err);
//         setError(err.message);
//         setSpaces([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     const timer = setTimeout(fetchSpaces, 300);
//     return () => clearTimeout(timer);
//   }, [safeFilters]);

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       <Navbar />
      
//       <main className="flex-grow">
//         {/* Filter Section */}
//         <section className="py-8 bg-white border-b text-black">
//           <div className="container mx-auto px-4">
//             <div className="flex flex-col md:flex-row gap-4">
//               {/* Search Input */}
//               <div className="relative flex-grow">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Search className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   type="text"
//                   name="searchQuery"
//                   className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4261FF] focus:border-[#4261FF] transition duration-150 ease-in-out sm:text-sm"
//                   placeholder="Search by location, type, or keywords..."
//                   value={safeFilters.searchQuery}
//                   onChange={handleSearchChange}
//                 />
//               </div>
              
//               {/* Filter Dropdowns */}
//               <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
//                 {/* City/Area */}
//                 <select
//                   name="city"
//                   className="p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#4261FF] focus:border-[#4261FF]"
//                   value={safeFilters.city}
//                   onChange={handleFilterChange}
//                 >
//                   <option value="">City / Area</option>
//                   <option value="delhi">Delhi NCR</option>
//                   <option value="mumbai">Mumbai</option>
//                   <option value="bangalore">Bangalore</option>
//                   <option value="pune">Pune</option>
//                   <option value="chennai">Chennai</option>
//                 </select>

//                 {/* Space Type */}
//                 <select
//                   name="spaceType"
//                   className="p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#4261FF] focus:border-[#4261FF]"
//                   value={safeFilters.spaceType}
//                   onChange={handleFilterChange}
//                 >
//                   <option value="">Space Type</option>
//                   <option value="retail">Retail</option>
//                   <option value="restaurant">Restaurant/Café</option>
//                   <option value="society">Residential Society</option>
//                   <option value="office">Office Space</option>
//                   <option value="clinic">Clinic/Hospital</option>
//                   <option value="salon">Salon</option>
//                 </select>

//                 {/* Price Range */}
//                 <select
//                   name="priceRange"
//                   className="p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#4261FF] focus:border-[#4261FF]"
//                   value={safeFilters.priceRange}
//                   onChange={handleFilterChange}
//                 >
//                   <option value="">Price Range</option>
//                   <option value="low">₹1K-5K / month</option>
//                   <option value="medium">₹5K-10K / month</option>
//                   <option value="high">₹10K-25K / month</option>
//                   <option value="premium">₹25K+ / month</option>
//                 </select>
//               </div>

//               <div className="flex gap-2">
//                 <Button 
//                   className="bg-[#4261FF] hover:bg-[#6D4EFF]"
//                 >
//                   Apply Filters
//                 </Button>
//                 <Button 
//                   variant="outline"
//                   onClick={() => dispatch(resetFilters())}
//                 >
//                   Reset
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Spaces Listing */}
//         <section className="py-12 bg-gray-50">
//           <div className="container mx-auto px-4">
//             <div className="flex justify-between items-center mb-8">
//               <h2 className="text-2xl font-bold text-black">
//                 Available Spaces ({spaces.length})
//               </h2>
//             </div>

//             {error ? (
//               <div className="text-center py-12">
//                 <div className="text-red-500 mb-4">Error: {error}</div>
//                 <Button 
//                   variant="outline"
//                   onClick={() => window.location.reload()}
//                 >
//                   Retry
//                 </Button>
//               </div>
//             ) : loading ? (
//               <div className="flex justify-center items-center h-64">
//                 <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//               </div>
//             ) : spaces.length === 0 ? (
//               <div className="text-center py-12">
//                 <Search className="mx-auto h-12 w-12 text-gray-400" />
//                 <h3 className="mt-2 text-lg font-medium text-gray-900">No spaces found</h3>
//                 <p className="mt-1 text-gray-500">
//                   {Object.values(safeFilters).some(Boolean) 
//                     ? "Try adjusting your filters"
//                     : "No spaces available at the moment"}
//                 </p>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {spaces.map((space) => (
//                   <div 
//                     key={space._id} 
//                     onClick={() => handleSpaceClick(space._id)}
//                     className="cursor-pointer"
//                   >
//                     <SpaceCard 
//                       space={{
//                         ...space,
//                         photos: space.photos || {},
//                         location: space.location || {}
//                       }} 
//                     />
//                     {space.listingType === 'premium' && (
//                       <div className="absolute top-2 left-2 bg-yellow-400 text-black px-2 py-1 rounded-md flex items-center text-xs font-bold z-10">
//                         <Star size={12} className="mr-1 fill-black" />
//                         PREMIUM
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </section>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default BrowseSpaces;



import { useEffect, useState, useCallback, useMemo } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setFilter, resetFilters } from '../redux/filterSlice';
import { Button } from '../components/ui/Button';
import { Search, MapPin, Star } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SpaceCard from '../components/SpaceCard';
import { debounce } from 'lodash';

const BrowseSpaces = () => {
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filters = useSelector((state) => state.filters, shallowEqual);

  const safeFilters = useMemo(() => ({
    searchQuery: '',
    city: '',
    spaceType: '',
    priceRange: '',
    ...filters
  }), [filters]);

  const debouncedSearch = useCallback(
    debounce((searchValue) => {
      dispatch(setFilter({ searchQuery: searchValue }));
    }, 500),
    [dispatch]
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    dispatch(setFilter({ searchQuery: value }));
    debouncedSearch(value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFilter({ [name]: value }));
  };

  const handleSpaceClick = (spaceId) => {
    console.log('Navigating to space with ID:', spaceId); // Debug log
    navigate(`/spaces/${spaceId}`);
  };

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const params = new URLSearchParams();
        Object.entries(safeFilters).forEach(([key, value]) => {
          if (value) {
            if (key === 'priceRange') {
              // Map priceRange to minPrice and maxPrice
              if (value === 'low') {
                params.append('minPrice', 1000);
                params.append('maxPrice', 5000);
              } else if (value === 'medium') {
                params.append('minPrice', 5000);
                params.append('maxPrice', 10000);
              } else if (value === 'high') {
                params.append('minPrice', 10000);
                params.append('maxPrice', 25000);
              } else if (value === 'premium') {
                params.append('minPrice', 25000);
              }
            } else if (key === 'spaceType') {
              // Map spaceType to type
              params.append('type', value);
            } else {
              params.append(key, value);
            }
          }
        });

        const res = await fetch(`http://localhost:5000/api/spaces/getallspaces?${params.toString()}`);
        if (!res.ok) throw new Error('Failed to fetch spaces');
        const data = await res.json();
        console.log('Fetched spaces data:', data); // Debug log
        const spacesData = data.data || [];
        // Debug each space to ensure _id exists
        spacesData.forEach(space => {
          console.log('Space ID:', space._id, 'Name:', space.name);
        });
        setSpaces(spacesData);
      } catch (err) {
        console.error('Error fetching spaces:', err);
        setError(err.message);
        setSpaces([]);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchSpaces, 300);
    return () => clearTimeout(timer);
  }, [safeFilters]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow">
        {/* Filter Section */}
        <section className="py-8 bg-white border-b text-black">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Input */}
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="searchQuery"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4261FF] focus:border-[#4261FF] transition duration-150 ease-in-out sm:text-sm"
                  placeholder="Search by location, type, or keywords..."
                  value={safeFilters.searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
              
              {/* Filter Dropdowns */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {/* City/Area */}
                <select
                  name="city"
                  className="p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#4261FF] focus:border-[#4261FF]"
                  value={safeFilters.city}
                  onChange={handleFilterChange}
                >
                  <option value="">City / Area</option>
                  <option value="delhi">Delhi NCR</option>
                  <option value="mumbai">Mumbai</option>
                  <option value="bangalore">Bangalore</option>
                  <option value="pune">Pune</option>
                  <option value="chennai">Chennai</option>
                </select>

                {/* Space Type */}
                <select
                  name="spaceType"
                  className="p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#4261FF] focus:border-[#4261FF]"
                  value={safeFilters.spaceType}
                  onChange={handleFilterChange}
                >
                  <option value="">Space Type</option>
                  <option value="retail">Retail</option>
                  <option value="restaurant">Restaurant/Café</option>
                  <option value="society">Residential Society</option>
                  <option value="office">Office Space</option>
                  <option value="clinic">Clinic/Hospital</option>
                  <option value="salon">Salon</option>
                </select>

                {/* Price Range */}
                <select
                  name="priceRange"
                  className="p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#4261FF] focus:border-[#4261FF]"
                  value={safeFilters.priceRange}
                  onChange={handleFilterChange}
                >
                  <option value="">Price Range</option>
                  <option value="low">₹1K-5K / month</option>
                  <option value="medium">₹5K-10K / month</option>
                  <option value="high">₹10K-25K / month</option>
                  <option value="premium">₹25K+ / month</option>
                </select>
              </div>

              <div className="flex gap-2">
                <Button 
                  className="bg-[#4261FF] hover:bg-[#6D4EFF]"
                >
                  Apply Filters
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => dispatch(resetFilters())}
                >
                  Reset
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Spaces Listing */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-black">
                Available Spaces ({spaces.length})
              </h2>
            </div>

            {error ? (
              <div className="text-center py-12">
                <div className="text-red-500 mb-4">Error: {error}</div>
                <Button 
                  variant="outline"
                  onClick={() => window.location.reload()}
                >
                  Retry
                </Button>
              </div>
            ) : loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : spaces.length === 0 ? (
              <div className="text-center py-12">
                <Search className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">No spaces found</h3>
                <p className="mt-1 text-gray-500">
                  {Object.values(safeFilters).some(Boolean) 
                    ? "Try adjusting your filters"
                    : "No spaces available at the moment"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {spaces.map((space) => (
                  <div 
                    key={space._id || `space-${Math.random()}`} // Fallback key if _id is undefined
                    onClick={() => handleSpaceClick(space._id)}
                    className="cursor-pointer"
                  >
                    <SpaceCard 
                      space={{
                        ...space,
                        photos: space.photos || [],
                        location: space.location || {}
                      }} 
                    />
                    {space.listingType === 'premium' && (
                      <div className="absolute top-2 left-2 bg-yellow-400 text-black px-2 py-1 rounded-md flex items-center text-xs font-bold z-10">
                        <Star size={12} className="mr-1 fill-black" />
                        PREMIUM
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BrowseSpaces;