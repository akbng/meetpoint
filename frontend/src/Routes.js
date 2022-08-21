import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";

import Home from "./pages/Home";
import Auth from "./pages/auth/user";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" element={<Home />} />
        <Route path="/auth/user" element={<Auth />} />
        <Route path="*" element={<h1>ERROR 404</h1>} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
