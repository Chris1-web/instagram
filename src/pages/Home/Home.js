import { useState } from "react";
import { auth } from "../../Firebase/Firebase-init";

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(auth.currentUser);
  console.log(isLoggedIn);
  return (
    <div>
      {/* {isLoggedIn ?? <Navigate to="/login" replace={true} />} */}
      <h1>Welcome Home</h1>
    </div>
  );
}

export default Home;
