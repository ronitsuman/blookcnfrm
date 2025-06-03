// // App.js
// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'; // ✅ Toastify styles

// import ProtectedRoute from './routes/ProtectRoute'; 
// import Navbar from './components/Navbar';
// import LoginPage from './pages/Login';
// import AdminDashboard from './Dashboard/AdminDashbboard';
// import BrandDashboard from './Dashboard/BrandDashboard';
// import VendorDashboard from './Dashboard/VendorDashboard';
// import SpaceownerDashboard  from './Dashboard/SpaceownerDashboard';
// import BlookforceAgent from './Dashboard/BlookforceAgent';
// import Dashboard from './pages/Dashboard';
// import Profile from './pages/Profile';
// import AuthRedirect from './pages/AuthRedirect';
// import  Home  from './pages/Home';
// import About from './pages/About';
// import Registration from './pages/Registration';
// import BlookForce from './pages/Blookforce';
// import BlookPerks from './pages/Blookperks';
// import HowItWorks from './pages/How_its_Works';
// import HeatMapping from './pages/HeatMapping';
// import Industries from './pages/Industries';
// import BlookWorks from './pages/BlookWorks';
// import BrowseSpaces from './pages/BrowseSpaces';

// import SpaceDetails from './pages/SpaceDetail';
// import TelecallerDashboard from './Dashboard/TelecallerDashboard';

// const App = () => {
//   return (
//     <div>
//       <ToastContainer position="top-right" autoClose={3000} /> {/* ✅ Add this */}
      
//       <Routes>
//         <Route path="/navbar" element={<Navbar />} />
//         <Route path="/space/:spaceid/availabilty" element={<Navbar />} />
//         <Route path="/browse-spaces" element={<BrowseSpaces/>} />
//         <Route path='/spaces/:id'element={<SpaceDetails/>}/>
//         <Route path="/blookworks" element={<BlookWorks/>} />
//         <Route path="/heat-mapping" element={<HeatMapping/>} />
//         <Route path="/industries" element={<Industries/>} />
//         <Route path="/registration" element={<Registration/>} />
//         <Route path="/how-it-works" element={<HowItWorks/>} />
//         <Route path="/about" element={
          
//           <About/>} />
//         <Route

//           path="/admin-dashboard"
//           element={
//             <ProtectedRoute allowedRoles={['admin']}>
//               <AdminDashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/brand-dashboard"
//           element={
//             <ProtectedRoute allowedRoles={['brand']}>
//               <BrandDashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route path="/dashboard" element={<Dashboard/>} />
//         <Route path="/blookforce" element={<BlookForce/>} />
//         <Route path="/blookperks" element={<BlookPerks/>} />
//         <Route path="/auth-redirect" element={<AuthRedirect/>} />
//         <Route path="/profile" element={<Profile/>} />
  
//         <Route
//           path="/vendor-dashboard"
//           element={
//             <ProtectedRoute allowedRoles={['Vendor']}>
//               <VendorDashboard/>
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/spaceowner-dashboard"
//           element={
//            <ProtectedRoute allowedRoles={['space_owner']}>
//              <SpaceownerDashboard/>
//            </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/blookforceagent-dashboard"
//           element={
//             <ProtectedRoute allowedRoles={['blookforce_agent']}>
//               <BlookforceAgent/>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/telecaller"
//           element={
//             <ProtectedRoute allowedRoles={['telecaller']}>
//               <TelecallerDashboard/>
//             </ProtectedRoute>
//           }
//         />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/" element={<Home/>} />
//       </Routes>
//     </div>
//   );
// };

// export default App;

// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// import ProtectedRoute from './routes/ProtectRoute';
// import Navbar from './components/Navbar';
// import LoginPage from './pages/Login';
// import AdminDashboard from './Dashboard/AdminDashbboard';
// import BrandDashboard from './Dashboard/BrandDashboard';
// import VendorDashboard from './Dashboard/VendorDashboard';
// import SpaceownerDashboard from './Dashboard/SpaceownerDashboard';
// import BlookforceAgent from './Dashboard/BlookforceAgent';
// import Dashboard from './pages/Dashboard';
// import Profile from './pages/Profile';
// import AuthRedirect from './pages/AuthRedirect';
// import Home from './pages/Home';
// import About from './pages/About';
// import Registration from './pages/Registration';
// import BlookForce from './pages/Blookforce';
// import BlookPerks from './pages/Blookperks';
// import HowItWorks from './pages/How_its_Works';
// import HeatMapping from './pages/HeatMapping';
// import Industries from './pages/Industries';
// import BlookWorks from './pages/BlookWorks';
// import BrowseSpaces from './pages/BrowseSpaces';
// import SpaceDetails from './pages/SpaceDetail';
// import AvailabilityCalendar from './pages/AvailabilityCalendar';
// import TelecallerDashboard from './Dashboard/TelecallerDashboard';
// import OwnerBookings from './components/OwnerBooking';
// import AnalyticsDashboard from './pages/AnalyticalDashboard';

// const App = () => {
//   return (
//     <div>
//       <ToastContainer position="top-right" autoClose={3000} />
      
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/navbar" element={<Navbar />} />
//         <Route path="/browse-spaces" element={<BrowseSpaces />} />
//         <Route path="/spaces/:spaceId/availability" element={<AvailabilityCalendar />} /> {/*  Moved up */}
//         <Route path="/spaces/:id" element={
          
//           <ProtectedRoute allowedRoles={['admin', 'brand', 'Vendor', 'space_owner', 'blookforce_agent', 'telecaller']}>
//           <SpaceDetails/>
//         </ProtectedRoute>
//           } /> {/*  availability */}
//         <Route path="/registration" element={<Registration />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/how-it-works" element={<HowItWorks />} />
//         <Route path="/blookforce" element={<BlookForce />} />
//         <Route path="/blookperks" element={<BlookPerks />} />
//         <Route path="/heat-mapping" element={<HeatMapping />} />
//         <Route path="/industries" element={<Industries />} />
//         <Route path="/blookworks" element={<BlookWorks />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/auth-redirect" element={<AuthRedirect />} />
//         <Route path="/profile" element={<Profile />} />
        
//         <Route
//           path="/admin-dashboard"
//           element={
//             <ProtectedRoute allowedRoles={['admin']}>
//               <AdminDashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/brand-dashboard"
//           element={
//             <ProtectedRoute allowedRoles={['brand']}>
//               <BrandDashboard />
//             </ProtectedRoute>
//           }
//         />
//          <Route
//           path="/analytics"
//           element={
//             <ProtectedRoute allowedRoles={['admin', 'brand', 'space_owner']}>
//               <AnalyticsDashboard/>
//             </ProtectedRoute>
//           }
//         />
        
//         <Route
//           path="/vendor-dashboard"
//           element={
//             <ProtectedRoute allowedRoles={['Vendor']}>
//               <VendorDashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/spaceowner-dashboard"
//           element={
//             <ProtectedRoute allowedRoles={['space_owner']}>
//               <SpaceownerDashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/blookforceagent-dashboard"
//           element={
//             <ProtectedRoute allowedRoles={['blookforce_agent']}>
//               <BlookforceAgent />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/telecaller"
//           element={
//             <ProtectedRoute allowedRoles={['telecaller']}>
//               <TelecallerDashboard />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </div>
//   );
// };

// export default App;





import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ProtectedRoute from './routes/ProtectRoute';
import Navbar from './components/Navbar';
import LoginPage from './pages/Login';
import AdminDashboard from './Dashboard/AdminDashbboard';
import BrandDashboard from './Dashboard/BrandDashboard';
import VendorDashboard from './Dashboard/VendorDashboard';
import SpaceownerDashboard from './Dashboard/SpaceownerDashboard';
import BlookforceAgent from './Dashboard/BlookforceAgent';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import AuthRedirect from './pages/AuthRedirect';
import Home from './pages/Home';
import About from './pages/About';
import Registration from './pages/Registration';
import BlookForce from './pages/Blookforce';
import BlookPerks from './pages/Blookperks';
import HowItWorks from './pages/How_its_Works';
import HeatMapping from './pages/HeatMapping';
import Industries from './pages/Industries';
import BlookWorks from './pages/BlookWorks';
import BrowseSpaces from './pages/BrowseSpaces';
import SpaceDetails from './pages/SpaceDetail';
import AvailabilityCalendar from './pages/AvailabilityCalendar';
import BookingList from './pages/booking';
import AnalyticsDashboard from './pages/AnalyticalDashboard';
import SubscriptionPage from './pages/SubscriptionPage';
import Success from './pages/Success';
import TelecallerDashboard from './Dashboard/TelecallerDashboard';
import PaymentCheckout from './components/PaymentCheckout';

const App = () => {
  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/payment" element={<SubscriptionPage/>} />
        <Route path="/browse-spaces" element={<BrowseSpaces />} />
        <Route path="/spaces/:spaceId/availability" element={<AvailabilityCalendar />} />
        <Route
          path="/spaces/:id"
          element={
            <ProtectedRoute allowedRoles={['admin', 'brand', 'space_owner', 'Vendor', 'blookforce_agent', 'telecaller']}>
              <SpaceDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookings"
          element={
            <ProtectedRoute allowedRoles={['brand']}>
              <BookingList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute allowedRoles={['admin', 'brand', 'space_owner']}>
              <AnalyticsDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/subscriptions"
          element={
            <ProtectedRoute allowedRoles={['brand', 'space_owner', 'vendor', 'blookforce']}>
              <SubscriptionPage />
            </ProtectedRoute>
          }
        />
        <Route path="/subscriptions/success" element={<Success />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/about" element={<About />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/blookforce" element={<BlookForce />} />
        <Route path="/blookperks" element={<BlookPerks />} />
        <Route path="/heat-mapping" element={<HeatMapping />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/blookworks" element={<BlookWorks />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/auth-redirect" element={<AuthRedirect />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/brand-dashboard"
          element={
            <ProtectedRoute allowedRoles={['brand']}>
              <BrandDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vendor-dashboard"
          element={
            <ProtectedRoute allowedRoles={['Vendor']}>
              <VendorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/spaceowner-dashboard"
          element={
            <ProtectedRoute allowedRoles={['space_owner']}>
              <SpaceownerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/blookforceagent-dashboard"
          element={
            <ProtectedRoute allowedRoles={['blookforce_agent']}>
              <BlookforceAgent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/telecaller"
          element={
            <ProtectedRoute allowedRoles={['telecaller']}>
              <TelecallerDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;