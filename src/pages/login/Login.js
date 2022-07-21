import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import Form from "../../components/Form";
import instragramAuthImage from "../../image/phone-instagram-screen.png";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [moveEmail, setMoveEmail] = useState(false);
  const [movePassword, setMovePassword] = useState(false);

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

  function submitLoginDetails(e) {
    e.preventDefault();
  }

  return (
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
            value={password}
            onChange={handlePassword}
          />
        </div>
        <Button disabled={true} title="Log In" />
        <footer>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </footer>
      </Form>
    </article>
  );
}

export default Login;
