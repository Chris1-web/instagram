import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button.js";
import Form from "../../components/Form/Form.js";
import instragramAuthImage from "../../Image/phone-instagram-screen.png";
import "./Login.css";

// firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase/Firebase-init";
import Loader from "../../components/Loader/Loader.js";
import useUserStatus from "../../Hooks/useUserStatus.js";

function Login() {
  const { isOnline, loading } = useUserStatus(); //custom hook

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [moveEmail, setMoveEmail] = useState(false);
  const [movePassword, setMovePassword] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(true);
  const [showPassword, setShowPassword] = useState(true);

  let history = useNavigate();

  useEffect(() => {
    // if user is online after loading is done, go to home page
    !loading && isOnline && history("/");
  }, [loading]);

  useEffect(() => {
    password !== "" && email !== "" && setButtonStatus(false);
    const showPassword = document.querySelector(".show-password");
    showPassword && password !== "" && showPassword.classList.remove("hide");
    showPassword && password === "" && showPassword.classList.add("hide");
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

  function toggleInputType() {
    showPassword ? setShowPassword(false) : setShowPassword(true);
  }

  async function submitLoginDetails(e) {
    const errorMessage = document.querySelector(".error-message");
    e.preventDefault();
    try {
      // disable loading to prevent double submission, direct to home screen
      setButtonStatus(true);
      await signInWithEmailAndPassword(auth, email, password);
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
    <>
      {loading && <Loader />}
      {!loading && (
        <article className="login-article">
          <img src={instragramAuthImage} alt="instragram on a phone" />
          <Form header="Instagram" handleSubmit={submitLoginDetails}>
            <div className="email-container">
              <label htmlFor="email" className={moveEmail ? "move" : ""}>
                Email address
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
                <span>Password</span>
                <span className="show-password hide" onClick={toggleInputType}>
                  {showPassword ? "show" : "hide"}
                </span>
              </label>
              <input
                type={showPassword ? "password" : "text"}
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
            <p className="info">Note: You can sign up with a fake email</p>
            <p className="error-message"></p>
          </Form>
        </article>
      )}
    </>
  );
}

export default Login;
