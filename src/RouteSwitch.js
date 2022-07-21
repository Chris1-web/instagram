import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";

function RouteSwitch() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RouteSwitch;
