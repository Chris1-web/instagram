import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Firebase/Firebase-init";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  let history = useNavigate();

  async function signOutUser() {
    await signOut(auth);
    history("/login");
  }

  useEffect(() => {
    const getUser = function () {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          return user;
        } else {
          history("/login");
        }
      });
    };
    return () => getUser();
  }, []);

  return (
    <div>
      <h1>Welcome Home</h1>
      <button onClick={signOutUser}>Hello World</button>
    </div>
  );
}

export default Home;
