import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../Firebase/Firebase-init";

// by default, loading is true, to load loader on screen
// then, if user is online, isOnline is changed to true and loading screen is removed
// finally, if user is not online, isOnline is changed to false and loading screen is also removed
function useUserStatus() {
  const [isOnline, setIsOnline] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = function () {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setIsOnline(true);
          setLoading(false);
        } else {
          setIsOnline(false);
          setLoading(false);
        }
      });
    };
    return () => getUser();
  }, []);
  return { isOnline, loading };
}

export default useUserStatus;
