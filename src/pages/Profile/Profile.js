import { Link, useNavigate, useParams } from "react-router-dom";
import { SettingsOutline, BookmarkOutline, AppsOutline } from "react-ionicons";
import user from "../../image/user.png";
import "./Profile.css";
import Loader from "../../components/Loader/Loader";

// firebase
import { auth } from "../../Firebase/Firebase-init";
import useProfileInfo from "../../Hooks/useProfileInfo";
import { useEffect } from "react";

function Profile() {
  const { displayName } = useParams();
  const { loading, profileInfo, profileUser } = useProfileInfo(
    displayName,
    auth.currentUser
  ); //custom hooks to get user database data

  let history = useNavigate();

  function editProfile() {
    history("/accounts/edit");
  }

  return (
    <>
      {loading && <Loader />}
      {/* if the profile is of the current signed in user */}
      {!loading && profileUser && profileInfo.userId === auth.currentUser.uid && (
        <div className="profile-section">
          {console.log(profileInfo.username, displayName)}
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
                  <p>full name</p>
                  <p>Full stack web app developer. Bball</p>
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
                <li>
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
                <p>This contains all the person's posts</p>
              </ul>
            </div>
          </>
        </div>
      )}
      {/* if the profile is not of the current signed in user */}
      {!loading && profileUser && profileInfo.userId !== auth.currentUser.uid && (
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
                  <button>Message</button>
                  <button className="follow-btn">Follow</button>
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
                  <p>full name</p>
                  <p>Full stack web app developer. Bball</p>
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
                <li>
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
                <p>This contains all the person's posts</p>
              </ul>
            </div>
          </>
        </div>
      )}
    </>
  );
}

export default Profile;
