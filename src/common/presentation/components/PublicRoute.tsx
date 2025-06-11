import type { JSX } from "react";
import { Navigate } from "react-router-dom";

const getCustomerId = () => {
  return localStorage.getItem("customerId");
};

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const customerId = getCustomerId();
  if (customerId) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

export default PublicRoute;
