import { auth } from "../../Firebase/Firebase-init";
import { useEffect, useState } from "react";
import user from "../../image/user.png";

function Profile() {
  return (
    <div className="top-section">
      <>
        <div>
          <img
            src={auth.currentUser.photoURL ?? user}
            alt={auth.currentUser.displayName}
          />
          This contains profile image, number of followers and following, number
          of posts, bio
        </div>
        <div className="bottom-section">
          <p>This contains all the person's posts</p>
        </div>
      </>
    </div>
  );
}

export default Profile;
