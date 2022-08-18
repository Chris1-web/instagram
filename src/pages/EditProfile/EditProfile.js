import { useEffect, useState } from "react";
import Form from "../../components/Form/Form";
import user from "../../image/user.png";
import Button from "../../components/Button/Button";
import Loader from "../../components/Loader/Loader";
import "./EditProfile.css";

// firebase
import { auth, storage, db } from "../../Firebase/Firebase-init";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateDoc, getDoc, doc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import useProfileInfo from "../../Hooks/useProfileInfo";

function EditProfile() {
  const { loading, profileInfo, profileUser } = useProfileInfo(
    auth.currentUser
  ); //custom hook
  const [buttonStatus, setButtonStatus] = useState(true);
  const [username, setUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [fullName, setFullName] = useState("");
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    if (!loading) {
      setUsername(profileUser.displayName);
      setProfilePicture(profileUser.photoURL);
      setFullName(profileInfo.fullName);
      setWebsite(profileInfo.website);
      setEmail(profileUser.email);
      setBio(profileInfo.bio);
    }
  }, [loading]);

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

  function editUserProfile(e) {
    e.preventDefault();
    setButtonStatus(true);
    updateProfileInfo();
  }

  function changeProfilePicture(e) {
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

  // if any of the user database is changed, update doc method is called
  // else if any of the default firebase user data is changed, update profile is called
  async function updateProfileInfo() {
    try {
      const userInfo = doc(db, "users", profileUser.uid);
      if (
        fullName !== profileInfo.fullName ||
        website !== profileInfo.website ||
        bio !== profileInfo.bio
      ) {
        await updateDoc(userInfo, {
          fullName: fullName.trim(),
          website: website.trim(),
          bio: bio.trim(),
        });
      } else if (email !== profileUser.email) {
        await updateProfile(auth.currentUser, {
          email: email.trim(),
        });
      }
      showProfileUpdateDiv();
    } catch (error) {
      const profileSavedDiv = document.querySelector(".profile-saved");
      profileSavedDiv.textContent = error.message;
      showProfileUpdateDiv();
    }
  }

  function showProfileUpdateDiv() {
    const profileSavedDiv = document.querySelector(".profile-saved");
    profileSavedDiv.classList.remove("hide");
    setTimeout(() => {
      profileSavedDiv.classList.add("show");
    }, 300);
    setTimeout(() => {
      profileSavedDiv.classList.remove("show");
      profileSavedDiv.classList.add("hide");
    }, 3000);
  }

  function changeFullName(e) {
    setFullName(e.target.value);
    setButtonStatus(false);
  }
  function changeWebsite(e) {
    setWebsite(e.target.value);
    setButtonStatus(false);
  }
  function changeEmail(e) {
    setEmail(e.target.value);
    setButtonStatus(false);
  }
  function changeBio(e) {
    setBio(e.target.value);
    setButtonStatus(false);
  }

  return (
    <>
      {loading && <Loader />}
      {!loading && username && (
        <div className="edit-profile-screen">
          <Form handleSubmit={editUserProfile}>
            <div className="profile">
              <div className="picture-name-and-link">
                <img
                  src={profilePicture ?? user}
                  alt={username}
                  onClick={(e) => changeProfilePicture(e)}
                />
                <div>
                  <span>{username}</span>
                  <button onClick={changeProfilePicture}>
                    Change profile photo
                  </button>
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
                <input type="text" value={fullName} onChange={changeFullName} />
              </div>
              <div className="info">
                <span>
                  Help people discover your account by using the name that
                  you're known by: either your full name, nickname or business
                  name.
                </span>
              </div>
              <div className="website-container">
                <label>Website</label>
                <input type="text" value={website} onChange={changeWebsite} />
              </div>
              <div className="bio-container">
                <label>Bio</label>
                <textarea rows={3} value={bio} onChange={changeBio} />
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
                <input type="email" value={email} onChange={changeEmail} />
              </div>
              <div className="submit-button">
                <Button disabled={buttonStatus} title="Submit" />
              </div>
            </div>
          </Form>
          <div className="profile-saved hide">Profile saved.</div>
        </div>
      )}
    </>
  );
}

export default EditProfile;
