import { Navigate, useLocation } from "react-router-dom";

import { isAuthenticated } from "./utils";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  if (!isAuthenticated()) {
    return (
      <Navigate to="/auth/user" state={{ from: location.pathname }} replace />
    );
  }

  return children;
};

export default ProtectedRoute;
