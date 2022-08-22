import { Navigate } from "react-router-dom";

import { isAuthenticated } from "./utils";

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/auth/user" replace />;
  }

  return children;
};

export default ProtectedRoute;
