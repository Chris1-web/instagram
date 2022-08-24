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
import { auth, storage } from "../../Firebase/Firebase-init";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";

function Navbar() {
  const { isOnline, loading } = useUserStatus(); //custom hook
  const [currentUser, setCurrentUser] = useState(null);
  const [addNewPost, setAddNewPost] = useState(false);
  const [newStateTwo, setNewStateTwo] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [postingLoading, setPostingLoading] = useState(false);
  const [disableSelector, setDisableSelector] = useState(false);
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
    setNewStateTwo(false);
    hideDropdown();
    setPostingLoading(false);
    // if new image is not empty, delete it from storage, since it is not to be posted
    if (newImage) {
      setNewImage(null);
    }
  }

  function moveToStateTwo() {
    setAddNewPost(false);
    setNewStateTwo(true);
  }

  function selectPostImage() {
    const postImagePicker = document?.querySelector(".postImage-file");
    postImagePicker.click();
  }

  async function savePostImage(event) {
    // disable select from computer button
    setDisableSelector(true);
    // showing loading
    setPostingLoading(true);
    const file = event.target.files[0];
    try {
      // upload image to cloud storage
      const filePath = `${auth.currentUser.uid}/${file.name}`;
      const newImageRef = ref(storage, filePath);
      await uploadBytesResumable(newImageRef, file);
      // Generate a public URL for the file.
      const publicImageUrl = await getDownloadURL(newImageRef);
      // set post image in state
      setNewImage(publicImageUrl);
      moveToStateTwo();
      // enable select from computer button
      setDisableSelector(false);
      // hide loading
      setPostingLoading(true);
    } catch (error) {
      console.log(error.message);
    }
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
                <div className="top">
                  <p className="empty"></p>
                  <h3>Create new post</h3>
                  <p className="empty"></p>
                </div>
                <div className="below">
                  <ImagesOutline color={"#00000"} height="80px" width="80px" />
                  {/* loader */}
                  {postingLoading && <span className="loader"></span>}
                  {/* loader */}
                  {/* hidden file picker to be called when select from computer button is clicked */}
                  <input
                    type="file"
                    className="postImage-file"
                    name="postImage-file"
                    accept="image/png, image/jpeg"
                    onChange={savePostImage}
                  />
                  <button onClick={selectPostImage} disabled={disableSelector}>
                    Select From Computer
                  </button>
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
                  <img src={newImage} alt="house" className="postedImage" />
                  <div className="right-side">
                    <div className="poster">
                      <img
                        src={currentUser.photoURL ?? user}
                        alt="user"
                        className="postProfileImage"
                      />
                      <p>{currentUser.displayName}</p>
                    </div>
                    <Form>
                      <textarea
                        placeholder="Write a caption..."
                        rows={26.8}
                        cols={30}
                      />
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
