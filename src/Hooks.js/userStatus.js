import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../Firebase/Firebase-init";

function useUserStatus() {
  const [isOnline, setIsOnline] = useState(null);
  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsOnline(user);
      } else {
        setIsOnline(null);
      }
    });
    return () => subscribe();
  }, []);
  return isOnline;
}

export default useUserStatus;
