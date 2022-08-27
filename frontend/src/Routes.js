import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";

import Home from "./pages";
import Auth from "./pages/auth/user";
import Dashboard from "./pages/dashboard/me";
import Meeting from "./pages/meeting/call/[cid]";
import JoinCall from "./pages/meeting/join/call";
import LeaveCall from "./pages/meeting/leave/call";
import ProtectedRoute from "./ProtectedRoute";

const protect = (Component) => (
  <ProtectedRoute>
    <Component />
  </ProtectedRoute>
);

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" element={<Home />} />
        <Route path="/auth/user" element={<Auth />} />
        <Route path="/dashboard/me" element={protect(Dashboard)} />
        <Route path="/meeting/call/:cid" element={protect(Meeting)} />
        <Route path="/meeting/join/call" element={<JoinCall />} />
        <Route path="/meeting/leave/call" element={<LeaveCall />} />
        <Route path="*" element={<h1>ERROR 404</h1>} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
