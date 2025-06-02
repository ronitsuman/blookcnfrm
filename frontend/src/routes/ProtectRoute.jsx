// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = useSelector((state) => state.user.user);
  console.log('ProtectedRoute - User:', user, 'Allowed Roles:', allowedRoles);

 

  if (!user || !allowedRoles.includes(user.role)) {
    console.log('ProtectedRoute - Redirecting to /signuplogin. User:', user, 'Role Match:', allowedRoles.includes(user?.role));
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;