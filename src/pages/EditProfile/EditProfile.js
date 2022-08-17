import { useEffect, useState } from "react";
import Form from "../../components/Form/Form";
import user from "../../image/user.png";
import Button from "../../components/Button/Button";
import Loader from "../../components/Loader/Loader";
import "./EditProfile.css";

// firebase
import { auth, storage } from "../../Firebase/Firebase-init";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase/Firebase-init";
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

  async function updateProfileInfo() {
    const currentUserInfo = doc(db, "users", username);
    if (
      fullName !== profileInfo.fullName ||
      website !== profileInfo.website ||
      bio !== profileInfo.bio
    ) {
      console.log("fullName has been changed");
      await updateDoc(currentUserInfo, {
        fullName: fullName.trim(),
        website: website.trim(),
        bio: bio.trim(),
      });
    }
  }

  function changeFullName(e) {
    setFullName(e.target.value);
    setButtonStatus(false);
    console.log(fullName);
  }
  function changeUsername(e) {
    console.log(e.target.value);
    setButtonStatus(false);
  }
  function changeWebsite(e) {
    console.log(e.target.value);
    setButtonStatus(false);
  }
  function changeEmail(e) {
    console.log(e.target.value);
    setButtonStatus(false);
  }
  function changeBio(e) {
    console.log(e.target.value);
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
              <div className="username-container">
                <label>Username</label>
                <input type="text" value={username} onChange={changeUsername} />
              </div>
              <div className="website-container">
                <label>Website</label>
                <input type="text" value={website} onChange={changeWebsite} />
              </div>
              <div className="bio-container">
                <label>Bio</label>
                <textarea rows={3} value={bio} onChange={changeBio} />
                {/* <textarea rows="4" column="50">
                  {bio}
                </textarea> */}
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
        </div>
      )}
    </>
  );
}

export default EditProfile;
