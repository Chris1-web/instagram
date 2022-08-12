import { useState } from "react";
import { Link } from "react-router-dom";
import Form from "../../components/Form/Form";
import { auth } from "../../Firebase/Firebase-init";
import user from "../../image/user.png";
import "./EditProfile.css";

function EditProfile() {
  const [profileUser, setProfileUser] = useState("");
  const [profileInfo, setProfileInfo] = useState("");

  function editUserProfile() {
    console.log("edit user profile");
  }

  return (
    <div className="edit-profile-screen">
      <Form handleSubmit={editUserProfile}>
        <div className="profile">
          <div className="picture-name-and-link">
            <img
              src={auth.currentUser.profileURL ?? user}
              alt={auth.currentUser.displayName}
            />
            <div>
              <span>{auth.currentUser.displayName}</span>
              <Link to="/">Change profile photo</Link>
            </div>
          </div>
          <div className="name-container">
            <label>Name</label>
            <input type="text" />
          </div>
          <div class="info">
            <span>
              Help people discover your account by using the name that you're
              known by: either your full name, nickname or business name.
            </span>
          </div>
          <div className="username-container">
            <label>Username</label>
            <input type="text" />
          </div>
          <div className="website-container">
            <label>Website</label>
            <input type="text" />
          </div>
          <div className="bio-container">
            <label>Bio</label>
            <textarea rows="4" column="50"></textarea>
          </div>
          <div class="info">
            <span>
              <h3>Personal information </h3>
              <p>
                Provide your personal information, even if the account is used
                for a business, pet or something else. This won't be part of
                your public profile.
              </p>
            </span>
          </div>
          <div className="email-container">
            <label>Email address</label>
            <input type="email" />
          </div>
          <div className="phone-container">
            <label>Phone number</label>
            <input type="number" />
          </div>
          <div className="submit-button">
            <button>Submit</button>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default EditProfile;
