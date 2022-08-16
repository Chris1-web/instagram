import { useEffect, useState } from "react";

// hook to get signed in user information from users collection
// in firestore database of firebase
function useProfileInfo(username, loading) {
  const [profileInfo, setProfileInfo] = useState(null);
  useEffect(() => {
    const getUserProfile = async function () {
      const userInfo = await getDoc(doc(db, "users", displayName));
      const data = userInfo.data();
      setProfileInfo(data);
      setLoading(false);
    };
    if (loading) {
      getUserProfile();
    }
    return () => getUserProfile();
  }, []);
  return <h1>Profile Info</h1>;
}

export default useProfileInfo;
