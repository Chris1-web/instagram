import useUserStatus from "../../Hooks.js/useUserStatus";
import { auth } from "../../Firebase/Firebase-init";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import Navbar from "../../components/Navbar/Navbar";
import user from "../../image/user.png";

function Profile() {
  const { isOnline, loading } = useUserStatus(); //custom hook
  const [currentUser, setCurrentUser] = useState(null);
  let history = useNavigate();

  useEffect(() => {
    !loading && !isOnline && history("/login");
    !loading && isOnline && setCurrentUser(auth.currentUser);
  }, [loading]);

  return (
    <div className="top-section">
      {loading && <Loader />}
      {!loading && currentUser && (
        <>
          <Navbar
            link={currentUser}
            picture={currentUser.photoURL ?? user}
            altText="babie"
          />
          <h1>
            This contains profile image, number of followers and following,
            number of posts, bio
          </h1>
          <div className="bottom-section">
            <p>This contains all the person's posts</p>
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
