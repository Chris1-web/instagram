import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button.js";
import Form from "../../components/Form/Form.js";
import instragramAuthImage from "../../image/phone-instagram-screen.png";
import "./Login.css";

// firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase/Firebase-init";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [moveEmail, setMoveEmail] = useState(false);
  const [movePassword, setMovePassword] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(true);
  let history = useNavigate();

  useEffect(() => {
    password !== "" && email !== "" && setButtonStatus(false);
  }, [password, email]);

  function handleEmail(e) {
    if (e.target.value === "") {
      setMoveEmail(false);
    } else {
      setMoveEmail(true);
    }
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    if (e.target.value === "") {
      setMovePassword(false);
    } else {
      setMovePassword(true);
    }
    setPassword(e.target.value);
  }

  async function submitLoginDetails(e) {
    const errorMessage = document.querySelector(".error-message");
    e.preventDefault();
    try {
      setButtonStatus(true);
      await signInWithEmailAndPassword(auth, email, password);
      // lead to home route
      history("/");
    } catch (error) {
      setButtonStatus(false);
      errorMessage.textContent = error.message
        .replace(/firebase:/i, "")
        .replace(/error/i, "")
        .replace("(", "")
        .replace(")", "")
        .replace("auth", "")
        .replace("/", "")
        .replaceAll("-", " ");
    }
  }

  return (
    <article className="login-article">
      <img src={instragramAuthImage} alt="instragram on a phone" />
      <Form header="Instagram" handleSubmit={submitLoginDetails}>
        <div className="email-container">
          <label htmlFor="email" className={moveEmail ? "move" : ""}>
            Username or Email address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handleEmail}
          />
        </div>
        <div className="password-container">
          <label htmlFor="password" className={movePassword ? "move" : ""}>
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handlePassword}
          />
        </div>
        <Button disabled={buttonStatus} title="Log In" />
        <footer>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </footer>
        <p className="error-message"></p>
      </Form>
    </article>
  );
}

export default Login;
