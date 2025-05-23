import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import React from "react";


interface ProtectedRouteProps {
  element: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
