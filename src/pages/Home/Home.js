import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Firebase/Firebase-init";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

function Home() {
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  let history = useNavigate();

  async function signOutUser() {
    await signOut(auth);
    history("/login");
  }

  // on componentDidMount, show loader  while confirming if user is logged in
  // update current user
  useEffect(() => {
    setLoading(true);
    const getUser = function () {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setLoading(false);
          setCurrentUser(user);
        } else {
          history("/login");
        }
      });
    };
    return () => getUser();
  }, []);

  return (
    <div>
      {loading && <Loader />}
      {/* if screen is not loading and current user is not null */}
      {!loading && currentUser && (
        <div>
          {console.log(currentUser)}
          <h1>Welcome Home</h1>
          <button onClick={signOutUser}>Hello World</button>
        </div>
      )}
    </div>
  );
}

export default Home;
