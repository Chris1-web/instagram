import { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  HomeOutline,
  ChatbubbleEllipsesOutline,
  AddCircleOutline,
  HeartOutline,
} from "react-ionicons";
import ProfileImage from "../ProfileImage.js/ProfileImage";
import Loader from "../Loader/Loader";
import "./Navbar.css";
import user from "../../image/user.png";

// firebase
import useUserStatus from "../../Hooks.js/useUserStatus";
import { auth } from "../../Firebase/Firebase-init";

function Navbar() {
  const { isOnline, loading } = useUserStatus(); //custom hook
  const [currentUser, setCurrentUser] = useState(null);
  let history = useNavigate();

  // if user is not online route back to login
  useEffect(() => {
    !loading && !isOnline && history("/login");
    !loading && isOnline && setCurrentUser(auth.currentUser);
  }, [loading]);
  return (
    <>
      {/* show loader by default */}
      {loading && <Loader />}
      {!loading && currentUser && (
        <>
          <nav>
            <h1 className="logo">
              <Link to="/">Instagram</Link>
            </h1>
            <div className="nav-links">
              <Link to="/">
                <HomeOutline
                  color={"#00000"}
                  height="30px"
                  width="30px"
                  class="icon"
                />
              </Link>
              <Link to="/">
                <ChatbubbleEllipsesOutline
                  color={"#00000"}
                  height="30px"
                  width="30px"
                  class="icon"
                />
              </Link>
              <Link to="/">
                <AddCircleOutline
                  color={"#00000"}
                  height="30px"
                  width="30px"
                  class="icon"
                />
              </Link>
              <Link to="/">
                <HeartOutline
                  color={"#00000"}
                  height="30px"
                  width="30px"
                  class="icon"
                />
              </Link>
              <ProfileImage
                link={currentUser.displayName}
                picture={currentUser.photoURL ?? user}
                altText={currentUser.displayName}
              />
            </div>
          </nav>
          <Outlet />
        </>
      )}
    </>
  );
}
export default Navbar;
