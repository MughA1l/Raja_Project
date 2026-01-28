import React from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "@context/useAuthStore";

const ProtectedRoute = ({ children }) => {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    // User is not authenticated, redirect to login
    return <Navigate to="/login" replace />;
  }

  // User is authenticated, render the children
  return children;
};

export default ProtectedRoute;
