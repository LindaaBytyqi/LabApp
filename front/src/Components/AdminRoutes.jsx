import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  // Simulim i kontrollit të adminit
  const isAdmin = true; // Vendos këtu kontrollin real nëse ke auth

  return isAdmin ? children : <Navigate to="/unauthorized" />;
};

export default AdminRoute;