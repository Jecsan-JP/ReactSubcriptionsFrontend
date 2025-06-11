import type { JSX } from "react";
import { Navigate } from "react-router-dom";

const getCustomerId = () => {
  return localStorage.getItem("customerId");
};

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const customerId = getCustomerId();
  if (!customerId) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default PrivateRoute;
