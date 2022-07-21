import { BrowserRouter, Routes, Route } from "react-router-dom";

function RouteSwitch() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" />
      </Routes>
    </BrowserRouter>
  );
}
