import { useEffect, useState } from "react";

// firebase
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../Firebase/Firebase-init";

// hook to get user information from users collection with username and current user object
// in firestore database of firebase
function useProfileInfo(username, userObject) {
  const [loading, setLoading] = useState(true);
  const [profileInfo, setProfileInfo] = useState(null);
  const [profileUser, setProfileUser] = useState(null);
  useEffect(() => {
    const getUserProfile = async function () {
      setProfileUser(userObject);
      onSnapshot(doc(db, "users", username), (document) => {
        const data = document.data();
        setProfileInfo(data);
      });
      setLoading(false);
    };
    getUserProfile();
    return () => getUserProfile();
  }, []);
  return { loading, profileInfo, profileUser };
}

export default useProfileInfo;
