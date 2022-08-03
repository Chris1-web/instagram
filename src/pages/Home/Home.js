import { signOut } from "firebase/auth";
import { auth } from "../../Firebase/Firebase-init";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import useUserStatus from "../../Hooks.js/useUserStatus";
import Navbar from "../../components/Navbar/Navbar";
import "./Home.css";

import user from "../../image/user.png";
import house from "../../image/house.jpg";
import Post from "../../components/Post/Post";

function Home() {
  const { isOnline, loading } = useUserStatus(); //custom hook
  const [currentUser, setCurrentUser] = useState(null);
  let history = useNavigate();

  async function signOutUser() {
    await signOut(auth);
    history("/login");
  }

  useEffect(() => {
    !loading && !isOnline && history("/login");
    !loading && isOnline && setCurrentUser(auth.currentUser);
  }, [loading]);

  return (
    <div className="home-page">
      {loading && <Loader />}
      {/* if screen is not loading and user is not null */}
      {!loading && currentUser && (
        <div>
          <Navbar link="/" picture={user} altText="babie" />
          <main className="home">
            <Post
              posterPicture={user}
              posterUsername={currentUser.displayName}
              postPicture={house}
              altText={currentUser.displayName}
              caption="This is my first post"
            />
            <h1>Welcome Home {currentUser.displayName} </h1>
            <button onClick={signOutUser}>Hello World</button>
          </main>
        </div>
      )}
    </div>
  );
}

export default Home;
