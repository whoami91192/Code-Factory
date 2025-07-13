import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, auth }) => {
  return auth ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
