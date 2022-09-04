import { signOut } from "firebase/auth";
import { auth } from "../../Firebase/Firebase-init";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

import user from "../../image/user.png";
import house from "../../image/house.jpg";
import Post from "../../components/Post/Post";

function Home() {
  let history = useNavigate();

  async function signOutUser() {
    await signOut(auth);
    history("/login");
  }

  return (
    <div className="home-page">
      <div>
        <main className="home">
          {/* <div className="home-loader"></div> */}
          <Post
            posterPicture={user}
            posterUsername={auth.currentUser.displayName}
            postPicture={house}
            altText={auth.currentUser.displayName}
            caption="This is my first post"
          />
          <h1>Welcome Home {auth.currentUser.displayName} </h1>
          <button onClick={signOutUser}>Hello World</button>
        </main>
      </div>
    </div>
  );
}

export default Home;
