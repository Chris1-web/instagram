import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  SettingsOutline,
  BookmarkOutline,
  AppsOutline,
  CheckmarkDoneOutline,
} from "react-ionicons";
import user from "../../image/user.png";
import "./Profile.css";
import Loader from "../../components/Loader/Loader";

// firebase
import { auth, db } from "../../Firebase/Firebase-init";
import useProfileInfo from "../../Hooks/useProfileInfo";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  query,
  collection,
  where,
  onSnapshot,
} from "firebase/firestore";

function Profile() {
  const { displayName } = useParams();
  const { loading, profileInfo, profileUser } = useProfileInfo(
    displayName,
    auth.currentUser
  ); //custom hooks to get user database data
  const [showFollow, setShowFollow] = useState(true);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [profilePosts, setProfilePosts] = useState(null);
  const [savedPosts, setSavedPosts] = useState(null);
  const [showPost, setShowPost] = useState(true);
  // const [showSaved, setShowSaved] = useState(false);

  let history = useNavigate();

  function editProfile() {
    history("/accounts/edit");
  }

  async function followProfile() {
    setButtonStatus(true);
    const presentProfile = doc(db, "users", displayName);
    const presentUser = doc(db, "users", profileUser.displayName);

    // Atomically add a new follower to the profile's "followers" array field.
    await updateDoc(presentProfile, {
      followers: arrayUnion(profileUser.displayName),
    });
    // Atomically add a new following to the current user's "following" array field.
    await updateDoc(presentUser, {
      following: arrayUnion(profileInfo.username),
    });
    setShowFollow(true);
    setButtonStatus(false);
  }

  async function unFollowProfile() {
    setButtonStatus(true);
    const presentProfile = doc(db, "users", displayName);
    const presentUser = doc(db, "users", profileUser.displayName);

    // Atomically add a new follower to the profile's "followers" array field.
    await updateDoc(presentProfile, {
      followers: arrayRemove(profileUser.displayName),
    });
    // Atomically add a new following to the current user's "following" array field.
    await updateDoc(presentUser, {
      following: arrayRemove(profileInfo.username),
    });
    setShowFollow(false);
    setButtonStatus(false);
  }

  async function checkFollow() {
    const docSnap = await getDoc(doc(db, "users", displayName));
    const data = docSnap.data();
    const followStatus = data.followers.includes(auth.currentUser.displayName);
    setShowFollow(followStatus);
  }

  async function getProfilePosts() {
    const profilePosts = query(
      collection(db, "posts"),
      where("poster", "==", displayName)
    );
    onSnapshot(profilePosts, (querySnapshot) => {
      const postDocs = [];
      querySnapshot.forEach((doc) => {
        postDocs.push(doc.data());
        setProfilePosts(postDocs);
      });
    });
  }

  async function getSavedPosts() {
    const savedPosts = query(
      collection(db, "posts"),
      where("saved", "array-contains", displayName)
    );
    onSnapshot(savedPosts, (querySnapshot) => {
      const postDocs = [];
      querySnapshot.forEach((doc) => {
        postDocs.push(doc.data());
        setSavedPosts(postDocs);
      });
    });
  }

  // determine if follow or unfollow button should be displayed when component mounts
  useEffect(() => {
    checkFollow();
    getProfilePosts();
    getSavedPosts();
  }, []);

  return (
    <>
      {(loading || !profileInfo || !profileUser) && <Loader />}
      {/* if the profile is of the current signed in user */}
      {!loading &&
        profileUser &&
        profileInfo &&
        profileInfo.userId === auth.currentUser.uid && (
          <div className="profile-section">
            <>
              <div className="top-section">
                <img
                  src={profileUser.photoURL ?? user}
                  alt={profileUser.displayName}
                />
                <div className="right">
                  <div className="top">
                    <h3>{profileUser.displayName}</h3>
                    <button onClick={editProfile}>Edit Profile</button>
                    {/* <button className="follow-btn">Follow</button> */}
                    <Link to="/accounts/edit">
                      <SettingsOutline
                        color={"#00000"}
                        height="25px"
                        width="25px"
                        class="icon"
                      />
                    </Link>
                  </div>
                  <div className="middle">
                    <p>
                      <span>0 </span>posts
                    </p>
                    <p>
                      <span>{profileInfo.followers.length} </span>followers
                    </p>
                    <p>
                      <span>{profileInfo.following.length} </span>following
                    </p>
                  </div>
                  <div className="bottom">
                    <p>{profileInfo.fullName}</p>
                    <p>{profileInfo.bio}</p>
                  </div>
                </div>
              </div>
              <div className="bottom-section">
                <ul className="tags">
                  <li
                    className={showPost ? "active" : ""}
                    onClick={() => setShowPost(true)}
                  >
                    <AppsOutline
                      color={"#00000"}
                      height="15px"
                      width="15px"
                      class="icon"
                    />
                    <span>POSTS</span>
                  </li>
                  <li
                    className={!showPost ? "active" : ""}
                    onClick={() => setShowPost(false)}
                  >
                    <BookmarkOutline
                      color={"#00000"}
                      height="15px"
                      width="15px"
                      class="icon"
                    />
                    <span>SAVED</span>
                  </li>
                </ul>
                <ul className="posts">
                  {showPost &&
                    profilePosts?.map((post) => (
                      <img
                        src={post.postImage}
                        alt={post.poster}
                        key={post.postId}
                      />
                    ))}
                </ul>
                <ul className="saved">
                  {!showPost &&
                    savedPosts?.map((post) => (
                      <img
                        src={post.postImage}
                        alt={post.poster}
                        key={post.postId}
                      />
                    ))}
                </ul>
              </div>
            </>
          </div>
        )}
      {/* if the profile is not of the current signed in user */}
      {!loading &&
        profileUser &&
        profileInfo &&
        profileInfo.userId !== auth.currentUser.uid && (
          <div className="profile-section">
            <>
              <div className="top-section">
                <img
                  src={profileInfo.photoURL ?? user}
                  alt={profileInfo.username}
                />
                <div className="right">
                  <div className="top">
                    <h3>{profileInfo.username}</h3>
                    <button className="message">Message</button>
                    {!showFollow ? (
                      <button
                        className="follow-btn"
                        disabled={buttonStatus}
                        onClick={followProfile}
                      >
                        Follow
                      </button>
                    ) : (
                      <button
                        className="unfollow-btn"
                        disabled={buttonStatus}
                        onClick={unFollowProfile}
                      >
                        <CheckmarkDoneOutline
                          color={"#00000"}
                          height="15px"
                          width="15px"
                        />
                      </button>
                    )}
                  </div>
                  <div className="middle">
                    <p>
                      <span>0 </span>posts
                    </p>
                    <p>
                      <span>{profileInfo.followers.length} </span>followers
                    </p>
                    <p>
                      <span>{profileInfo.following.length} </span>following
                    </p>
                  </div>
                  <div className="bottom">
                    <p>{profileInfo.fullName}</p>
                    <p>{profileInfo.bio}</p>
                  </div>
                </div>
              </div>
              <div className="bottom-section">
                <ul className="tags">
                  <li className="active">
                    <AppsOutline
                      color={"#00000"}
                      height="15px"
                      width="15px"
                      class="icon"
                    />
                    <span>POSTS</span>
                  </li>
                </ul>
                <ul className="posts">
                  {profilePosts?.map((post) => (
                    <img
                      src={post.postImage}
                      alt={post.poster}
                      key={post.postId}
                    />
                  ))}
                </ul>
              </div>
            </>
          </div>
        )}
    </>
  );
}

export default Profile;
