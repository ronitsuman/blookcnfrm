import { useSelector } from 'react-redux';
import BrandDashboard from '../Dashboard/BrandDashboard';
import Navbar from '../components/Navbar';
import AdminDashboard from '../Dashboard/AdminDashbboard';
import VendorDashboard from '../Dashboard/VendorDashboard';
import BlookforceAgent from '../Dashboard/BlookforceAgent';
import SpaceownerDashboard from '../Dashboard/SpaceownerDashboard';
import TelecallerDashboard from '../Dashboard/TelecallerDashboard';


const Dashboard = () => {
  const user = useSelector((state) => state.user.user);
    const userRole = useSelector((state) => state.user.role);
    console.log(user)

  if (!user) return <p>Please log in</p>;

  return (
    <>
    
    
     

      {user.role === 'admin' && 
      <AdminDashboard/>}
      
       {/* <h2>Hello, {user.name}</h2> */}
      {user.role === 'vendor' && <VendorDashboard/>}
      {user.role === 'blookforce_agent' && <BlookforceAgent/>}
      {user.role === 'brand' && <BrandDashboard/> }
      {user.role === 'space_owner' && <SpaceownerDashboard/>}
      {user.role === 'telecaller' && <TelecallerDashboard/>}
    </>
  );
};
export default Dashboard;
