import { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  HomeOutline,
  AddCircleOutline,
  BookmarkOutline,
  SettingsOutline,
  ImagesOutline,
} from "react-ionicons";
import Loader from "../Loader/Loader";
import Form from "../../components/Form/Form";
import "./Navbar.css";
import user from "../../image/user.png";
import github from "../../image/github.png";
import Overlay from "../Overlay/Overlay";
import uniqid from "uniqid";

// firebase
import useUserStatus from "../../Hooks/useUserStatus";
import { signOut } from "firebase/auth";
import { auth, storage, db } from "../../Firebase/Firebase-init";
import {
  uploadBytesResumable,
  ref,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

function Navbar() {
  const { isOnline, loading } = useUserStatus(); //custom hook
  const [currentUser, setCurrentUser] = useState(null);
  const [addNewPost, setAddNewPost] = useState(false);
  const [newStateTwo, setNewStateTwo] = useState(false);
  const [postUploadStatus, setpostUploadStatus] = useState(false);
  const [postCaption, setPostCaption] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [newImageRef, setNewImageRef] = useState(null);
  const [postingLoading, setPostingLoading] = useState(false);
  const [disableSelector, setDisableSelector] = useState(false);
  const [disableShare, setDisableShare] = useState(false);
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
    // confirm if user wants the image to be discarded and deleted
    if (newImage) {
      const discardPost = window.confirm(
        "Do you want this post to be discarded"
      );
      if (discardPost) {
        setAddNewPost(false);
        setNewStateTwo(false);
        setpostUploadStatus(false);
        hideDropdown();
        setNewImage(null);
        deletePostImage();
        setPostingLoading(false);
      } else {
        return;
      }
    } else {
      setAddNewPost(false);
      setNewStateTwo(false);
      setpostUploadStatus(false);
      hideDropdown();
    }
  }

  async function deletePostImage() {
    try {
      const imageReference = ref(storage, newImageRef);
      await deleteObject(imageReference);
      setNewImageRef(null);
    } catch (e) {
      console.log(e.message);
    }
  }

  function moveToStateTwo() {
    setAddNewPost(false);
    setpostUploadStatus(false);
    setNewStateTwo(true);
  }

  function moveToStateThree() {
    setAddNewPost(false);
    setNewStateTwo(false);
    setpostUploadStatus(true);
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
      setNewImageRef(newImageRef.fullPath); //for delete files from firebase storage
      moveToStateTwo();
      // enable select from computer button
      setDisableSelector(false);
      // hide loading
      setPostingLoading(true);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function createPost() {
    const createdDate = new Date();
    setDisableShare(true);
    moveToStateThree();
    try {
      await addDoc(collection(db, "posts"), {
        postImage: newImage,
        caption: postCaption,
        comments: [],
        poster: currentUser.displayName,
        posterProfileURL: currentUser.photoURL,
        likes: [],
        saved: [],
        createAt: `${createdDate.getDate()}/${
          createdDate.getMonth() + 1
        }/${createdDate.getFullYear()}`,
        postId: uniqid(),
        timestamp: serverTimestamp(),
      });
      setPostingLoading(false);
      setNewImage(null);
      setPostCaption("");
      // close all overlays
      setAddNewPost(false);
      setNewStateTwo(false);
      setpostUploadStatus(false);
      hideDropdown();
      setDisableShare(false);
    } catch (error) {
      console.log(error.message);
    }
  }

  function createPostCaption(e) {
    setPostCaption(e.target.value);
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
              <a
                href="https://github.com/Chris1-web/instagram"
                target="_blank"
                rel="noreferrer"
                onClick={hideDropdown}
              >
                <img src={github} alt="github logo" className="github-logo" />
              </a>
              <button className="add-post-button" onClick={showAddNewPost}>
                <AddCircleOutline
                  color={"#00000"}
                  height="30px"
                  width="30px"
                  className="icon"
                />
              </button>
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
                    <Link to={"/" + currentUser.displayName}>
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
            <Overlay closeAddNewPost={closeAddNewPost}>
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
            </Overlay>
          )}
          {newStateTwo && (
            <Overlay closeAddNewPost={closeAddNewPost}>
              <div className="add-new-post-container stage-two">
                <div className="top">
                  <p className="empty"></p>
                  <h3>Create new post</h3>
                  <button
                    className="share"
                    onClick={createPost}
                    disabled={disableShare}
                  >
                    Share
                  </button>
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
                        onChange={createPostCaption}
                      />
                    </Form>
                  </div>
                </div>
              </div>
            </Overlay>
          )}
          {postUploadStatus && (
            <Overlay closeAddNewPost={closeAddNewPost}>
              <div className="add-new-post-loading-container">
                <div className="top">
                  <h3>Sharing</h3>
                </div>
                <div className="below">
                  <p className="upload-done-loader"></p>
                </div>
              </div>
            </Overlay>
          )}
          <Outlet />
        </>
      )}
    </>
  );
}
export default Navbar;
