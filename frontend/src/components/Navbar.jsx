import React, { useState, useEffect } from 'react';
import { Menu, LogOut, User, LayoutDashboard } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/userSlice'; // Adjust path to your userSlice
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.user.user); // Access user from Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Determine if user is logged in
  const isLoggedIn = !!user; // true if user exists, false otherwise

  // Detect screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Grouped navigation items
  const mainNavigationItems = [
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/industries', label: 'Industries We Serve' },
    { href: '/browse-spaces', label: 'Browse Spaces' },
    { href: '/blookforce', label: 'Join BlookForce' },
  ];

  const secondaryNavigationItems = [
    { href: '/blookperks', label: 'BlookPerks' },
    { href: '/heat-mapping', label: 'Heat Mapping' },
    { href: '/blookworks', label: 'BlookWorks' },
    { href: '/about', label: 'About' },
  ];

  // Dashboard item based on user role
  const loggedInItems = (() => {
    switch (user?.role) {
      case 'admin':
        return [
          { href: '/admin-dashboard', label: 'Admin Dashboard', icon: <LayoutDashboard size={16} className="mr-1" /> },
        ];
      case 'brand':
        return [
          { href: '/brand-dashboard', label: 'Brand Dashboard', icon: <LayoutDashboard size={16} className="mr-1" /> },
        ];
      case 'Vendor':
        return [
          { href: '/vendor-dashboard', label: 'User Dashboard', icon: <LayoutDashboard size={16} className="mr-1" /> },
        ];
      case 'space_owner':
        return [
          { href: '/spaceowner-dashboard', label: 'Space-Owner Dashboard', icon: <LayoutDashboard size={16} className="mr-1" /> },
        ];
      case 'BlookForceAgent':
        return [
          { href: '/blookforceagent-dashboard', label: 'Blookforce-Agent Dashboard', icon: <LayoutDashboard size={16} className="mr-1" /> },
        ];
      case 'telecaller':
        return [
          { href: '/telecaller', label: 'Telecaller Dashboard', icon: <LayoutDashboard size={16} className="mr-1" /> },
        ];
      default:
        return [];
    }
  })();

  const handleLogout = () => {
    dispatch(logoutUser()); // Clear user data from Redux
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="bg-white shadow-sm py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Main Navbar Row */}
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="/" className="text-2xl font-bold text-blue-600 flex-shrink-0">
            <img 
              src="/logo.png"  
              alt="BlookMySpace Logo"
              width={140}       
              height={60}
              style={{ maxHeight: '40px', width: 'auto' }}
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-1 justify-center mx-8">
            <div className="flex space-x-6">
              {mainNavigationItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 text-sm hover:text-blue-600 transition-colors whitespace-nowrap"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* CTA Buttons (Desktop) */}
          <div className="hidden lg:flex items-center space-x-3 flex-shrink-0">
            {secondaryNavigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-gray-700 text-sm hover:text-blue-600 transition-colors whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
            
            {/* Buttons based on login state */}
            <div className="flex space-x-2 ml-4">
              <a href="/registration">
                <button className="px-3 py-1.5 border border-blue-600 text-gray-700 text-sm rounded hover:bg-blue-50 transition whitespace-nowrap">
                  List Your Space
                </button>
              </a>
              
              {isLoggedIn ? (
                <>
                  {/* Dashboard Link - Based on user role */}
                  {loggedInItems.length > 0 && (
                    <a href={loggedInItems[0].href}>
                      <button className="px-3 py-1.5 border border-blue-600 text-blue-600 text-sm rounded hover:bg-blue-50 transition whitespace-nowrap flex items-center">
                        {loggedInItems[0].icon} {loggedInItems[0].label}
                      </button>
                    </a>
                  )}
                  
                  {/* Profile Link */}
                  <a href="/profile">
                    <button className="px-3 py-1.5 border border-blue-600 text-blue-600 text-sm rounded hover:bg-blue-50 transition whitespace-nowrap flex items-center">
                      <User size={16} className="mr-1" /> { 'Profile'}
                    </button>
                  </a>
                  
                  {/* Logout Button */}
                  <button 
                    onClick={handleLogout}
                    className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-indigo-500 transition whitespace-nowrap flex items-center"
                  >
                    <LogOut size={16} className="mr-1" /> Logout
                  </button>
                </>
              ) : (
                <>
                  <a href="/registration">
                    <button className="px-3 py-1.5 border border-blue-600 text-blue-600 text-sm rounded hover:bg-blue-50 transition whitespace-nowrap">
                      Request demo 
                    </button>
                  </a>
                  <a href="/login">
                    <button className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-indigo-500 transition whitespace-nowrap">
                      Login / Signup
                    </button>
                  </a>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 focus:outline-none"
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMobile && isOpen && (
          <div className="lg:hidden bg-white pt-4 pb-6">
            <div className="grid grid-cols-1 gap-2">
              {[...mainNavigationItems, ...secondaryNavigationItems].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block py-2 px-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              
              {/* Dashboard link based on user role */}
              {isLoggedIn && loggedInItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block py-2 px-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded transition-colors flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon} {item.label}
                </a>
              ))}
            </div>
            
            <div className="mt-4 space-y-3 flex flex-col gap-2 px-3">
              <a href="/registration" onClick={() => setIsOpen(false)}>
                <button className="w-full px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition">
                  List Your Space
                </button>
              </a>
              
              {isLoggedIn ? (
                <>
                  <a href="/profile" onClick={() => setIsOpen(false)}>
                    <button className="w-full px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition flex items-center justify-center">
                      <User size={16} className="mr-1" /> {user.name || 'Profile'}
                    </button>
                  </a>
                  <button 
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-indigo-500 transition flex items-center justify-center"
                  >
                    <LogOut size={16} className="mr-1" /> Logout
                  </button>
                </>
              ) : (
                <a href="/login" onClick={() => setIsOpen(false)}>
                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-indigo-500 transition">
                    Login / Signup
                  </button>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;