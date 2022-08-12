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
    console.log("logged out");
  }

  function toggleDropdown() {
    const dropdown = document.querySelector(".dropdown");
    dropdown.classList.toggle("hide");
  }

  function hideDropdown() {
    const dropdown = document.querySelector(".dropdown");
    dropdown.classList.add("hide");
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
              <Link to="/" onClick={hideDropdown}>
                <HomeOutline
                  color={"#00000"}
                  height="30px"
                  width="30px"
                  class="icon"
                />
              </Link>
              <Link to="/" onClick={hideDropdown}>
                <ChatbubbleEllipsesOutline
                  color={"#00000"}
                  height="30px"
                  width="30px"
                  class="icon"
                />
              </Link>
              <Link to="/" onClick={hideDropdown}>
                <AddCircleOutline
                  color={"#00000"}
                  height="30px"
                  width="30px"
                  class="icon"
                />
              </Link>
              <Link to="/" onClick={hideDropdown}>
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
                  onClick={toggleDropdown}
                />
                <ul className="dropdown hide">
                  <li onClick={toggleDropdown}>
                    <Link to={currentUser.displayName}>
                      <img src={user} alt={currentUser.displayName} />
                      <span>Profile</span>
                    </Link>
                  </li>
                  <li onClick={toggleDropdown}>
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
                  <li onClick={toggleDropdown}>
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
                  <li onClick={toggleDropdown}>
                    <button onClick={signOutUser}>Log out</button>
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
