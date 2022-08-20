import { Link, useNavigate } from "react-router-dom";
import { SettingsOutline, BookmarkOutline, AppsOutline } from "react-ionicons";
import user from "../../image/user.png";
import "./Profile.css";
import Loader from "../../components/Loader/Loader";

// firebase
import { auth } from "../../Firebase/Firebase-init";
import useProfileInfo from "../../Hooks/useProfileInfo";

function Profile() {
  const { loading, profileInfo, profileUser } = useProfileInfo(
    auth.currentUser.displayName,
    auth.currentUser
  ); //custom hooks to get user database data

  let history = useNavigate();

  function editProfile() {
    history("/accounts/edit");
  }

  return (
    <>
      {loading && <Loader />}
      {!loading && profileInfo && profileUser && (
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
