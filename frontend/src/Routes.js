import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<h1>ERROR 404</h1>} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
