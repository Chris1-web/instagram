import { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  HomeOutline,
  ChatbubbleEllipsesOutline,
  AddCircleOutline,
  HeartOutline,
  BookmarkOutline,
  SettingsOutline,
  ImagesOutline,
  CloseOutline,
} from "react-ionicons";
import Loader from "../Loader/Loader";
import Form from "../../components/Form/Form";
import "./Navbar.css";
import user from "../../image/user.png";
import house from "../../image/house.jpg";

// firebase
import useUserStatus from "../../Hooks/useUserStatus";
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase/Firebase-init";

function Navbar() {
  const { isOnline, loading } = useUserStatus(); //custom hook
  const [currentUser, setCurrentUser] = useState(null);
  const [addNewPost, setAddNewPost] = useState(false);
  const [newStateTwo, setNewStateTwo] = useState(true);
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

  function toggleDropdown() {
    const dropdown = document.querySelector(".dropdown");
    dropdown.classList.toggle("hide");
  }

  function hideDropdown() {
    const dropdown = document.querySelector(".dropdown");
    dropdown.classList.add("hide");
  }

  function showAddNewPost() {
    setAddNewPost(true);
    hideDropdown();
  }

  function closeAddNewPost() {
    setAddNewPost(false);
    hideDropdown();
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
                  className="icon"
                />
              </Link>
              <Link to="/" onClick={hideDropdown}>
                <ChatbubbleEllipsesOutline
                  color={"#00000"}
                  height="30px"
                  width="30px"
                  className="icon"
                />
              </Link>
              <button className="add-post-button" onClick={showAddNewPost}>
                <AddCircleOutline
                  color={"#00000"}
                  height="30px"
                  width="30px"
                  className="icon"
                />
              </button>
              <Link to="/" onClick={hideDropdown}>
                <HeartOutline
                  color={"#00000"}
                  height="30px"
                  width="30px"
                  className="icon"
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
                      <img
                        src={currentUser.photoURL ?? user}
                        alt={currentUser.displayName}
                      />
                      <span>Profile</span>
                    </Link>
                  </li>
                  <li onClick={toggleDropdown}>
                    <Link to="/">
                      <BookmarkOutline
                        color={"#00000"}
                        height="25px"
                        width="25px"
                        className="icon"
                      />
                      <span>Saved</span>
                    </Link>
                  </li>
                  <li onClick={toggleDropdown}>
                    <Link to="/accounts/edit">
                      <SettingsOutline
                        color={"#00000"}
                        height="25px"
                        width="25px"
                        className="icon"
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
          {/* add new post model */}
          {addNewPost && (
            <div className="add-new-post">
              <div className="background-overlay" onClick={closeAddNewPost}>
                <button className="close-modal-btn" onClick={closeAddNewPost}>
                  <CloseOutline color={"#fff"} height="30px" width="30px" />
                </button>
              </div>
              <div className="add-new-post-container">
                <h3>Create new post</h3>
                <div className="below">
                  <ImagesOutline color={"#00000"} height="80px" width="80px" />
                  {/* hidden file picker to be called when select from computer button is clicked */}
                  <input
                    type="file"
                    id="post-file"
                    name="post-file"
                    accept="image/png, image/jpeg"
                  />
                  <button>Select From Computer</button>
                </div>
              </div>
            </div>
          )}
          {newStateTwo && (
            <div className="add-new-post">
              <div className="background-overlay" onClick={closeAddNewPost}>
                <button className="close-modal-btn" onClick={closeAddNewPost}>
                  <CloseOutline color={"#fff"} height="30px" width="30px" />
                </button>
              </div>
              <div className="add-new-post-container stage-two">
                <div className="top">
                  <p className="empty"></p>
                  <h3>Create new post</h3>
                  <button className="share">Share</button>
                </div>
                <div className="below-image">
                  <img src={house} alt="house" className="postedImage" />
                  <div className="right-side">
                    <div className="poster">
                      <img src={user} alt="user" className="postProfileImage" />
                      <p>{currentUser.displayName}</p>
                    </div>
                    <Form>
                      <textarea
                        placeholder="Write a caption..."
                        rows={26.8}
                        cols={30}
                      />
                      {/* <input type="text" placeholder="Write a caption..." /> */}
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          )}
          <Outlet />
        </>
      )}
    </>
  );
}
export default Navbar;
