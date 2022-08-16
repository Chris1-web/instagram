import { useEffect, useState } from "react";
import Form from "../../components/Form/Form";
import user from "../../image/user.png";
import "./EditProfile.css";

// firebase
import { auth, storage } from "../../Firebase/Firebase-init";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import Loader from "../../components/Loader/Loader";
import useProfileInfo from "../../Hooks/useProfileInfo";

function EditProfile() {
  const { loading, profileInfo, profileUser } = useProfileInfo(
    auth.currentUser
  );
  // file picker event listener
  useEffect(() => {
    const profileImagePicker = document.querySelector(".profilePicturePicker");
    function getImage(event) {
      const file = event.target.files[0];
      saveProfileImage(file);
      console.log(file);
    }
    profileImagePicker?.addEventListener("change", getImage);
    return () => profileImagePicker?.removeEventListener("change", getImage);
  }, []);

  function editUserProfile() {
    console.log("edit user profile");
  }

  function changeProfile(e) {
    e.preventDefault();
    const profileImagePicker = document?.querySelector(".profilePicturePicker");
    profileImagePicker.click();
  }

  async function saveProfileImage(file) {
    try {
      // upload image to cloud storage
      const filePath = `${auth.currentUser.uid}/${file.name}`;
      const newImageRef = ref(storage, filePath);
      const fileSnapshot = await uploadBytesResumable(newImageRef, file);

      // Generate a public URL for the file.
      const publicImageUrl = await getDownloadURL(newImageRef);

      // update user profile picture
      await updateProfile(auth.currentUser, {
        photoURL: publicImageUrl,
      });

      console.log(fileSnapshot, fileSnapshot.metadata.fullPath);
      console.log(publicImageUrl);

      console.log(auth.currentUser);

      // CONTINUE HERE
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <div className="edit-profile-screen">
          <Form handleSubmit={editUserProfile}>
            <div className="profile">
              <div className="picture-name-and-link">
                <img
                  src={auth.currentUser.photoURL ?? user}
                  alt={auth.currentUser.displayName}
                  onClick={(e) => changeProfile(e)}
                />
                <div>
                  <span>{auth.currentUser.displayName}</span>
                  <button onClick={changeProfile}>Change profile photo</button>
                  {/* hidden file picker to be called on change profile photo click */}
                  <input
                    type="file"
                    className="profilePicturePicker"
                    accept="image/png, image/jpeg"
                  />
                </div>
              </div>
              <div className="name-container">
                <label>Name</label>
                <input type="text" />
              </div>
              <div className="info">
                <span>
                  Help people discover your account by using the name that
                  you're known by: either your full name, nickname or business
                  name.
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
              <div className="info">
                <span>
                  <h3>Personal information </h3>
                  <p>
                    Provide your personal information, even if the account is
                    used for a business, pet or something else. This won't be
                    part of your public profile.
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
      )}
    </>
  );
}

export default EditProfile;
