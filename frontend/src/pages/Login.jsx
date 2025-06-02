// // // LoginPage.js
// // import React, { useState } from 'react';
// // import { useDispatch } from 'react-redux';
// // import { setUser } from '../redux/userSlice';
// // import { useNavigate } from 'react-router-dom';
// // import axios from 'axios';
// // import Navbar from '../components/Navbar';

// // const LoginPage = () => {
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [error, setError] = useState('');
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();

// //   const handleLogin = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const response = await axios.post('http://localhost:5000/api/auth/login', {
// //         email,
// //         password,
// //       });
// //       console.log('API Response:', response.data);

// //       // Extract data based on the API response structure
// //       const userData = {
// //         email: response.data.user.email, // Access nested email
// //         name: response.data.user.name, // Access nested name
// //         role: response.data.user.role, // Access nested role
// //         token: response.data.user.token, 
       
// //       };

// //       //log the extracted data 
// //       console.log(
// //         'Extracted User Data:', userData
// //       )
// //       console.log("name", userData.name)

// //       // Validate required fields
// //       if (!userData.name || !userData.role || !userData.token || !userData.email) {
// //         throw new Error('Missing required fields in API response');
// //       }

// //       dispatch(setUser(userData));
// //       navigate('/dashboard');
// //     } catch (err) {
// //       setError(
// //         err.response?.data?.message || err.message || 'Login failed. Please check your credentials.'
// //       );
// //       console.error('Login error:', err);
// //     }
// //   };

// //   return (
// //     <>
// //     <Navbar/>
  
// //     <div className="container mx-auto px-4 py-8">
// //       <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
// //       <form onSubmit={handleLogin} className="max-w-md mx-auto">
// //         {error && <p className="text-red-500 mb-4">{error}</p>}
// //         <div className="mb-4">
// //           <label htmlFor="email" className="block text-gray-700 mb-2">
// //             Email
// //           </label>
// //           <input
// //             type="email"
// //             id="email"
// //             value={email}
// //             onChange={(e) => setEmail(e.target.value)}
// //             className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-600"
// //             placeholder="Enter your email"
// //             required
// //           />
// //         </div>
// //         <div className="mb-4">
// //           <label htmlFor="password" className="block text-gray-700 mb-2">
// //             Password
// //           </label>
// //           <input
// //             type="password"
// //             id="password"
// //             value={password}
// //             onChange={(e) => setPassword(e.target.value)}
// //             className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-600"
// //             placeholder="Enter your password"
// //             required
// //           />
// //         </div>
// //         <button
// //           type="submit"
// //           className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-indigo-500 transition"
// //         >
// //           Login
// //         </button>
// //       </form>
// //     </div>
// //     </>
// //   );
// // };

// // export default LoginPage;

// // //part 2
// // import React, { useState, useEffect } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { setUser } from '../redux/userSlice';
// // import { useNavigate } from 'react-router-dom';
// // import axios from 'axios';
// // import { toast } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// // import Navbar from '../components/Navbar';
// // import GoogleLoginButton from '../components/GoogleLoginButton';

// // const Login = () => {
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();
// //   const user = useSelector((state) => state.user);
// //   const resetToken = useSelector((state) => state.user.resetToken);

// //   const [activeTab, setActiveTab] = useState('signup');
// //   const [formData, setFormData] = useState({
// //     name: '',
// //     email: '',
// //     phone: '',
// //     password: '',
// //     confirmPassword: '',
// //     role: '',
// //     otp: '',
// //     newPassword: '',
// //     confirmNewPassword: '',
// //   });
// //   const [error, setError] = useState('');
// //   const [success, setSuccess] = useState('');
// //   const [loading, setLoading] = useState(false);
// //   const [forgotPasswordStep, setForgotPasswordStep] = useState(1);

// //   const API_URL = 'http://localhost:5000/api/auth';

// //   // Restore session from token on mount
// //   useEffect(() => {
// //     const token = localStorage.getItem('token');
// //     if (token && !user) {
// //       axios
// //         .get(`${API_URL}/me`, {
// //           headers: { Authorization: `Bearer ${token}` },
// //         })
// //         .then((res) => {
// //           dispatch(setUser(res.data.user));
// //           dispatch(setToken(token));
// //         })
// //         .catch((err) => {
// //           console.error('Failed to restore session:', err);
// //           localStorage.removeItem('token');
// //         });
// //     }
// //   }, [dispatch, user]);

// //   // Redirect based on user role
// //   useEffect(() => {
// //     if (user?.role) {
// //       const roleDashboard = {
// //         space_owner: '/dashboard/spaceowner',
// //         brand: '/dashboard/brand',
// //         blookforceagent: '/dashboard/blookforceagent',
// //         vendor: '/dashboard/vendor',
// //         admin: '/dashboard/admin',
// //       };
// //       const route = roleDashboard[user.role.toLowerCase()];
// //       if (route) {
// //         navigate(route);
// //       } else {
// //         setError('Invalid role');
// //       }
// //     }
// //   }, [user, navigate]);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData({
// //       ...formData,
// //       [name]: value,
// //     });
// //   };

// //   const handleLogin = async (e) => {
// //     e.preventDefault();
// //     setError('');
// //     setLoading(true);
// //     try {
// //       const response = await axios.post(`${API_URL}/login`, {
// //         email: formData.email,
// //         password: formData.password,
// //       });
// //       console.log('API Response:', response.data);

// //       const userData = {
// //         email: response.data.user.email,
// //         name: response.data.user.name,
// //         role: response.data.user.role,
// //         token: response.data.user.token,
// //       };

// //       console.log('Extracted User Data:', userData);
// //       console.log('name', userData.name);

// //       if (!userData.name || !userData.role || !userData.token || !userData.email) {
// //         throw new Error('Missing required fields in API response');
// //       }

// //       dispatch(setUser(userData));
// //       localStorage.setItem('token', userData.token);
// //       navigate('/dashboard');
// //     } catch (err) {
// //       setError(
// //         err.response?.data?.message || err.message || 'Login failed. Please check your credentials.'
// //       );
// //       console.error('Login error:', err);
// //       toast.error(err.response?.data?.message || err.message || 'Login failed');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError('');
// //     setSuccess('');
// //     setLoading(true);

// //     try {
// //       if (activeTab === 'signup') {
// //         if (formData.password !== formData.confirmPassword) {
// //           throw new Error('Passwords do not match');
// //         }

// //         const signupData = {
// //           name: formData.name,
// //           email: formData.email,
// //           phone: formData.phone,
// //           password: formData.password,
// //           role: formData.role,
// //         };

// //         const response = await axios.post(`${API_URL}/register`, signupData);
// //         console.log('Signup successful:', response.data);
// //         setSuccess('Account created successfully!');
// //         toast.success('Account created successfully!');
// //         setActiveTab('login');
// //       } else if (activeTab === 'login') {
// //         handleLogin(e);
// //       } else if (activeTab === 'forgot') {
// //         if (forgotPasswordStep === 1) {
// //           const forgotData = {
// //             email: formData.email,
// //           };

// //           const response = await axios.post(`${API_URL}/send-otp`, forgotData);
// //           console.log('OTP sent:', response.data);
// //           toast.success('OTP sent to your email!');
// //           setForgotPasswordStep(2);
// //         } else if (forgotPasswordStep === 2) {
// //           const otpData = {
// //             email: formData.email,
// //             otp: formData.otp,
// //           };

// //           const response = await axios.post(`${API_URL}/verify-otp`, otpData);
// //           console.log('OTP verified:', response.data);
// //           toast.success('OTP verified successfully!');
// //           if (response.data?.resetToken) {
// //             dispatch(setResetToken(response.data.resetToken));
// //           }
// //           setForgotPasswordStep(3);
// //         } else if (forgotPasswordStep === 3) {
// //           if (formData.newPassword !== formData.confirmNewPassword) {
// //             throw new Error('New passwords do not match');
// //           }

// //           const resetData = {
// //             resetToken,
// //             newPassword: formData.newPassword,
// //           };

// //           const response = await axios.post(`${API_URL}/reset-password`, resetData);
// //           console.log('Password reset successful:', response.data);
// //           toast.success('Password changed successfully!');
// //           setActiveTab('login');
// //           setForgotPasswordStep(1);
// //         }
// //       }
// //     } catch (err) {
// //       setError(err.response?.data?.message || err.message || 'An error occurred');
// //       toast.error(err.response?.data?.message || err.message || 'An error occurred');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <>
// //       <Navbar />
// //       <div className="min-h-screen bg-gray-50 flex text-black placeholder:text-black flex-col justify-center py-12 sm:px-6 lg:px-8">
// //         <div className="sm:mx-auto sm:w-full sm:max-w-md">
// //           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
// //             {activeTab === 'signup' ? 'Create Account' :
// //              activeTab === 'login' ? 'Welcome Back' :
// //              'Reset Password'}
// //           </h2>
// //           <p className="mt-2 text-center text-sm text-gray-600">
// //             {activeTab === 'signup'
// //               ? 'Join BlookMySpace to list spaces or find the perfect location for your brand'
// //               : activeTab === 'login'
// //               ? 'Sign in to your account to continue'
// //               : 'Enter your email to reset your password'}
// //           </p>
// //         </div>

// //         <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
// //           <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
// //             {error && (
// //               <div className="mb-4 text-red-600 text-sm text-center">
// //                 {error}
// //               </div>
// //             )}
// //             {success && (
// //               <div className="mb-4 text-green-600 text-sm text-center">
// //                 {success}
// //               </div>
// //             )}

// //             <div className="flex border-b mb-6">
// //               <button
// //                 onClick={() => {
// //                   setActiveTab('signup');
// //                   setForgotPasswordStep(1);
// //                 }}
// //                 className={`py-2 px-4 font-medium text-sm ${activeTab === 'signup' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
// //               >
// //                 Sign Up
// //               </button>
// //               <button
// //                 onClick={() => {
// //                   setActiveTab('login');
// //                   setForgotPasswordStep(1);
// //                 }}
// //                 className={`py-2 px-4 font-medium text-sm ${activeTab === 'login' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
// //               >
// //                 Login
// //               </button>
// //               <button
// //                 onClick={() => {
// //                   setActiveTab('forgot');
// //                   setForgotPasswordStep(1);
// //                 }}
// //                 className={`py-2 px-4 font-medium text-sm ${activeTab === 'forgot' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
// //               >
// //                 Forgot Password
// //               </button>
// //             </div>

// //             <form className="space-y-6" onSubmit={handleSubmit}>
// //               {activeTab === 'signup' && (
// //                 <>
// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-700">I am a</label>
// //                     <select
// //                       name="role"
// //                       value={formData.role}
// //                       onChange={handleChange}
// //                       required
// //                       className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
// //                     >
// //                       <option value="" disabled>Select account type</option>
// //                       <option value="space_owner">Space Owner</option>
// //                       <option value="brand">Brands</option>
// //                       <option value="BlookForceAgent">BlookForce agents</option>
// //                       <option value="Vendor">Vendor</option>
// //                     </select>
// //                   </div>

// //                   <div>
// //                     <label htmlFor="name" className="block text-sm font-medium text-gray-700">
// //                       Name
// //                     </label>
// //                     <input
// //                       id="name"
// //                       name="name"
// //                       type="text"
// //                       required
// //                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
// //                       value={formData.name}
// //                       onChange={handleChange}
// //                     />
// //                   </div>
// //                 </>
// //               )}

// //               {(activeTab === 'signup' || activeTab === 'login' || (activeTab === 'forgot' && forgotPasswordStep === 1)) && (
// //                 <div>
// //                   <label htmlFor="email" className="block text-sm font-medium text-gray-700">
// //                     Email
// //                   </label>
// //                   <input
// //                     id="email"
// //                     name="email"
// //                     type="email"
// //                     autoComplete="email"
// //                     required
// //                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
// //                     placeholder="name@example.com"
// //                     value={formData.email}
// //                     onChange={handleChange}
// //                   />
// //                 </div>
// //               )}

// //               {activeTab === 'forgot' && forgotPasswordStep === 2 && (
// //                 <div>
// //                   <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
// //                     Enter OTP
// //                   </label>
// //                   <input
// //                     id="otp"
// //                     name="otp"
// //                     type="text"
// //                     required
// //                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
// //                     placeholder="Enter 6-digit OTP"
// //                     value={formData.otp}
// //                     onChange={handleChange}
// //                   />
// //                   <p className="mt-2 text-sm text-gray-500">
// //                     We've sent a 6-digit OTP to your email. Please check your inbox.
// //                   </p>
// //                 </div>
// //               )}

// //               {activeTab === 'forgot' && forgotPasswordStep === 3 && (
// //                 <>
// //                   <div>
// //                     <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
// //                       New Password
// //                     </label>
// //                     <input
// //                       id="newPassword"
// //                       name="newPassword"
// //                       type="password"
// //                       required
// //                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
// //                       value={formData.newPassword}
// //                       onChange={handleChange}
// //                     />
// //                   </div>
// //                   <div>
// //                     <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700">
// //                       Confirm New Password
// //                     </label>
// //                     <input
// //                       id="confirmNewPassword"
// //                       name="confirmNewPassword"
// //                       type="password"
// //                       required
// //                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
// //                       value={formData.confirmNewPassword}
// //                       onChange={handleChange}
// //                     />
// //                   </div>
// //                 </>
// //               )}

// //               {activeTab === 'signup' && (
// //                 <div>
// //                   <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
// //                     Phone Number
// //                   </label>
// //                   <input
// //                     id="phone"
// //                     name="phone"
// //                     type="tel"
// //                     required
// //                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
// //                     value={formData.phone}
// //                     onChange={handleChange}
// //                   />
// //                 </div>
// //               )}

// //               {(activeTab === 'signup' || activeTab === 'login') && (
// //                 <div>
// //                   <label htmlFor="password" className="block text-sm font-medium text-gray-700">
// //                     Password
// //                   </label>
// //                   <input
// //                     id="password"
// //                     name="password"
// //                     type="password"
// //                     required
// //                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
// //                     value={formData.password}
// //                     onChange={handleChange}
// //                   />
// //                 </div>
// //               )}

// //               {activeTab === 'signup' && (
// //                 <div>
// //                   <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
// //                     Confirm Password
// //                   </label>
// //                   <input
// //                     id="confirmPassword"
// //                     name="confirmPassword"
// //                     type="password"
// //                     required
// //                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
// //                     value={formData.confirmPassword}
// //                     onChange={handleChange}
// //                   />
// //                 </div>
// //               )}

// //               <div>
// //                 <button
// //                   type="submit"
// //                   disabled={loading}
// //                   className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
// //                 >
// //                   {loading
// //                     ? 'Processing...'
// //                     : activeTab === 'signup'
// //                     ? 'Create Account'
// //                     : activeTab === 'login'
// //                     ? 'Sign In'
// //                     : forgotPasswordStep === 1
// //                     ? 'Send OTP'
// //                     : forgotPasswordStep === 2
// //                     ? 'Verify OTP'
// //                     : 'Reset Password'}
// //                 </button>
// //               </div>

// //               {(activeTab === 'signup' || activeTab === 'login') && (
// //                 <div className="space-y-4">
// //                   <div className="relative">
// //                     <div className="absolute inset-0 flex items-center">
// //                       <div className="w-full border-t border-gray-300"></div>
// //                     </div>
// //                     <div className="relative flex justify-center text-sm">
// //                       <span className="px-2 bg-white text-gray-500">OR</span>
// //                     </div>
// //                   </div>
// //                   <GoogleLoginButton 
// //                     text={activeTab === 'signup' ? 'Sign up with Google' : 'Sign in with Google'}
// //                   />
// //                 </div>
// //               )}

// //               {activeTab === 'login' && (
// //                 <div className="text-center">
// //                   <button
// //                     type="button"
// //                     onClick={() => {
// //                       setActiveTab('forgot');
// //                       setForgotPasswordStep(1);
// //                     }}
// //                     className="text-sm text-blue-600 hover:text-blue-800"
// //                   >
// //                     Forgot your password?
// //                   </button>
// //                 </div>
// //               )}

// //               {activeTab === 'forgot' && forgotPasswordStep > 1 && (
// //                 <div className="text-center">
// //                   <button
// //                     type="button"
// //                     onClick={() => {
// //                       setForgotPasswordStep(1);
// //                       setFormData({
// //                         ...formData,
// //                         otp: '',
// //                         newPassword: '',
// //                         confirmNewPassword: '',
// //                       });
// //                     }}
// //                     className="text-sm text-blue-600 hover:text-blue-800"
// //                   >
// //                     Back to email entry
// //                   </button>
// //                 </div>
// //               )}
// //             </form>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default Login;





// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setUser } from '../redux/userSlice';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Navbar from '../components/Navbar';
// import GoogleLoginButton from '../components/GoogleLoginButton';

// const Login = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const user = useSelector((state) => state.user);
//   const resetToken = useSelector((state) => state.user.resetToken);

//   const [activeTab, setActiveTab] = useState('signup');
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     password: '',
//     confirmPassword: '',
//     role: '',
//     otp: '',
//     newPassword: '',
//     confirmNewPassword: '',
//   });
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [forgotPasswordStep, setForgotPasswordStep] = useState(1);

//   const API_URL = 'http://localhost:5000/api/auth';

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token && !user) {
//       axios
//         .get(`${API_URL}/me`, {
//           headers: { Authorization: `Bearer ${token}` },
//         })
//         .then((res) => {
//           dispatch(setUser(res.data.user));
//           dispatch(setToken(token));
//         })
//         .catch((err) => {
//           console.error('Failed to restore session:', err);
//           localStorage.removeItem('token');
//         });
//     }
//   }, [dispatch, user]);

//   useEffect(() => {
//     if (user?.role) {
//       const roleDashboard = {
//         space_owner: '/dashboard/spaceowner',
//         brand: '/dashboard/brand',
//         blookforceagent: '/dashboard/blookforceagent',
//         vendor: '/dashboard/vendor',
//         admin: '/dashboard/admin',
//       };
//       const route = roleDashboard[user.role.toLowerCase()];
//       if (route) {
//         navigate(route);
//       } else {
//         setError('Invalid role');
//       }
//     }
//   }, [user, navigate]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);
//     try {
//       const response = await axios.post(`${API_URL}/login`, {
//         email: formData.email,
//         password: formData.password,
//       });
//       console.log(response.data)

//       const userData = {
//         email: response.data.user.email,
//         name: response.data.user.name,
//         role: response.data.user.role,
//         token: response.data.user.token,
//         id: response.data.user.id,
//       };

//       if (!userData.name || !userData.role || !userData.token || !userData.email) {
//         throw new Error('Missing required fields in API response');
//       }

//       dispatch(setUser(userData));
//       localStorage.setItem('token', userData.token);
//       toast.success('Login successful!');
//       navigate('/dashboard');
//     } catch (err) {
//       const message = err.response?.data?.message || err.message || 'Login failed';
//       setError(message);
//       toast.error(message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');
//     setLoading(true);

//     try {
//       if (activeTab === 'signup') {
//         if (formData.password !== formData.confirmPassword) {
//           throw new Error('Passwords do not match');
//         }

//         const signupData = {
//           name: formData.name,
//           email: formData.email,
//           phone: formData.phone,
//           password: formData.password,
//           role: formData.role,
//         };

//         const response = await axios.post(`${API_URL}/register`, signupData);
//         setSuccess('Account created successfully!');
//         toast.success('Account created successfully!');
//         setActiveTab('login');
//       } else if (activeTab === 'login') {
//         handleLogin(e);
//       } else if (activeTab === 'forgot') {
//         if (forgotPasswordStep === 1) {
//           const response = await axios.post(`${API_URL}/send-otp`, {
//             email: formData.email,
//           });
//           toast.success('OTP sent to your email!');
//           setForgotPasswordStep(2);
//         } else if (forgotPasswordStep === 2) {
//           const response = await axios.post(`${API_URL}/verify-otp`, {
//             email: formData.email,
//             otp: formData.otp,
//           });
//           toast.success('OTP verified!');
//           if (response.data?.resetToken) {
//             dispatch(setResetToken(response.data.resetToken));
//           }
//           setForgotPasswordStep(3);
//         } else if (forgotPasswordStep === 3) {
//           if (formData.newPassword !== formData.confirmNewPassword) {
//             throw new Error('New passwords do not match');
//           }

//           const response = await axios.post(`${API_URL}/reset-password`, {
//             resetToken,
//             newPassword: formData.newPassword,
//           });
//           toast.success('Password changed successfully!');
//           setActiveTab('login');
//           setForgotPasswordStep(1);
//         }
//       }
//     } catch (err) {
//       const message = err.response?.data?.message || err.message || 'An error occurred';
//       setError(message);
//       toast.error(message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//     <Navbar />
//     <div className="min-h-screen bg-gray-50 flex text-black placeholder:text-black flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//           {activeTab === 'signup' ? 'Create Account' :
//            activeTab === 'login' ? 'Welcome Back' :
//            'Reset Password'}
//         </h2>
//         <p className="mt-2 text-center text-sm text-gray-600">
//           {activeTab === 'signup'
//             ? 'Join BlookMySpace to list spaces or find the perfect location for your brand'
//             : activeTab === 'login'
//             ? 'Sign in to your account to continue'
//             : 'Enter your email to reset your password'}
//         </p>
//       </div>

//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//           {error && (
//             <div className="mb-4 text-red-600 text-sm text-center">
//               {error}
//             </div>
//           )}
//           {success && (
//             <div className="mb-4 text-green-600 text-sm text-center">
//               {success}
//             </div>
//           )}

//           <div className="flex border-b mb-6">
//             <button
//               onClick={() => {
//                 setActiveTab('signup');
//                 setForgotPasswordStep(1);
//               }}
//               className={`py-2 px-4 font-medium text-sm ${activeTab === 'signup' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
//             >
//               Sign Up
//             </button>
//             <button
//               onClick={() => {
//                 setActiveTab('login');
//                 setForgotPasswordStep(1);
//               }}
//               className={`py-2 px-4 font-medium text-sm ${activeTab === 'login' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
//             >
//               Login
//             </button>
//             <button
//               onClick={() => {
//                 setActiveTab('forgot');
//                 setForgotPasswordStep(1);
//               }}
//               className={`py-2 px-4 font-medium text-sm ${activeTab === 'forgot' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
//             >
//               Forgot Password
//             </button>  
//           </div>

//           <form className="space-y-6" onSubmit={handleSubmit}>
//             {activeTab === 'signup' && (
//               <>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">I am a</label>
//                   <select
//                     name="role"
//                     value={formData.role}
//                     onChange={handleChange}
//                     required
//                     className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
//                   >
//                     <option value="" disabled>Select account type</option>
//                     <option value="space_owner">Space Owner</option>
//                     <option value="brand">Brands</option>
//                     <option value="BlookForceAgent">BlookForce agents</option>
//                     <option value="Vendor">Vendor</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//                     Name
//                   </label>
//                   <input
//                     id="name"
//                     name="name"
//                     type="text"
//                     required
//                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                     value={formData.name}
//                     onChange={handleChange}
//                   />
//                 </div>
//               </>
//             )}

//             {(activeTab === 'signup' || activeTab === 'login' || (activeTab === 'forgot' && forgotPasswordStep === 1)) && (
//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                   Email
//                 </label>
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   autoComplete="email"
//                   required
//                   className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                   placeholder="name@example.com"
//                   value={formData.email}
//                   onChange={handleChange}
//                 />
//               </div>
//             )}

//             {activeTab === 'forgot' && forgotPasswordStep === 2 && (
//               <div>
//                 <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
//                   Enter OTP
//                 </label>
//                 <input
//                   id="otp"
//                   name="otp"
//                   type="text"
//                   required
//                   className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                   placeholder="Enter 6-digit OTP"
//                   value={formData.otp}
//                   onChange={handleChange}
//                 />
//                 <p className="mt-2 text-sm text-gray-500">
//                   We've sent a 6-digit OTP to your email. Please check your inbox.
//                 </p>
//               </div>
//             )}

//             {activeTab === 'forgot' && forgotPasswordStep === 3 && (
//               <>
//                 <div>
//                   <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
//                     New Password
//                   </label>
//                   <input
//                     id="newPassword"
//                     name="newPassword"
//                     type="password"
//                     required
//                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                     value={formData.newPassword}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700">
//                     Confirm New Password
//                   </label>
//                   <input
//                     id="confirmNewPassword"
//                     name="confirmNewPassword"
//                     type="password"
//                     required
//                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                     value={formData.confirmNewPassword}
//                     onChange={handleChange}
//                   />
//                 </div>
//               </>
//             )}

//             {activeTab === 'signup' && (
//               <div>
//                 <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
//                   Phone Number
//                 </label>
//                 <input
//                   id="phone"
//                   name="phone"
//                   type="tel"
//                   required
//                   className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                   value={formData.phone}
//                   onChange={handleChange}
//                 />
//               </div>
//             )}

//             {(activeTab === 'signup' || activeTab === 'login') && (
//               <div>
//                 <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                   Password
//                 </label>
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   required
//                   className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                   value={formData.password}
//                   onChange={handleChange}
//                 />
//               </div>
//             )}

//             {activeTab === 'signup' && (
//               <div>
//                 <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
//                   Confirm Password
//                 </label>
//                 <input
//                   id="confirmPassword"
//                   name="confirmPassword"
//                   type="password"
//                   required
//                   className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                 />
//               </div>
//             )}

//             <div>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//               >
//                 {loading
//                   ? 'Processing...'
//                   : activeTab === 'signup'
//                   ? 'Create Account'
//                   : activeTab === 'login'
//                   ? 'Sign In'
//                   : forgotPasswordStep === 1
//                   ? 'Send OTP'
//                   : forgotPasswordStep === 2
//                   ? 'Verify OTP'
//                   : 'Reset Password'}
//               </button>
//             </div>

//             {(activeTab === 'signup' || activeTab === 'login') && (
//               <div className="space-y-4">
//                 <div className="relative">
//                   <div className="absolute inset-0 flex items-center">
//                     <div className="w-full border-t border-gray-300"></div>
//                   </div>
//                   <div className="relative flex justify-center text-sm">
//                     <span className="px-2 bg-white text-gray-500">OR</span>
//                   </div>
//                 </div>
//                 <GoogleLoginButton 
//                   text={activeTab === 'signup' ? 'Sign up with Google' : 'Sign in with Google'}
//                 />
//               </div>
//             )}

//             {activeTab === 'login' && (
//               <div className="text-center">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setActiveTab('forgot');
//                     setForgotPasswordStep(1);
//                   }}
//                   className="text-sm text-blue-600 hover:text-blue-800"
//                 >
//                   Forgot your password?
//                 </button>
//               </div>
//             )}

//             {activeTab === 'forgot' && forgotPasswordStep > 1 && (
//               <div className="text-center">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setForgotPasswordStep(1);
//                     setFormData({
//                       ...formData,
//                       otp: '',
//                       newPassword: '',
//                       confirmNewPassword: '',
//                     });
//                   }}
//                   className="text-sm text-blue-600 hover:text-blue-800"
//                 >
//                   Back to email entry
//                 </button>
//               </div>
//             )}
//           </form>
//         </div>
//       </div>
//     </div>
//   </>
//   );
// };

// export default Login;

// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setUser } from '../redux/userSlice';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Navbar from '../components/Navbar';
// import GoogleLoginButton from '../components/GoogleLoginButton';

// const Login = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const user = useSelector((state) => state.user);
//   const resetToken = useSelector((state) => state.user.resetToken);

//   const [activeTab, setActiveTab] = useState('signup');
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     password: '',
//     confirmPassword: '',
//     role: '',
//     otp: '',
//     newPassword: '',
//     confirmNewPassword: '',
//     // BlookForce agent specific fields
//     address: '',
//     city: '',
//     pincode: '',
//     occupation: '',
//     workingHours: '',
//     blookforceCode: ''
//   });
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [forgotPasswordStep, setForgotPasswordStep] = useState(1);

//   const API_URL = 'http://localhost:5000/api/auth';

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token && !user) {
//       axios
//         .get(`${API_URL}/me`, {
//           headers: { Authorization: `Bearer ${token}` },
//         })
//         .then((res) => {
//           dispatch(setUser(res.data.user));
//           dispatch(setToken(token));
//         })
//         .catch((err) => {
//           console.error('Failed to restore session:', err);
//           localStorage.removeItem('token');
//         });
//     }
//   }, [dispatch, user]);

//   useEffect(() => {
//     if (user?.role) {
//       const roleDashboard = {
//         space_owner: '/dashboard/spaceowner',
//         brand: '/dashboard/brand',
//         blookforceagent: '/dashboard/blookforceagent',
//         vendor: '/dashboard/vendor',
//         admin: '/dashboard/admin',
//       };
//       const route = roleDashboard[user.role.toLowerCase()];
//       if (route) {
//         navigate(route);
//       } else {
//         setError('Invalid role');
//       }
//     }
//   }, [user, navigate]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);
//     try {
//       const response = await axios.post(`${API_URL}/login`, {
//         email: formData.email,
//         password: formData.password,
//       });
//       console.log(response.data)

//       const userData = {
//         email: response.data.user.email,
//         name: response.data.user.name,
//         role: response.data.user.role,
//         token: response.data.user.token,
//         id: response.data.user.id,
//       };

//       if (!userData.name || !userData.role || !userData.token || !userData.email) {
//         throw new Error('Missing required fields in API response');
//       }

//       dispatch(setUser(userData));
//       localStorage.setItem('token', userData.token);
//       toast.success('Login successful!');
//       navigate('/dashboard');
//     } catch (err) {
//       const message = err.response?.data?.message || err.message || 'Login failed';
//       setError(message);
//       toast.error(message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');
//     setLoading(true);

//     try {
//       if (activeTab === 'signup') {
//         if (formData.password !== formData.confirmPassword) {
//           throw new Error('Passwords do not match');
//         }

//         const signupData = {
//           name: formData.name,
//           email: formData.email,
//           phone: formData.phone,
//           password: formData.password,
//           role: formData.role,
//         };

//         // Add BlookForce agent specific fields if role is BlookForceAgent
//         if (formData.role === 'BlookForceAgent') {
//           signupData.address = formData.address;
//           signupData.city = formData.city;
//           signupData.pincode = formData.pincode;
//           signupData.occupation = formData.occupation;
//           signupData.workingHours = formData.workingHours;
//         }

//         const response = await axios.post(`${API_URL}/register`, signupData);
//         setSuccess('Account created successfully!');
//         toast.success('Account created successfully!');
        
//         // If BlookForce agent, show their code
//         if (formData.role === 'BlookForceAgent' && response.data.user.blookforceCode) {
//           toast.info(`Your BlookForce Code: ${response.data.user.blookforceCode}`);
//         }
        
//         setActiveTab('login');
//       } else if (activeTab === 'login') {
//         handleLogin(e);
//       } else if (activeTab === 'forgot') {
//         if (forgotPasswordStep === 1) {
//           const response = await axios.post(`${API_URL}/send-otp`, {
//             email: formData.email,
//           });
//           toast.success('OTP sent to your email!');
//           setForgotPasswordStep(2);
//         } else if (forgotPasswordStep === 2) {
//           const response = await axios.post(`${API_URL}/verify-otp`, {
//             email: formData.email,
//             otp: formData.otp,
//           });
//           toast.success('OTP verified!');
//           if (response.data?.resetToken) {
//             dispatch(setResetToken(response.data.resetToken));
//           }
//           setForgotPasswordStep(3);
//         } else if (forgotPasswordStep === 3) {
//           if (formData.newPassword !== formData.confirmNewPassword) {
//             throw new Error('New passwords do not match');
//           }

//           const response = await axios.post(`${API_URL}/reset-password`, {
//             resetToken,
//             newPassword: formData.newPassword,
//           });
//           toast.success('Password changed successfully!');
//           setActiveTab('login');
//           setForgotPasswordStep(1);
//         }
//       }
//     } catch (err) {
//       const message = err.response?.data?.message || err.message || 'An error occurred';
//       setError(message);
//       toast.error(message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-gray-50 flex text-black placeholder:text-black flex-col justify-center py-12 sm:px-6 lg:px-8">
//         <div className="sm:mx-auto sm:w-full sm:max-w-md">
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             {activeTab === 'signup' ? 'Create Account' :
//              activeTab === 'login' ? 'Welcome Back' :
//              'Reset Password'}
//           </h2>
//           <p className="mt-2 text-center text-sm text-gray-600">
//             {activeTab === 'signup'
//               ? 'Join BlookMySpace to list spaces or find the perfect location for your brand'
//               : activeTab === 'login'
//               ? 'Sign in to your account to continue'
//               : 'Enter your email to reset your password'}
//           </p>
//         </div>

//         <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//           <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//             {error && (
//               <div className="mb-4 text-red-600 text-sm text-center">
//                 {error}
//               </div>
//             )}
//             {success && (
//               <div className="mb-4 text-green-600 text-sm text-center">
//                 {success}
//               </div>
//             )}

//             <div className="flex border-b mb-6">
//               <button
//                 onClick={() => {
//                   setActiveTab('signup');
//                   setForgotPasswordStep(1);
//                 }}
//                 className={`py-2 px-4 font-medium text-sm ${activeTab === 'signup' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
//               >
//                 Sign Up
//               </button>
//               <button
//                 onClick={() => {
//                   setActiveTab('login');
//                   setForgotPasswordStep(1);
//                 }}
//                 className={`py-2 px-4 font-medium text-sm ${activeTab === 'login' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
//               >
//                 Login
//               </button>
//               <button
//                 onClick={() => {
//                   setActiveTab('forgot');
//                   setForgotPasswordStep(1);
//                 }}
//                 className={`py-2 px-4 font-medium text-sm ${activeTab === 'forgot' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
//               >
//                 Forgot Password
//               </button>  
//             </div>

//             <form className="space-y-6" onSubmit={handleSubmit}>
//               {activeTab === 'signup' && (
//                 <>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">I am a</label>
//                     <select
//                       name="role"
//                       value={formData.role}
//                       onChange={handleChange}
//                       required
//                       className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
//                     >
//                       <option value="" disabled>Select account type</option>
//                       <option value="space_owner">Space Owner</option>
//                       <option value="brand">Brands</option>
//                       <option value="BlookForceAgent">BlookForce agents</option>
//                       <option value="Vendor">Vendor</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//                       Name
//                     </label>
//                     <input
//                       id="name"
//                       name="name"
//                       type="text"
//                       required
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                       value={formData.name}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </>
//               )}

//               {(activeTab === 'signup' || activeTab === 'login' || (activeTab === 'forgot' && forgotPasswordStep === 1)) && (
//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                     Email
//                   </label>
//                   <input
//                     id="email"
//                     name="email"
//                     type="email"
//                     autoComplete="email"
//                     required
//                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                     placeholder="name@example.com"
//                     value={formData.email}
//                     onChange={handleChange}
//                   />
//                 </div>
//               )}

//               {activeTab === 'forgot' && forgotPasswordStep === 2 && (
//                 <div>
//                   <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
//                     Enter OTP
//                   </label>
//                   <input
//                     id="otp"
//                     name="otp"
//                     type="text"
//                     required
//                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                     placeholder="Enter 6-digit OTP"
//                     value={formData.otp}
//                     onChange={handleChange}
//                   />
//                   <p className="mt-2 text-sm text-gray-500">
//                     We've sent a 6-digit OTP to your email. Please check your inbox.
//                   </p>
//                 </div>
//               )}

//               {activeTab === 'forgot' && forgotPasswordStep === 3 && (
//                 <>
//                   <div>
//                     <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
//                       New Password
//                     </label>
//                     <input
//                       id="newPassword"
//                       name="newPassword"
//                       type="password"
//                       required
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                       value={formData.newPassword}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700">
//                       Confirm New Password
//                     </label>
//                     <input
//                       id="confirmNewPassword"
//                       name="confirmNewPassword"
//                       type="password"
//                       required
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                       value={formData.confirmNewPassword}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </>
//               )}

//               {activeTab === 'signup' && (
//                 <div>
//                   <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
//                     Phone Number
//                   </label>
//                   <input
//                     id="phone"
//                     name="phone"
//                     type="tel"
//                     required
//                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                     value={formData.phone}
//                     onChange={handleChange}
//                   />
//                 </div>
//               )}

//               {(activeTab === 'signup' || activeTab === 'login') && (
//                 <div>
//                   <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                     Password
//                   </label>
//                   <input
//                     id="password"
//                     name="password"
//                     type="password"
//                     required
//                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                     value={formData.password}
//                     onChange={handleChange}
//                   />
//                 </div>
//               )}

//               {activeTab === 'signup' && (
//                 <div>
//                   <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
//                     Confirm Password
//                   </label>
//                   <input
//                     id="confirmPassword"
//                     name="confirmPassword"
//                     type="password"
//                     required
//                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                   />
//                 </div>
//               )}

//               {/* BlookForce Agent Specific Fields */}
//               {activeTab === 'signup' && formData.role === 'BlookForceAgent' && (
//                 <>
//                   <div>
//                     <label htmlFor="address" className="block text-sm font-medium text-gray-700">
//                       Address
//                     </label>
//                     <input
//                       id="address"
//                       name="address"
//                       type="text"
//                       required
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                       value={formData.address}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label htmlFor="city" className="block text-sm font-medium text-gray-700">
//                         City
//                       </label>
//                       <input
//                         id="city"
//                         name="city"
//                         type="text"
//                         required
//                         className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                         value={formData.city}
//                         onChange={handleChange}
//                       />
//                     </div>
//                     <div>
//                       <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
//                         Pin Code
//                       </label>
//                       <input
//                         id="pincode"
//                         name="pincode"
//                         type="text"
//                         required
//                         className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                         value={formData.pincode}
//                         onChange={handleChange}
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label htmlFor="occupation" className="block text-sm font-medium text-gray-700">
//                       Occupation
//                     </label>
//                     <select
//                       id="occupation"
//                       name="occupation"
//                       required
//                       className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
//                       value={formData.occupation}
//                       onChange={handleChange}
//                     >
//                       <option value="" disabled>Select your occupation</option>
//                       <option value="student">Student</option>
//                       <option value="freelancer">Freelancer</option>
//                       <option value="professional">Working Professional</option>
//                       <option value="other">Other</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label htmlFor="workingHours" className="block text-sm font-medium text-gray-700">
//                       Available Working Hours
//                     </label>
//                     <input
//                       id="workingHours"
//                       name="workingHours"
//                       type="text"
//                       required
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                       placeholder="e.g., 9am-5pm, Weekdays"
//                       value={formData.workingHours}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </>
//               )}

//               <div>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//                 >
//                   {loading
//                     ? 'Processing...'
//                     : activeTab === 'signup'
//                     ? 'Create Account'
//                     : activeTab === 'login'
//                     ? 'Sign In'
//                     : forgotPasswordStep === 1
//                     ? 'Send OTP'
//                     : forgotPasswordStep === 2
//                     ? 'Verify OTP'
//                     : 'Reset Password'}
//                 </button>
//               </div>

//               {(activeTab === 'signup' || activeTab === 'login') && (
//                 <div className="space-y-4">
//                   <div className="relative">
//                     <div className="absolute inset-0 flex items-center">
//                       <div className="w-full border-t border-gray-300"></div>
//                     </div>
//                     <div className="relative flex justify-center text-sm">
//                       <span className="px-2 bg-white text-gray-500">OR</span>
//                     </div>
//                   </div>
//                   <GoogleLoginButton 
//                     text={activeTab === 'signup' ? 'Sign up with Google' : 'Sign in with Google'}
//                   />
//                 </div>
//               )}

//               {activeTab === 'login' && (
//                 <div className="text-center">
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setActiveTab('forgot');
//                       setForgotPasswordStep(1);
//                     }}
//                     className="text-sm text-blue-600 hover:text-blue-800"
//                   >
//                     Forgot your password?
//                   </button>
//                 </div>
//               )}

//               {activeTab === 'forgot' && forgotPasswordStep > 1 && (
//                 <div className="text-center">
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setForgotPasswordStep(1);
//                       setFormData({
//                         ...formData,
//                         otp: '',
//                         newPassword: '',
//                         confirmNewPassword: '',
//                       });
//                     }}
//                     className="text-sm text-blue-600 hover:text-blue-800"
//                   >
//                     Back to email entry
//                   </button>
//                 </div>
//               )}
//             </form>
//           </div>
//         </div>
//       </div>
//       <ToastContainer position="bottom-right" autoClose={5000} />
//     </>
//   );
// };

// export default Login;
// src/pages/Login.js
// src/pages/Login.js
// src/pages/Login.jsx
// src/pages/Login.jsx
// src/pages/Login.jsx
// import React, { useState, useEffect, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setUser } from '../redux/userSlice';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Navbar from '../components/Navbar';
// import GoogleLoginButton from '../components/GoogleLoginButton';

// const Login = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const user = useSelector((state) => state.user);
//   const resetToken = useSelector((state) => state.user.resetToken);

//   const [activeTab, setActiveTab] = useState('signup');
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     password: '',
//     confirmPassword: '',
//     role: '',
//     dateOfBirth: '',
//     address: '',
//     city: '',
//     pincode: '',
//     occupation: '',
//     workingHours: '',
//     bankDetails: {
//       accountNumber: '',
//       ifscCode: '',
//       bankName: '',
//       accountHolderName: '',
//     },
//     referredBy: '',
//     companyName: '',
//     onboardingTarget: '',
//     otp: '',
//     newPassword: '',
//     confirmNewPassword: '',
//     blookforceCode: '',
//   });
//   const [idProofFile, setIdProofFile] = useState(null);
//   const [idProofBase64, setIdProofBase64] = useState(null);
//   const [showCamera, setShowCamera] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [forgotPasswordStep, setForgotPasswordStep] = useState(1);

//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [stream, setStream] = useState(null);

//   const API_URL = 'http://localhost:5000/api';

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token && !user) {
//       axios
//         .get(`${API_URL}/auth/me`, {
//           headers: { Authorization: `Bearer ${token}` },
//         })
//         .then((res) => {
//           dispatch(setUser(res.data.user));
//           localStorage.setItem('token', token);
//         })
//         .catch((err) => {
//           console.error('Failed to restore session:', err);
//           localStorage.removeItem('token');
//         });
//     }
//   }, [dispatch, user]);

//   useEffect(() => {
//     if (user?.role) {
//       const roleDashboard = {
//         space_owner: '/dashboard/spaceowner',
//         brand: '/dashboard/brand',
//         blookforce_agent: '/dashboard/blookforceagent',
//         vendor: '/dashboard/vendor',
//         telecaller: '/dashboard/telecaller',
//         admin: '/dashboard/admin',
//       };
//       const route = roleDashboard[user.role.toLowerCase()];
//       if (route) {
//         navigate(route);
//       } else {
//         setError('Invalid role');
//       }
//     }
//   }, [user, navigate]);

//   // Start camera
//   const startCamera = async () => {
//     try {
//       const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
//       setStream(mediaStream);
//       if (videoRef.current) {
//         videoRef.current.srcObject = mediaStream;
//       }
//       setShowCamera(true);
//     } catch (err) {
//       console.error('Error accessing camera:', err);
//       toast.error('Failed to access camera. Please allow camera access or upload a file.');
//     }
//   };

//   // Stop camera
//   const stopCamera = () => {
//     if (stream) {
//       stream.getTracks().forEach(track => track.stop());
//       setStream(null);
//     }
//     setShowCamera(false);
//   };

//   // Capture photo from camera
//   const capturePhoto = () => {
//     if (!videoRef.current || !canvasRef.current) {
//       toast.error('Camera not ready. Please try again.');
//       return;
//     }

//     const video = videoRef.current;
//     const canvas = canvasRef.current;
//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;
//     const ctx = canvas.getContext('2d');
//     ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

//     // Convert to file and Base64
//     canvas.toBlob((blob) => {
//       if (blob) {
//         const file = new File([blob], 'idProof.jpg', { type: 'image/jpeg' });
//         setIdProofFile(file);

//         // Convert to Base64
//         const reader = new FileReader();
//         reader.onloadend = () => {
//           setIdProofBase64(reader.result);
//           toast.success('Photo captured successfully!');
//         };
//         reader.onerror = () => {
//           toast.error('Failed to convert photo to Base64.');
//         };
//         reader.readAsDataURL(file);

//         stopCamera();
//       } else {
//         toast.error('Failed to capture photo. Please try again.');
//       }
//     }, 'image/jpeg');
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name.startsWith('bankDetails.')) {
//       const field = name.split('.')[1];
//       setFormData({
//         ...formData,
//         bankDetails: {
//           ...formData.bankDetails,
//           [field]: value,
//         },
//       });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     const file = files[0];
//     if (file) {
//       if (!file.type.startsWith('image/')) {
//         toast.error('Please upload a valid image file (e.g., JPG, PNG).');
//         return;
//       }
//       if (name === 'idProof') {
//         setIdProofFile(file);
//         stopCamera();

//         // Convert to Base64
//         const reader = new FileReader();
//         reader.onloadend = () => {
//           setIdProofBase64(reader.result);
//           toast.success('ID proof uploaded successfully!');
//         };
//         reader.onerror = () => {
//           toast.error('Failed to convert ID proof to Base64.');
//         };
//         reader.readAsDataURL(file);
//       }
//     }
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);
//     try {
//       const response = await axios.post(`${API_URL}/auth/login`, {
//         email: formData.email,
//         password: formData.password,
//       });
//       console.log('Login response:', response.data);

//       const userData = {
//         email: response.data.data.user.email,
//         name: response.data.data.user.name,
//         role: response.data.data.user.role,
//         token: response.data.token,
//         id: response.data.data.user.id,
//       };

//       if (!userData.name || !userData.role || !userData.token || !userData.email) {
//         throw new Error('Missing required fields in API response');
//       }

//       dispatch(setUser(userData));
//       localStorage.setItem('token', userData.token);
//       toast.success('Login successful!');
//       navigate('/dashboard');
//     } catch (err) {
//       const message = err.response?.data?.error?.message || err.message || 'Login failed';
//       setError(message);
//       toast.error(message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');
//     setLoading(true);

//     try {
//       if (activeTab === 'signup') {
//         if (formData.password !== formData.confirmPassword) {
//           throw new Error('Passwords do not match');
//         }

//         const dobRegex = /^\d{4}-\d{2}-\d{2}$/;
//         if (!dobRegex.test(formData.dateOfBirth)) {
//           throw new Error('Date of birth must be in YYYY-MM-DD format');
//         }

//         if (formData.role === 'blookforce_agent' && !idProofBase64) {
//           throw new Error('Please upload or capture your Aadhaar/PAN card photo.');
//         }

//         // Validate bank details for roles that require them (excluding space_owner)
//         const rolesRequiringBankDetails = ['blookforce_agent', 'telecaller', 'vendor', 'brand'];
//         if (rolesRequiringBankDetails.includes(formData.role)) {
//           const { accountNumber, ifscCode, bankName, accountHolderName } = formData.bankDetails;
//           if (!accountNumber || accountNumber.trim() === '') {
//             throw new Error('Bank account number is required');
//           }
//           if (!ifscCode || ifscCode.trim() === '') {
//             throw new Error('IFSC code is required');
//           }
//           if (!bankName || bankName.trim() === '') {
//             throw new Error('Bank name is required');
//           }
//           if (!accountHolderName || accountHolderName.trim() === '') {
//             throw new Error('Account holder name is required');
//           }
//         }

//         const signupData = {
//           name: formData.name,
//           email: formData.email,
//           phone: formData.phone,
//           password: formData.password,
//           role: formData.role,
//           dateOfBirth: formData.dateOfBirth,
//         };

//         // Add optional fields only if they have values
//         if (formData.referredBy && formData.referredBy.trim() !== '') {
//           signupData.referredBy = formData.referredBy;
//         }
//         if (formData.companyName && formData.companyName.trim() !== '') {
//           signupData.companyName = formData.companyName;
//         }
//         if (formData.onboardingTarget && !isNaN(formData.onboardingTarget) && formData.onboardingTarget.trim() !== '') {
//           signupData.onboardingTarget = parseInt(formData.onboardingTarget, 10);
//         }

//         if (formData.role === 'blookforce_agent') {
//           signupData.address = formData.address;
//           signupData.city = formData.city;
//           signupData.pincode = formData.pincode;
//           signupData.occupation = formData.occupation;
//           signupData.workingHours = formData.workingHours;
//           signupData.bankDetails = formData.bankDetails;
//           signupData.idProofBase64 = idProofBase64;
//         }

//         // Add bank details only for roles that require it during signup
//         if (['telecaller', 'vendor', 'brand'].includes(formData.role)) {
//           signupData.bankDetails = formData.bankDetails;
//         }

//         console.log('Signup data:', signupData);

//         const response = await axios.post(`${API_URL}/users`, signupData, {
//           headers: { 'Content-Type': 'application/json' },
//         });
//         console.log('Signup response:', response.data);
//         setSuccess('Account created successfully!');
//         toast.success('Account created successfully!');

//         if (['blookforce_agent', 'telecaller'].includes(formData.role) && response.data.data.user.blookforceCode) {
//           toast.info(`Your Code: ${response.data.data.user.blookforceCode}`);
//         }

//         setActiveTab('login');
//       } else if (activeTab === 'login') {
//         handleLogin(e);
//       } else if (activeTab === 'forgot') {
//         if (forgotPasswordStep === 1) {
//           const response = await axios.post(`${API_URL}/auth/forgot-password`, {
//             email: formData.email,
//           });
//           toast.success('OTP sent to your email!');
//           setForgotPasswordStep(2);
//         } else if (forgotPasswordStep === 2) {
//           const response = await axios.post(`${API_URL}/auth/reset-password`, {
//             email: formData.email,
//             otp: formData.otp,
//             newPassword: formData.newPassword,
//           });
//           toast.success('Password reset successfully!');
//           setActiveTab('login');
//           setForgotPasswordStep(1);
//         }
//       }
//     } catch (err) {
//       const message = err.response?.data?.error?.message || err.message || 'An error occurred';
//       setError(message);
//       toast.error(message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-gray-50 flex text-black placeholder:text-black flex-col justify-center py-12 sm:px-6 lg:px-8">
//         <div className="sm:mx-auto sm:w-full sm:max-w-md">
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             {activeTab === 'signup' ? 'Create Account' :
//              activeTab === 'login' ? 'Welcome Back' :
//              'Reset Password'}
//           </h2>
//           <p className="mt-2 text-center text-sm text-gray-600">
//             {activeTab === 'signup'
//               ? 'Join BlookMySpace to list spaces or find the perfect location for your brand'
//               : activeTab === 'login'
//               ? 'Sign in to your account to continue'
//               : 'Enter your email to reset your password'}
//           </p>
//         </div>

//         <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//           <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//             {error && (
//               <div className="mb-4 text-red-600 text-sm text-center">
//                 {error}
//               </div>
//             )}
//             {success && (
//               <div className="mb-4 text-green-600 text-sm text-center">
//                 {success}
//               </div>
//             )}

//             <div className="flex border-b mb-6">
//               <button
//                 onClick={() => {
//                   setActiveTab('signup');
//                   setForgotPasswordStep(1);
//                 }}
//                 className={`py-2 px-4 font-medium text-sm ${activeTab === 'signup' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
//               >
//                 Sign Up
//               </button>
//               <button
//                 onClick={() => {
//                   setActiveTab('login');
//                   setForgotPasswordStep(1);
//                 }}
//                 className={`py-2 px-4 font-medium text-sm ${activeTab === 'login' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
//               >
//                 Login
//               </button>
//               <button
//                 onClick={() => {
//                   setActiveTab('forgot');
//                   setForgotPasswordStep(1);
//                 }}
//                 className={`py-2 px-4 font-medium text-sm ${activeTab === 'forgot' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
//               >
//                 Forgot Password
//               </button>
//             </div>

//             <form className="space-y-6" onSubmit={handleSubmit}>
//               {activeTab === 'signup' && (
//                 <>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">I am a</label>
//                     <select
//                       name="role"
//                       value={formData.role}
//                       onChange={handleChange}
//                       required
//                       className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
//                     >
//                       <option value="" disabled>Select account type</option>
//                       <option value="space_owner">Space Owner - For listing spaces</option>
//                       <option value="brand">Brand - For booking spaces</option>
//                       <option value="blookforce_agent">BlookForce Agent - For managing space listings</option>
//                       <option value="vendor">Vendor - For providing services</option>
//                       <option value="telecaller">Telecaller - For sales and leads</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//                       Name
//                     </label>
//                     <input
//                       id="name"
//                       name="name"
//                       type="text"
//                       required
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                       value={formData.name}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div>
//                     <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
//                       Date of Birth
//                     </label>
//                     <input
//                       id="dateOfBirth"
//                       name="dateOfBirth"
//                       type="date"
//                       required
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                       value={formData.dateOfBirth}
//                       onChange={handleChange}
//                       max={new Date().toISOString().split('T')[0]}
//                     />
//                   </div>

//                   <div>
//                     <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                       Email
//                     </label>
//                     <input
//                       id="email"
//                       name="email"
//                       type="email"
//                       autoComplete="email"
//                       required
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                       placeholder="name@example.com"
//                       value={formData.email}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div>
//                     <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
//                       Phone Number
//                     </label>
//                     <input
//                       id="phone"
//                       name="phone"
//                       type="tel"
//                       required
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                       value={formData.phone}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div>
//                     <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                       Password
//                     </label>
//                     <input
//                       id="password"
//                       name="password"
//                       type="password"
//                       required
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                       value={formData.password}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div>
//                     <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
//                       Confirm Password
//                     </label>
//                     <input
//                       id="confirmPassword"
//                       name="confirmPassword"
//                       type="password"
//                       required
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                       value={formData.confirmPassword}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div>
//                     <label htmlFor="referredBy" className="block text-sm font-medium text-gray-700">
//                       Referred By (Optional)
//                     </label>
//                     <input
//                       id="referredBy"
//                       name="referredBy"
//                       type="text"
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                       value={formData.referredBy}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div>
//                     <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
//                       Company Name (Optional)
//                     </label>
//                     <input
//                       id="companyName"
//                       name="companyName"
//                       type="text"
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                       value={formData.companyName}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div>
//                     <label htmlFor="onboardingTarget" className="block text-sm font-medium text-gray-700">
//                       Onboarding Target (Optional)
//                     </label>
//                     <input
//                       id="onboardingTarget"
//                       name="onboardingTarget"
//                       type="number"
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                       value={formData.onboardingTarget}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </>
//               )}

//               {(activeTab === 'login' || (activeTab === 'forgot' && forgotPasswordStep === 1)) && (
//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                     Email
//                   </label>
//                   <input
//                     id="email"
//                     name="email"
//                     type="email"
//                     autoComplete="email"
//                     required
//                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                     placeholder="name@example.com"
//                     value={formData.email}
//                     onChange={handleChange}
//                   />
//                 </div>
//               )}

//               {activeTab === 'forgot' && forgotPasswordStep === 2 && (
//                 <div>
//                   <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
//                     Enter OTP
//                   </label>
//                   <input
//                     id="otp"
//                     name="otp"
//                     type="text"
//                     required
//                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                     placeholder="Enter 6-digit OTP"
//                     value={formData.otp}
//                     onChange={handleChange}
//                   />
//                   <p className="mt-2 text-sm text-gray-500">
//                     We've sent a 6-digit OTP to your email. Please check your inbox.
//                   </p>
//                 </div>
//               )}

//               {activeTab === 'forgot' && forgotPasswordStep === 3 && (
//                 <>
//                   <div>
//                     <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
//                       New Password
//                     </label>
//                     <input
//                       id="newPassword"
//                       name="newPassword"
//                       type="password"
//                       required
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                       value={formData.newPassword}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700">
//                       Confirm New Password
//                     </label>
//                     <input
//                       id="confirmNewPassword"
//                       name="confirmNewPassword"
//                       type="password"
//                       required
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                       value={formData.confirmNewPassword}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </>
//               )}

//               {(activeTab === 'login') && (
//                 <div>
//                   <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                     Password
//                   </label>
//                   <input
//                     id="password"
//                     name="password"
//                     type="password"
//                     required
//                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                     value={formData.password}
//                     onChange={handleChange}
//                   />
//                 </div>
//               )}

//               {activeTab === 'signup' && formData.role === 'blookforce_agent' && (
//                 <>
//                   <div>
//                     <label htmlFor="address" className="block text-sm font-medium text-gray-700">
//                       Address
//                     </label>
//                     <input
//                       id="address"
//                       name="address"
//                       type="text"
//                       required
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                       value={formData.address}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label htmlFor="city" className="block text-sm font-medium text-gray-700">
//                         City
//                       </label>
//                       <input
//                         id="city"
//                         name="city"
//                         type="text"
//                         required
//                         className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                         value={formData.city}
//                         onChange={handleChange}
//                       />
//                     </div>
//                     <div>
//                       <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
//                         Pin Code
//                       </label>
//                       <input
//                         id="pincode"
//                         name="pincode"
//                         type="text"
//                         required
//                         className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                         value={formData.pincode}
//                         onChange={handleChange}
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label htmlFor="occupation" className="block text-sm font-medium text-gray-700">
//                       Occupation
//                     </label>
//                     <select
//                       id="occupation"
//                       name="occupation"
//                       required
//                       className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
//                       value={formData.occupation}
//                       onChange={handleChange}
//                     >
//                       <option value="" disabled>Select your occupation</option>
//                       <option value="student">Student</option>
//                       <option value="freelancer">Freelancer</option>
//                       <option value="professional">Working Professional</option>
//                       <option value="other">Other</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label htmlFor="workingHours" className="block text-sm font-medium text-gray-700">
//                       Available Working Hours
//                     </label>
//                     <input
//                       id="workingHours"
//                       name="workingHours"
//                       type="text"
//                       required
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                       placeholder="e.g., 9am-5pm, Weekdays"
//                       value={formData.workingHours}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div>
//                     <label htmlFor="idProof" className="block text-sm font-medium text-gray-700">
//                       Aadhaar or PAN Card Photo
//                     </label>
//                     <input
//                       id="idProof"
//                       name="idProof"
//                       type="file"
//                       accept="image/*"
//                       className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//                       onChange={handleFileChange}
//                     />
//                     {idProofFile && (
//                       <p className="mt-2 text-sm text-gray-600">Selected file: {idProofFile.name}</p>
//                     )}
//                   </div>

//                   <div className="flex justify-center">
//                     <button
//                       type="button"
//                       onClick={showCamera ? stopCamera : startCamera}
//                       className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                     >
//                       {showCamera ? 'Close Camera' : 'Capture Photo with Camera'}
//                     </button>
//                   </div>

//                   {showCamera && (
//                     <div className="mt-4">
//                       <video ref={videoRef} autoPlay className="w-full rounded-md" />
//                       <button
//                         type="button"
//                         onClick={capturePhoto}
//                         className="mt-2 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//                       >
//                         Capture Photo
//                       </button>
//                     </div>
//                   )}
//                   <canvas ref={canvasRef} style={{ display: 'none' }} />
//                 </>
//               )}

//               {activeTab === 'signup' && ['blookforce_agent', 'telecaller', 'vendor', 'brand'].includes(formData.role) && (
//                 <>
//                   <div className="text-sm font-medium text-gray-700">
//                     Necessary for Payments and Refunds
//                   </div>
//                   <div>
//                     <label htmlFor="bankDetails.accountNumber" className="block text-sm font-medium text-gray-700">
//                       Bank Account Number
//                     </label>
//                     <input
//                       id="bankDetails.accountNumber"
//                       name="bankDetails.accountNumber"
//                       type="text"
//                       required
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                       value={formData.bankDetails.accountNumber}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div>
//                     <label htmlFor="bankDetails.ifscCode" className="block text-sm font-medium text-gray-700">
//                       IFSC Code
//                     </label>
//                     <input
//                       id="bankDetails.ifscCode"
//                       name="bankDetails.ifscCode"
//                       type="text"
//                       required
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                       value={formData.bankDetails.ifscCode}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div>
//                     <label htmlFor="bankDetails.bankName" className="block text-sm font-medium text-gray-700">
//                       Bank Name
//                     </label>
//                     <input
//                       id="bankDetails.bankName"
//                       name="bankDetails.bankName"
//                       type="text"
//                       required
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                       value={formData.bankDetails.bankName}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div>
//                     <label htmlFor="bankDetails.accountHolderName" className="block text-sm font-medium text-gray-700">
//                       Account Holder Name
//                     </label>
//                     <input
//                       id="bankDetails.accountHolderName"
//                       name="bankDetails.accountHolderName"
//                       type="text"
//                       required
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                       value={formData.bankDetails.accountHolderName}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </>
//               )}

//               <div>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//                 >
//                   {loading
//                     ? 'Processing...'
//                     : activeTab === 'signup'
//                     ? 'Create Account'
//                     : activeTab === 'login'
//                     ? 'Sign In'
//                     : forgotPasswordStep === 1
//                     ? 'Send OTP'
//                     : forgotPasswordStep === 2
//                     ? 'Verify OTP'
//                     : 'Reset Password'}
//                 </button>
//               </div>

//               {(activeTab === 'signup' || activeTab === 'login') && (
//                 <div className="space-y-4">
//                   <div className="relative">
//                     <div className="absolute inset-0 flex items-center">
//                       <div className="w-full border-t border-gray-300"></div>
//                     </div>
//                     <div className="relative flex justify-center text-sm">
//                       <span className="px-2 bg-white text-gray-500">OR</span>
//                     </div>
//                   </div>
//                   <GoogleLoginButton 
//                     text={activeTab === 'signup' ? 'Sign up with Google' : 'Sign in with Google'}
//                   />
//                 </div>
//               )}

//               {activeTab === 'login' && (
//                 <div className="text-center">
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setActiveTab('forgot');
//                       setForgotPasswordStep(1);
//                     }}
//                     className="text-sm text-blue-600 hover:text-blue-800"
//                   >
//                     Forgot your password?
//                   </button>
//                 </div>
//               )}

//               {activeTab === 'forgot' && forgotPasswordStep > 1 && (
//                 <div className="text-center">
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setForgotPasswordStep(1);
//                       setFormData({
//                         ...formData,
//                         otp: '',
//                         newPassword: '',
//                         confirmNewPassword: '',
//                       });
//                     }}
//                     className="text-sm text-blue-600 hover:text-blue-800"
//                   >
//                     Back to email entry
//                   </button>
//                 </div>
//               )}
//             </form>
//           </div>
//         </div>
//       </div>
//       <ToastContainer position="bottom-right" autoClose={5000} />
//     </>
//   );
// };

// export default Login;




// // src/pages/Login.jsx
// import React, { useState, useEffect, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setUser } from '../redux/userSlice';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Navbar from '../components/Navbar';
// import GoogleLoginButton from '../components/GoogleLoginButton';

// const Login = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const user = useSelector((state) => state.user);
//   const resetToken = useSelector((state) => state.user.resetToken);

//   const [activeTab, setActiveTab] = useState('signup');
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     password: '',
//     confirmPassword: '',
//     role: '',
//     dateOfBirth: '',
//     address: '',
//     city: '',
//     pincode: '',
//     occupation: '',
//     workingHours: '',
//     bankDetails: {
//       accountNumber: '',
//       ifscCode: '',
//       bankName: '',
//       accountHolderName: '',
//     },
//     referredBy: '',
//     companyName: '',
//     onboardingTarget: '',
//     otp: '',
//     newPassword: '',
//     confirmNewPassword: '',
//     blookforceCode: '',
//   });
//   const [idProofFile, setIdProofFile] = useState(null);
//   const [idProofBase64, setIdProofBase64] = useState(null);
//   const [showCamera, setShowCamera] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [forgotPasswordStep, setForgotPasswordStep] = useState(1);

//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [stream, setStream] = useState(null);

//   const API_URL = 'http://localhost:5000/api';

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token && !user) {
//       axios
//         .get(`${API_URL}/auth/me`, {
//           headers: { Authorization: `Bearer ${token}` },
//         })
//         .then((res) => {
//           dispatch(setUser(res.data.user));
//           localStorage.setItem('token', token);
//         })
//         .catch((err) => {
//           console.error('Failed to restore session:', err);
//           localStorage.removeItem('token');
//         });
//     }
//   }, [dispatch, user]);

//   useEffect(() => {
//     if (user?.role) {
//       const roleDashboard = {
//         space_owner: '/dashboard/spaceowner',
//         brand: '/dashboard/brand',
//         blookforce_agent: '/dashboard/blookforceagent',
//         vendor: '/dashboard/vendor',
//         telecaller: '/dashboard/telecaller',
//         admin: '/dashboard/admin',
//       };
//       const route = roleDashboard[user.role.toLowerCase()];
//       if (route) {
//         navigate(route);
//       } else {
//         setError('Invalid role');
//       }
//     }
//   }, [user, navigate]);

//   // Start camera
//   const startCamera = async () => {
//     try {
//       const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
//       setStream(mediaStream);
//       if (videoRef.current) {
//         videoRef.current.srcObject = mediaStream;
//       }
//       setShowCamera(true);
//     } catch (err) {
//       console.error('Error accessing camera:', err);
//       toast.error('Failed to access camera. Please allow camera access or upload a file.');
//     }
//   };

//   // Stop camera
//   const stopCamera = () => {
//     if (stream) {
//       stream.getTracks().forEach(track => track.stop());
//       setStream(null);
//     }
//     setShowCamera(false);
//   };

//   // Capture photo from camera
//   const capturePhoto = () => {
//     if (!videoRef.current || !canvasRef.current) {
//       toast.error('Camera not ready. Please try again.');
//       return;
//     }

//     const video = videoRef.current;
//     const canvas = canvasRef.current;
//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;
//     const ctx = canvas.getContext('2d');
//     ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

//     // Convert to file and Base64
//     canvas.toBlob((blob) => {
//       if (blob) {
//         const file = new File([blob], 'idProof.jpg', { type: 'image/jpeg' });
//         setIdProofFile(file);

//         // Convert to Base64
//         const reader = new FileReader();
//         reader.onloadend = () => {
//           setIdProofBase64(reader.result);
//           toast.success('Photo captured successfully!');
//         };
//         reader.onerror = () => {
//           toast.error('Failed to convert photo to Base64.');
//         };
//         reader.readAsDataURL(file);

//         stopCamera();
//       } else {
//         toast.error('Failed to capture photo. Please try again.');
//       }
//     }, 'image/jpeg');
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name.startsWith('bankDetails.')) {
//       const field = name.split('.')[1];
//       setFormData({
//         ...formData,
//         bankDetails: {
//           ...formData.bankDetails,
//           [field]: value,
//         },
//       });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     const file = files[0];
//     if (file) {
//       if (!file.type.startsWith('image/')) {
//         toast.error('Please upload a valid image file (e.g., JPG, PNG).');
//         return;
//       }
//       if (name === 'idProof') {
//         setIdProofFile(file);
//         stopCamera();

//         // Convert to Base64
//         const reader = new FileReader();
//         reader.onloadend = () => {
//           setIdProofBase64(reader.result);
//           toast.success('ID proof uploaded successfully!');
//         };
//         reader.onerror = () => {
//           toast.error('Failed to convert ID proof to Base64.');
//         };
//         reader.readAsDataURL(file);
//       }
//     }
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);
//     try {
//       // Client-side validation
//       if (!formData.email || formData.email.trim() === '') {
//         throw new Error('Email is required');
//       }
//       if (!formData.password || formData.password.trim() === '') {
//         throw new Error('Password is required');
//       }

//       const response = await axios.post(`${API_URL}/auth/login`, {
//         email: formData.email,
//         password: formData.password,
//       });
//       console.log('Login response:', response.data);

//       const userData = {
//         email: response.data.data.user.email,
//         name: response.data.data.user.name,
//         role: response.data.data.user.role,
//         token: response.data.data.token,
//         id: response.data.data.user.id,
//       };

//       if (!userData.name || !userData.role || !userData.token || !userData.email || !userData.id) {
//         throw new Error('Missing required fields in API response');
//       }

//       dispatch(setUser(userData));
//       localStorage.setItem('token', userData.token);
//       toast.success('Login successful!');
//       navigate('/dashboard');
//     } catch (err) {
//       const message = err.response?.data?.error?.message || err.message || 'Login failed';
//       setError(message);
//       toast.error(message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');
//     setLoading(true);

//     try {
//       if (activeTab === 'signup') {
//         if (formData.password !== formData.confirmPassword) {
//           throw new Error('Passwords do not match');
//         }

//         const dobRegex = /^\d{4}-\d{2}-\d{2}$/;
//         if (!dobRegex.test(formData.dateOfBirth)) {
//           throw new Error('Date of birth must be in YYYY-MM-DD format');
//         }

//         if (formData.role === 'blookforce_agent' && !idProofBase64) {
//           throw new Error('Please upload or capture your Aadhaar/PAN card photo.');
//         }

//         // Validate bank details for roles that require them (excluding space_owner)
//         const rolesRequiringBankDetails = ['blookforce_agent', 'telecaller', 'vendor', 'brand'];
//         if (rolesRequiringBankDetails.includes(formData.role)) {
//           const { accountNumber, ifscCode, bankName, accountHolderName } = formData.bankDetails;
//           if (!accountNumber || accountNumber.trim() === '') {
//             throw new Error('Bank account number is required');
//           }
//           if (!ifscCode || ifscCode.trim() === '') {
//             throw new Error('IFSC code is required');
//           }
//           if (!bankName || bankName.trim() === '') {
//             throw new Error('Bank name is required');
//           }
//           if (!accountHolderName || accountHolderName.trim() === '') {
//             throw new Error('Account holder name is required');
//           }
//         }

//         const signupData = {
//           name: formData.name,
//           email: formData.email,
//           phone: formData.phone,
//           password: formData.password,
//           role: formData.role,
//           dateOfBirth: formData.dateOfBirth,
//         };

//         // Add optional fields only if they have values
//         if (formData.referredBy && formData.referredBy.trim() !== '') {
//           signupData.referredBy = formData.referredBy;
//         }
//         if (formData.companyName && formData.companyName.trim() !== '') {
//           signupData.companyName = formData.companyName;
//         }
//         if (formData.onboardingTarget && !isNaN(formData.onboardingTarget) && formData.onboardingTarget.trim() !== '') {
//           signupData.onboardingTarget = parseInt(formData.onboardingTarget, 10);
//         }

//         if (formData.role === 'blookforce_agent') {
//           signupData.address = formData.address;
//           signupData.city = formData.city;
//           signupData.pincode = formData.pincode;
//           signupData.occupation = formData.occupation;
//           signupData.workingHours = formData.workingHours;
//           signupData.bankDetails = formData.bankDetails;
//           signupData.idProofBase64 = idProofBase64;
//         }

//         if (['telecaller', 'vendor', 'brand'].includes(formData.role)) {
//           signupData.bankDetails = formData.bankDetails;
//         }

//         console.log('Signup data:', signupData);

//         const response = await axios.post(`${API_URL}/users`, signupData, {
//           headers: { 'Content-Type': 'application/json' },
//         });
//         console.log('Signup response:', response.data);
//         setSuccess('Account created successfully!');
//         toast.success('Account created successfully!');

//         if (['blookforce_agent', 'telecaller'].includes(formData.role) && response.data.data.user.blookforceCode) {
//           toast.info(`Your Code: ${response.data.data.user.blookforceCode}`);
//         }

//         setActiveTab('login');
//       } else if (activeTab === 'login') {
//         handleLogin(e);
//       } else if (activeTab === 'forgot') {
//         if (forgotPasswordStep === 1) {
//           // Client-side validation
//           if (!formData.email || formData.email.trim() === '') {
//             throw new Error('Email is required');
//           }

//           const response = await axios.post(`${API_URL}/auth/forgot-password`, {
//             email: formData.email,
//           });
//           toast.success('OTP sent to your email!');
//           setForgotPasswordStep(2);
//         } else if (forgotPasswordStep === 2) {
//           // Client-side validation
//           if (!formData.otp || formData.otp.trim() === '') {
//             throw new Error('OTP is required');
//           }
//           if (!formData.newPassword || formData.newPassword.trim() === '') {
//             throw new Error('New password is required');
//           }
//           if (formData.newPassword !== formData.confirmNewPassword) {
//             throw new Error('New password and confirm password do not match');
//           }

//           const response = await axios.post(`${API_URL}/auth/reset-password`, {
//             email: formData.email,
//             otp: formData.otp,
//             newPassword: formData.newPassword,
//           });
//           toast.success('Password reset successfully!');
//           setActiveTab('login');
//           setForgotPasswordStep(1);
//         }
//       }
//     } catch (err) {
//       const message = err.response?.data?.error?.message || err.message || 'An error occurred';
//       setError(message);
//       toast.error(message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-gray-50 flex text-black placeholder:text-black flex-col justify-center py-12 sm:px-6 lg:px-8">
//         <div className="sm:mx-auto sm:w-full sm:max-w-md">
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             {activeTab === 'signup' ? 'Create Account' :
//              activeTab === 'login' ? 'Welcome Back' :
//              'Reset Password'}
//           </h2>
//           <p className="mt-2 text-center text-sm text-gray-600">
//             {activeTab === 'signup'
//               ? 'Join BlookMySpace to list spaces or find the perfect location for your brand'
//               : activeTab === 'login'
//               ? 'Sign in to your account to continue'
//               : 'Enter your email to reset your password'}
//           </p>
//         </div>

//         <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//           <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//             {error && (
//               <div className="mb-4 text-red-600 text-sm text-center">
//                 {error}
//               </div>
//             )}
//             {success && (
//               <div className="mb-4 text-green-600 text-sm text-center">
//                 {success}
//               </div>
//             )}

//             <div className="flex border-b mb-6">
//               <button
//                 onClick={() => {
//                   setActiveTab('signup');
//                   setForgotPasswordStep(1);
//                 }}
//                 className={`py-2 px-4 font-medium text-sm ${activeTab === 'signup' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
//               >
//                 Sign Up
//               </button>
//               <button
//                 onClick={() => {
//                   setActiveTab('login');
//                   setForgotPasswordStep(1);
//                 }}
//                 className={`py-2 px-4 font-medium text-sm ${activeTab === 'login' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
//               >
//                 Login
//               </button>
//               <button
//                 onClick={() => {
//                   setActiveTab('forgot');
//                   setForgotPasswordStep(1);
//                 }}
//                 className={`py-2 px-4 font-medium text-sm ${activeTab === 'forgot' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
//               >
//                 Forgot Password
//               </button>
//             </div>

//             <form className="space-y-6" onSubmit={handleSubmit}>
//               {activeTab === 'signup' && (
//                 <>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">I am a</label>
//                     <select
//                       name="role"
//                       value={formData.role}
//                       onChange={handleChange}
//                       required
//                       className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
//                     >
//                       <option value="" disabled>Select account type</option>
//                       <option value="space_owner">Space Owner - For listing spaces</option>
//                       <option value="brand">Brand - For booking spaces</option>
//                       <option value="blookforce_agent">BlookForce Agent - For managing space listings</option>
//                       <option value="vendor">Vendor - For providing services</option>
//                       <option value="telecaller">Telecaller - For sales and leads</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//                       Name
//                     </label>
//                     <input
//                       id="name"
//                       name="name"
//                       type="text"
//                       required
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                       value={formData.name}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div>
//                     <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
//                       Date of Birth
//                     </label>
//                     <input
//                       id="dateOfBirth"
//                       name="dateOfBirth"
//                       type="date"
//                       required
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                       value={formData.dateOfBirth}
//                       onChange={handleChange}
//                       max={new Date().toISOString().split('T')[0]}
//                     />
//                   </div>

//                   <div>
//                     <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                       Email
//                     </label>
//                     <input
//                       id="email"
//                       name="email"
//                       type="email"
//                       autoComplete="email"
//                       required
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                       placeholder="name@example.com"
//                       value={formData.email}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div>
//                     <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
//                       Phone Number
//                     </label>
//                     <input
//                       id="phone"
//                       name="phone"
//                       type="tel"
//                       required
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                       value={formData.phone}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div>
//                     <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                       Password
//                     </label>
//                     <input
//                       id="password"
//                       name="password"
//                       type="password"
//                       required
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                       value={formData.password}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div>
//                     <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
//                       Confirm Password
//                     </label>
//                     <input
//                       id="confirmPassword"
//                       name="confirmPassword"
//                       type="password"
//                       required
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                       value={formData.confirmPassword}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div>
//                     <label htmlFor="referredBy" className="block text-sm font-medium text-gray-700">
//                       Referred By (Optional)
//                     </label>
//                     <input
//                       id="referredBy"
//                       name="referredBy"
//                       type="text"
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                       value={formData.referredBy}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div>
//                     <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
//                       Company Name (Optional)
//                     </label>
//                     <input
//                       id="companyName"
//                       name="companyName"
//                       type="text"
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                       value={formData.companyName}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div>
//                     <label htmlFor="onboardingTarget" className="block text-sm font-medium text-gray-700">
//                       Onboarding Target (Optional)
//                     </label>
//                     <input
//                       id="onboardingTarget"
//                       name="onboardingTarget"
//                       type="number"
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                       value={formData.onboardingTarget}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </>
//               )}

//               {(activeTab === 'login' || (activeTab === 'forgot' && forgotPasswordStep === 1)) && (
//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                     Email
//                   </label>
//                   <input
//                     id="email"
//                     name="email"
//                     type="email"
//                     autoComplete="email"
//                     required
//                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                     placeholder="name@example.com"
//                     value={formData.email}
//                     onChange={handleChange}
//                   />
//                 </div>
//               )}

//               {activeTab === 'forgot' && forgotPasswordStep === 2 && (
//                 <>
//                   <div>
//                     <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
//                       Enter OTP
//                     </label>
//                     <input
//                       id="otp"
//                       name="otp"
//                       type="text"
//                       required
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                       placeholder="Enter 6-digit OTP"
//                       value={formData.otp}
//                       onChange={handleChange}
//                     />
//                     <p className="mt-2 text-sm text-gray-500">
//                       We've sent a 6-digit OTP to your email. Please check your inbox.
//                     </p>
//                   </div>
//                   <div>
//                     <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
//                       New Password
//                     </label>
//                     <input
//                       id="newPassword"
//                       name="newPassword"
//                       type="password"
//                       required
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                       value={formData.newPassword}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700">
//                       Confirm New Password
//                     </label>
//                     <input
//                       id="confirmNewPassword"
//                       name="confirmNewPassword"
//                       type="password"
//                       required
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                       value={formData.confirmNewPassword}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </>
//               )}

//               {(activeTab === 'login') && (
//                 <div>
//                   <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                     Password
//                   </label>
//                   <input
//                     id="password"
//                     name="password"
//                     type="password"
//                     required
//                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                     value={formData.password}
//                     onChange={handleChange}
//                   />
//                 </div>
//               )}

//               {activeTab === 'signup' && formData.role === 'blookforce_agent' && (
//                 <>
//                   <div>
//                     <label htmlFor="address" className="block text-sm font-medium text-gray-700">
//                       Address
//                     </label>
//                     <input
//                       id="address"
//                       name="address"
//                       type="text"
//                       required
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                       value={formData.address}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label htmlFor="city" className="block text-sm font-medium text-gray-700">
//                         City
//                       </label>
//                       <input
//                         id="city"
//                         name="city"
//                         type="text"
//                         required
//                         className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                         value={formData.city}
//                         onChange={handleChange}
//                       />
//                     </div>
//                     <div>
//                       <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
//                         Pin Code
//                       </label>
//                       <input
//                         id="pincode"
//                         name="pincode"
//                         type="text"
//                         required
//                         className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                         value={formData.pincode}
//                         onChange={handleChange}
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label htmlFor="occupation" className="block text-sm font-medium text-gray-700">
//                       Occupation
//                     </label>
//                     <select
//                       id="occupation"
//                       name="occupation"
//                       required
//                       className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
//                       value={formData.occupation}
//                       onChange={handleChange}
//                     >
//                       <option value="" disabled>Select your occupation</option>
//                       <option value="student">Student</option>
//                       <option value="freelancer">Freelancer</option>
//                       <option value="professional">Working Professional</option>
//                       <option value="other">Other</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label htmlFor="workingHours" className="block text-sm font-medium text-gray-700">
//                       Available Working Hours
//                     </label>
//                     <input
//                       id="workingHours"
//                       name="workingHours"
//                       type="text"
//                       required
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                       placeholder="e.g., 9am-5pm, Weekdays"
//                       value={formData.workingHours}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div>
//                     <label htmlFor="idProof" className="block text-sm font-medium text-gray-700">
//                       Aadhaar or PAN Card Photo
//                     </label>
//                     <input
//                       id="idProof"
//                       name="idProof"
//                       type="file"
//                       accept="image/*"
//                       className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//                       onChange={handleFileChange}
//                     />
//                     {idProofFile && (
//                       <p className="mt-2 text-sm text-gray-600">Selected file: {idProofFile.name}</p>
//                     )}
//                   </div>

//                   <div className="flex justify-center">
//                     <button
//                       type="button"
//                       onClick={showCamera ? stopCamera : startCamera}
//                       className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                     >
//                       {showCamera ? 'Close Camera' : 'Capture Photo with Camera'}
//                     </button>
//                   </div>

//                   {showCamera && (
//                     <div className="mt-4">
//                       <video ref={videoRef} autoPlay className="w-full rounded-md" />
//                       <button
//                         type="button"
//                         onClick={capturePhoto}
//                         className="mt-2 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//                       >
//                         Capture Photo
//                       </button>
//                     </div>
//                   )}
//                   <canvas ref={canvasRef} style={{ display: 'none' }} />
//                 </>
//               )}

//               {activeTab === 'signup' && ['blookforce_agent', 'telecaller', 'vendor', 'brand'].includes(formData.role) && (
//                 <>
//                   <div className="text-sm font-medium text-gray-700">
//                     Necessary for Payments and Refunds
//                   </div>
//                   <div>
//                     <label htmlFor="bankDetails.accountNumber" className="block text-sm font-medium text-gray-700">
//                       Bank Account Number
//                     </label>
//                     <input
//                       id="bankDetails.accountNumber"
//                       name="bankDetails.accountNumber"
//                       type="text"
//                       required
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                       value={formData.bankDetails.accountNumber}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div>
//                     <label htmlFor="bankDetails.ifscCode" className="block text-sm font-medium text-gray-700">
//                       IFSC Code
//                     </label>
//                     <input
//                       id="bankDetails.ifscCode"
//                       name="bankDetails.ifscCode"
//                       type="text"
//                       required
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                       value={formData.bankDetails.ifscCode}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div>
//                     <label htmlFor="bankDetails.bankName" className="block text-sm font-medium text-gray-700">
//                       Bank Name
//                     </label>
//                     <input
//                       id="bankDetails.bankName"
//                       name="bankDetails.bankName"
//                       type="text"
//                       required
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                       value={formData.bankDetails.bankName}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div>
//                     <label htmlFor="bankDetails.accountHolderName" className="block text-sm font-medium text-gray-700">
//                       Account Holder Name
//                     </label>
//                     <input
//                       id="bankDetails.accountHolderName"
//                       name="bankDetails.accountHolderName"
//                       type="text"
//                       required
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                       value={formData.bankDetails.accountHolderName}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </>
//               )}

//               <div>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//                 >
//                   {loading
//                     ? 'Processing...'
//                     : activeTab === 'signup'
//                     ? 'Create Account'
//                     : activeTab === 'login'
//                     ? 'Sign In'
//                     : forgotPasswordStep === 1
//                     ? 'Send OTP'
//                     : 'Reset Password'}
//                 </button>
//               </div>

//               {(activeTab === 'signup' || activeTab === 'login') && (
//                 <div className="space-y-4">
//                   <div className="relative">
//                     <div className="absolute inset-0 flex items-center">
//                       <div className="w-full border-t border-gray-300"></div>
//                     </div>
//                     <div className="relative flex justify-center text-sm">
//                       <span className="px-2 bg-white text-gray-500">OR</span>
//                     </div>
//                   </div>
//                   <GoogleLoginButton 
//                     text={activeTab === 'signup' ? 'Sign up with Google' : 'Sign in with Google'}
//                   />
//                 </div>
//               )}

//               {activeTab === 'login' && (
//                 <div className="text-center">
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setActiveTab('forgot');
//                       setForgotPasswordStep(1);
//                     }}
//                     className="text-sm text-blue-600 hover:text-blue-800"
//                   >
//                     Forgot your password?
//                   </button>
//                 </div>
//               )}

//               {activeTab === 'forgot' && forgotPasswordStep > 1 && (
//                 <div className="text-center">
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setForgotPasswordStep(1);
//                       setFormData({
//                         ...formData,
//                         otp: '',
//                         newPassword: '',
//                         confirmNewPassword: '',
//                       });
//                     }}
//                     className="text-sm text-blue-600 hover:text-blue-800"
//                   >
//                     Back to email entry
//                   </button>
//                 </div>
//               )}
//             </form>
//           </div>
//         </div>
//       </div>
//       <ToastContainer position="bottom-right" autoClose={5000} />
//     </>
//   );
// };

// export default Login;



import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';
import GoogleLoginButton from '../components/GoogleLoginButton';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const [activeTab, setActiveTab] = useState('signup');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: '',
    dateOfBirth: '',
    address: { street: '', city: '', state: '', pincode: '', landmark: '' },
    contactPersonName: '',
    compliance: { gstNumber: '', panNumber: '', msmeCertificate: '', tradeLicense: '' },
    bankDetails: { accountNumber: '', ifscCode: '', bankName: '', accountHolderName: '' },
    notificationPreferences: { whatsapp: false, sms: false, email: true },
    referredBy: '',
    companyName: '',
    onboardingTarget: '',
    roleSpecificData: {
      blookforce_agent: { cityOfOperation: '', languagesSpoken: [], salesExperience: false, referralSource: '', availability: '', resume: '' },
      telecaller: { cityOfOperation: '', languagesSpoken: [], salesExperience: false, referralSource: '', availability: '' },
    },
    occupation: '',
    workingHours: '',
    otp: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [idProofBase64, setIdProofBase64] = useState(null);
  const [selfieWithIdBase64, setSelfieWithIdBase64] = useState(null);
  const [resumeBase64, setResumeBase64] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [forgotPasswordStep, setForgotPasswordStep] = useState(1);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [showCamera, setShowCamera] = useState({ idProof: false, selfie: false });

  const API_URL =  'http://localhost:5000/api';

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !user) {
      axios
        .get(`${API_URL}/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          dispatch(setUser(res.data.data.user));
          localStorage.setItem('token', token);
        })
        .catch((err) => {
          console.error('Failed to restore session:', err);
          localStorage.removeItem('token');
        });
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user?.role) {
      const roleDashboard = {
        space_owner: '/dashboard/spaceowner',
        brand: '/dashboard/brand',
        blookforce_agent: '/dashboard/blookforceagent',
        vendor: '/dashboard/vendor',
        telecaller: '/dashboard/telecaller',
        admin: '/dashboard/admin',
        telecaller:' /dashboard/telecaller',
      };
      const route = roleDashboard[user.role];
      if (route) navigate(route);
    }
  }, [user, navigate]);

  const startCamera = async (type) => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      if (videoRef.current) videoRef.current.srcObject = mediaStream;
      setShowCamera({ ...showCamera, [type]: true });
    } catch (err) {
      toast.error('Failed to access camera.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setShowCamera({ idProof: false, selfie: false });
  };

  const capturePhoto = (type) => {
    if (!videoRef.current || !canvasRef.current) {
      toast.error('Camera not ready.');
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], `${type}.jpg`, { type: 'image/jpeg' });
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Data = reader.result;
          if (type === 'idProof') {
            setIdProofBase64(base64Data);
            console.log('idProofBase64 set:', base64Data.substring(0, 50)); // Debug
          } else {
            setSelfieWithIdBase64(base64Data);
            console.log('selfieWithIdBase64 set:', base64Data.substring(0, 50)); // Debug
          }
          toast.success(`${type === 'idProof' ? 'ID proof' : 'Selfie'} captured!`);
        };
        reader.readAsDataURL(file);
        stopCamera();
      } else {
        toast.error('Failed to capture photo.');
      }
    }, 'image/jpeg');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes('.')) {
      const keys = name.split('.');
      if (keys.length === 2) {
        const [parent, child] = keys;
        setFormData({
          ...formData,
          [parent]: { ...formData[parent], [child]: type === 'checkbox' ? checked : value },
        });
      } else if (keys.length === 3) {
        const [parent, child, subChild] = keys;
        setFormData({
          ...formData,
          [parent]: {
            ...formData[parent],
            [child]: { ...formData[parent][child], [subChild]: type === 'checkbox' ? checked : value },
          },
        });
      }
    } else {
      setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    }
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (type === 'resume' && !file.type.match(/application\/(pdf|msword)|image\/.*/)) {
        toast.error('Please upload a PDF, Word document, or image for resume.');
        return;
      }
      if (type !== 'resume' && !file.type.startsWith('image/')) {
        toast.error('Please upload a valid image file.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result;
        if (type === 'idProof') {
          setIdProofBase64(base64Data);
          console.log('idProofBase64 set:', base64Data.substring(0, 50)); // Debug
        } else if (type === 'selfie') {
          setSelfieWithIdBase64(base64Data);
          console.log('selfieWithIdBase64 set:', base64Data.substring(0, 50)); // Debug
        } else {
          setResumeBase64(base64Data);
          setFormData({
            ...formData,
            roleSpecificData: {
              ...formData.roleSpecificData,
              blookforce_agent: {
                ...formData.roleSpecificData.blookforce_agent,
                resume: base64Data,
              },
            },
          });
          console.log('resumeBase64 set:', base64Data.substring(0, 50)); // Debug
        }
        toast.success(`${type === 'idProof' ? 'ID proof' : type === 'selfie' ? 'Selfie' : 'Resume'} uploaded!`);
      };
      reader.readAsDataURL(file);
      if (type !== 'resume') stopCamera();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (activeTab === 'signup') {
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match');
        }
        if (formData.role === 'blookforce_agent') {
          if (!formData.address.street) throw new Error('Street address is required');
          if (!formData.address.city) throw new Error('City is required');
          if (!formData.address.pincode) throw new Error('Pincode is required');
          if (!formData.occupation) throw new Error('Occupation is required');
          if (!formData.workingHours) throw new Error('Working hours are required');
          if (!idProofBase64 || !idProofBase64.startsWith('data:image/')) {
            throw new Error('Valid ID proof is required for BLookForce Agent');
          }
          if (!selfieWithIdBase64 || !selfieWithIdBase64.startsWith('data:image/')) {
            throw new Error('Valid selfie with ID is required for BLookForce Agent');
          }
        }

        const signupData = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          role: formData.role,
          dateOfBirth: formData.dateOfBirth,
          contactPersonName: formData.contactPersonName,
          address: formData.address,
          city: formData.address.city, // Map address.city to top-level city
          pincode: formData.address.pincode, // Map address.pincode to top-level pincode
          compliance: formData.compliance,
          bankDetails: ['blookforce_agent', 'telecaller', 'vendor', 'brand'].includes(formData.role) ? formData.bankDetails : null,
          notificationPreferences: formData.notificationPreferences,
          referredBy: formData.referredBy,
          companyName: formData.companyName,
          onboardingTarget: formData.onboardingTarget ? parseInt(formData.onboardingTarget) : undefined,
          idProofBase64: formData.role === 'blookforce_agent' ? idProofBase64 : undefined,
          selfieWithIdBase64: formData.role === 'blookforce_agent' ? selfieWithIdBase64 : undefined,
          roleSpecificData: {
            ...formData.roleSpecificData[formData.role],
            resume: formData.role === 'blookforce_agent' ? (resumeBase64 || '') : undefined,
          },
          occupation: formData.occupation,
          workingHours: formData.workingHours,
        };

        console.log('Signup data:', JSON.stringify(signupData, null, 2)); // Debug log

        const response = await axios.post(`http://localhost:5000/api/users`, signupData);
        setSuccess('Account created successfully!');
        toast.success('Account created successfully!');
        if (['blookforce_agent', 'telecaller'].includes(formData.role)) {
          toast.info(`Your Code: ${response.data.data.user.blookforceCode}`);
        }
        setActiveTab('login');
      } else if (activeTab === 'login') {
        const response = await axios.post(`http://localhost:5000/api/auth/login`, {
          email: formData.email,
          password: formData.password,
        });
        const userData = response.data.data.user;
        dispatch(setUser({ ...userData, token: response.data.data.token }));
        localStorage.setItem('token', response.data.data.token);
        toast.success('Login successful!');
        navigate('/dashboard');
      } else if (activeTab === 'forgot') {
        if (forgotPasswordStep === 1) {
          await axios.post(`http://localhost:5000/api/auth/forgot-password`, { email: formData.email });
          toast.success('OTP sent to your email!');
          setForgotPasswordStep(2);
        } else {
          if (formData.newPassword !== formData.confirmNewPassword) {
            throw new Error('Passwords do not match');
          }
          await axios.post(`http://localhost:5000/api/auth/reset-password`, {
            email: formData.email,
            otp: formData.otp,
            newPassword: formData.newPassword,
          });
          toast.success('Password reset successfully!');
          setActiveTab('login');
          setForgotPasswordStep(1);
        }
      }
    } catch (err) {
      const message = err.response?.data?.error?.message || err.message || 'An error occurred';
      setError(message);
      toast.error(message);
      console.error('Signup error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {activeTab === 'signup' ? 'Create Account' : activeTab === 'login' ? 'Welcome Back' : 'Reset Password'}
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {error && <div className="mb-4 text-red-600 text-sm text-center">{error}</div>}
            {success && <div className="mb-4 text-green-600 text-sm text-center">{success}</div>}

            <div className="flex border-b mb-6">
              {['signup', 'login', 'forgot'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => { setActiveTab(tab); setForgotPasswordStep(1); }}
                  className={`py-2 px-4 font-medium text-sm ${activeTab === tab ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
                >
                  {tab === 'signup' ? 'Sign Up' : tab === 'login' ? 'Login' : 'Forgot Password'}
                </button>
              ))}
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {activeTab === 'signup' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">I am a</label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
                    >
                      <option value="" disabled>Select account type</option>
                      <option value="space_owner">Space Owner</option>
                      <option value="brand">Brand</option>
                      <option value="vendor">Vendor</option>
                      <option value="blookforce_agent">BLookForce Agent</option>
                      <option value="telecaller">Telecaller</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      name="name"
                      type="text"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                    <input
                      name="dateOfBirth"
                      type="date"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      max={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      name="email"
                      type="email"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                      name="phone"
                      type="tel"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                      name="password"
                      type="password"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                    <input
                      name="confirmPassword"
                      type="password"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>
                  {formData.role === 'blookforce_agent' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Address</label>
                        <input
                          name="address.street"
                          type="text"
                          required
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          value={formData.address.street}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">City</label>
                          <input
                            name="address.city"
                            type="text"
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={formData.address.city}
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Pin Code</label>
                          <input
                            name="address.pincode"
                            type="text"
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={formData.address.pincode}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Occupation</label>
                        <select
                          name="occupation"
                          required
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
                          value={formData.occupation}
                          onChange={handleChange}
                        >
                          <option value="" disabled>Select your occupation</option>
                          <option value="student">Student</option>
                          <option value="freelancer">Freelancer</option>
                          <option value="professional">Working Professional</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Working Hours</label>
                        <input
                          name="workingHours"
                          type="text"
                          required
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          value={formData.workingHours}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">ID Proof (Aadhaar/PAN)</label>
                        <input
                          type="file"
                          accept="image/*"
                          required
                          onChange={(e) => handleFileChange(e, 'idProof')}
                          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Selfie with ID</label>
                        <input
                          type="file"
                          accept="image/*"
                          required
                          onChange={(e) => handleFileChange(e, 'selfie')}
                          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Resume (PDF/Word/Image)</label>
                        <input
                          type="file"
                          accept="application/pdf,application/msword,image/*"
                          onChange={(e) => handleFileChange(e, 'resume')}
                          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                      </div>
                      <div className="flex justify-center space-x-4">
                        <button
                          type="button"
                          onClick={() => showCamera.idProof ? stopCamera() : startCamera('idProof')}
                          className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                        >
                          {showCamera.idProof ? 'Close Camera' : 'Capture ID Proof'}
                        </button>
                        <button
                          type="button"
                          onClick={() => showCamera.selfie ? stopCamera() : startCamera('selfie')}
                          className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                        >
                          {showCamera.selfie ? 'Close Camera' : 'Capture Selfie'}
                        </button>
                      </div>
                      {showCamera.idProof || showCamera.selfie ? (
                        <div className="mt-4">
                          <video ref={videoRef} autoPlay className="w-full rounded-md" />
                          <button
                            type="button"
                            onClick={() => capturePhoto(showCamera.idProof ? 'idProof' : 'selfie')}
                            className="mt-2 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                          >
                            Capture Photo
                          </button>
                        </div>
                      ) : null}
                      <canvas ref={canvasRef} style={{ display: 'none' }} />
                    </>
                  )}
                  {['blookforce_agent', 'telecaller'].includes(formData.role) && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">City of Operation</label>
                        <input
                          name={`roleSpecificData.${formData.role}.cityOfOperation`}
                          type="text"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          value={formData.roleSpecificData[formData.role].cityOfOperation}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Languages Spoken (comma-separated)</label>
                        <input
                          name={`roleSpecificData.${formData.role}.languagesSpoken`}
                          type="text"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          value={formData.roleSpecificData[formData.role].languagesSpoken.join(',')}
                          onChange={(e) => {
                            const languages = e.target.value.split(',').map(lang => lang.trim()).filter(lang => lang);
                            setFormData({
                              ...formData,
                              roleSpecificData: {
                                ...formData.roleSpecificData,
                                [formData.role]: {
                                  ...formData.roleSpecificData[formData.role],
                                  languagesSpoken: languages,
                                },
                              },
                            });
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Referral Source</label>
                        <input
                          name={`roleSpecificData.${formData.role}.referralSource`}
                          type="text"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          value={formData.roleSpecificData[formData.role].referralSource}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Availability</label>
                        <input
                          name={`roleSpecificData.${formData.role}.availability`}
                          type="text"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          value={formData.roleSpecificData[formData.role].availability}
                          onChange={handleChange}
                        />
                      </div>
                    </>
                  )}
                  {['blookforce_agent', 'telecaller', 'vendor', 'brand'].includes(formData.role) && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Bank Account Number</label>
                        <input
                          name="bankDetails.accountNumber"
                          type="text"
                          required
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          value={formData.bankDetails.accountNumber}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">IFSC Code</label>
                        <input
                          name="bankDetails.ifscCode"
                          type="text"
                          required
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          value={formData.bankDetails.ifscCode}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Bank Name</label>
                        <input
                          name="bankDetails.bankName"
                          type="text"
                          required
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          value={formData.bankDetails.bankName}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Account Holder Name</label>
                        <input
                          name="bankDetails.accountHolderName"
                          type="text"
                          required
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          value={formData.bankDetails.accountHolderName}
                          onChange={handleChange}
                        />
                      </div>
                    </>
                  )}
                </>
              )}
              {(activeTab === 'login' || (activeTab === 'forgot' && forgotPasswordStep === 1)) && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              )}
              {activeTab === 'login' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    name="password"
                    type="password"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              )}
              {activeTab === 'forgot' && forgotPasswordStep === 2 && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Enter OTP</label>
                    <input
                      name="otp"
                      type="text"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={formData.otp}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">New Password</label>
                    <input
                      name="newPassword"
                      type="password"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={formData.newPassword}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                    <input
                      name="confirmNewPassword"
                      type="password"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={formData.confirmNewPassword}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loading ? 'Processing...' : activeTab === 'signup' ? 'Create Account' : activeTab === 'login' ? 'Sign In' : forgotPasswordStep === 1 ? 'Send OTP' : 'Reset Password'}
                </button>
              </div>
              {(activeTab === 'signup' || activeTab === 'login') && (
                <div className="space-y-4">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300"></div></div>
                    {/* <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">OR</span></div> */}
                  </div>
                  {/* <GoogleLoginButton text={activeTab === 'signup' ? 'Sign up with Google' : 'Sign in with Google'} /> */}
                </div>
              )}
              {activeTab === 'login' && (
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => { setActiveTab('forgot'); setForgotPasswordStep(1); }}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Forgot your password?
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" autoClose={5000} />
    </>
  );
};

export default Login;