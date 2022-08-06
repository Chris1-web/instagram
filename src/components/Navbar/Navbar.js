import { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  HomeOutline,
  ChatbubbleEllipsesOutline,
  AddCircleOutline,
  HeartOutline,
  BookmarkOutline,
  SettingsOutline,
} from "react-ionicons";
import Loader from "../Loader/Loader";
import "./Navbar.css";
import user from "../../image/user.png";

// firebase
import useUserStatus from "../../Hooks.js/useUserStatus";
import { signOut } from "firebase/auth";
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

  async function signOutUser() {
    await signOut(auth);
    history("/login");
  }

  function showDropdown() {
    const dropdown = document.querySelector(".dropdown");
    dropdown.classList.toggle("hide");
  }

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
              <div className="profile-container">
                <img
                  src={currentUser.photoURL ?? user}
                  alt="alt"
                  className="profile-image"
                  data-testid="profile-image"
                  onClick={showDropdown}
                />
                <ul className="dropdown hide">
                  <li>
                    <Link to={currentUser.displayName}>
                      <img src={user} alt={currentUser.displayName} />
                      <span>Profile</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <BookmarkOutline
                        color={"#00000"}
                        height="25px"
                        width="25px"
                        class="icon"
                      />
                      <span>Saved</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <SettingsOutline
                        color={"#00000"}
                        height="25px"
                        width="25px"
                        class="icon"
                      />
                      <span>Settings</span>
                    </Link>
                  </li>
                  <li>
                    <span onClick={signOutUser}>Log out</span>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <Outlet />
        </>
      )}
    </>
  );
}
export default Navbar;
