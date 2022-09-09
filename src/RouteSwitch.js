import { HashRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import EditProfile from "./pages/EditProfile/EditProfile";
import Home from "./pages/Home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/Profile/Profile";
import Signup from "./pages/SignUp/Signup";
import PostDetail from "./pages/PostDetail/PostDetail";

function RouteSwitch() {
  return (
    <HashRouter basename="/instagram">
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path=":displayName" element={<Profile />} />
          <Route path="accounts/edit" element={<EditProfile />} />
          <Route path="post/:postid" element={<PostDetail />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </HashRouter>
  );
}

export default RouteSwitch;
