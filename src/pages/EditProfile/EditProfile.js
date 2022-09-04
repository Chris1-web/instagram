import { useEffect, useState } from "react";
import Form from "../../components/Form/Form";
import user from "../../image/user.png";
import Button from "../../components/Button/Button";
import Loader from "../../components/Loader/Loader";
import "./EditProfile.css";

// firebase
import { auth, storage, db } from "../../Firebase/Firebase-init";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateDoc, doc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import useProfileInfo from "../../Hooks/useProfileInfo";

function EditProfile() {
  const { loading, profileInfo, profileUser } = useProfileInfo(
    auth.currentUser.displayName,
    auth.currentUser
  ); //custom hook
  const [buttonStatus, setButtonStatus] = useState(true);
  const [username, setUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [fullName, setFullName] = useState("");
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");

  // fill in states when loading is done
  useEffect(() => {
    if (!loading && profileInfo) {
      setUsername(profileUser.displayName);
      setProfilePicture(profileUser.photoURL);
      setFullName(profileInfo.fullName);
      setWebsite(profileInfo.website);
      setEmail(profileUser.email);
      setBio(profileInfo.bio);
    }
  }, [loading, profileInfo]);

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

  async function saveProfileImage(event) {
    const file = event.target.files[0];
    try {
      // get user from database
      const userInfo = doc(db, "users", profileUser.displayName);
      // show loader on image
      showLoader();
      // upload image to cloud storage
      const filePath = `${auth.currentUser.uid}/${file.name}`;
      const newImageRef = ref(storage, filePath);
      await uploadBytesResumable(newImageRef, file);
      // Generate a public URL for the file.
      const publicImageUrl = await getDownloadURL(newImageRef);
      // update user profile picture in default firebase
      await updateProfile(auth.currentUser, {
        photoURL: publicImageUrl,
      });
      // update user profile picture in firestore firebase
      await updateDoc(userInfo, {
        photoURL: publicImageUrl,
      });
      showProfileUpdateDiv("Profile photo updated.");
      // hide loader on image
      showLoader();
      // CONTINUE HERE
    } catch (error) {
      showProfileUpdateDiv("There has been a problem. Please, try again!");
    }
  }

  function showLoader() {
    const loader = document.querySelector(".loader");
    loader.classList.toggle("hide");
  }

  // if any of the user database is changed, update doc method is called
  // else if any of the default firebase user data is changed, update profile is called
  async function updateProfileInfo() {
    try {
      const userInfo = doc(db, "users", profileUser.displayName);
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
        await updateDoc(userInfo, {
          email: email.trim(),
        });
        await updateProfile(auth.currentUser, {
          email: email.trim(),
        });
      }
      showProfileUpdateDiv("Profile saved.");
    } catch (error) {
      showProfileUpdateDiv("Sorry, there was an error.");
    }
  }

  function showProfileUpdateDiv(message) {
    const profileSavedDiv = document.querySelector(".profile-saved");
    profileSavedDiv.textContent = message;
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
                {/* loader */}
                <span className="loader hide"></span>
                {/* loader */}
                <div>
                  <span>{username}</span>
                  <button onClick={changeProfilePicture}>
                    Change profile photo
                  </button>
                  {/* hidden file picker to be called on change profile picture click */}
                  <input
                    type="file"
                    className="profilePicturePicker"
                    accept="image/png, image/jpeg"
                    onChange={saveProfileImage}
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
          <div className="profile-saved hide"></div>
        </div>
      )}
    </>
  );
}

export default EditProfile;
