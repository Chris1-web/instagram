import instragramAuthImage from "../../image/phone-instagram-screen.png";
import Form from "../../components/Form";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import "./Signup.css";
import { useState } from "react";

function Signup() {
  const [email, setEmail] = useState("");
  const [moveEmail, setMoveEmail] = useState(false);
  const [fullName, setFullName] = useState("");
  const [moveFullName, setMoveFullName] = useState(false);
  const [username, setUsername] = useState("");
  const [moveUsername, setMoveUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [movePassword, setMovePassword] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(true);

  function handleEmail(e) {
    if (e.target.value === "") {
      setMoveEmail(false);
    } else {
      setMoveEmail(true);
    }
    setEmail(e.target.value);
  }
  function handleFullName(e) {
    if (e.target.value === "") {
      setMoveFullName(false);
    } else {
      setMoveFullName(true);
    }
    setFullName(e.target.value);
  }
  function handleUsername(e) {
    if (e.target.value === "") {
      setMoveUsername(false);
    } else {
      setMoveUsername(true);
    }
    setUsername(e.target.value);
  }
  function handlePassword(e) {
    if (e.target.value === "") {
      setMovePassword(false);
    } else {
      setMovePassword(true);
    }
    setPassword(e.target.value);
  }

  function createAccount() {
    console.log("welcome onboard");
  }

  return (
    <article className="signup-article" onSubmit={createAccount}>
      <img src={instragramAuthImage} alt="instragram on a phone" />
      <Form header="Instagram">
        <legend>Sign up to see photos and videos from your friends.</legend>
        <div className="email-container">
          <label htmlFor="email" className={moveEmail ? "move" : ""}>
            Email address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={handleEmail}
            value={email}
          />
        </div>
        <div className="fullname-container">
          <label htmlFor="full-name" className={moveFullName ? "move" : ""}>
            Full Name
          </label>
          <input
            type="text"
            name="full-name"
            id="full-name"
            value={fullName}
            onChange={handleFullName}
          />
        </div>
        <div className="username-container">
          <label htmlFor="username" className={moveUsername ? "move" : ""}>
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={handleUsername}
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
        <Button disabled={buttonStatus} title="Sign Up" />
        <footer>
          Have an account? <Link to="/login">Log in</Link>
        </footer>
      </Form>
    </article>
  );
}

export default Signup;
