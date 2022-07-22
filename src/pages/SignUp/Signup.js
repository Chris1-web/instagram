import instragramAuthImage from "../../image/phone-instagram-screen.png";
import Form from "../../components/Form";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import "./Signup.css";

function Signup() {
  return (
    <article className="signup-article">
      <img src={instragramAuthImage} alt="instragram on a phone" />
      <Form header="Instagram">
        <legend>Sign up to see photos and videos from your friends.</legend>
        <div className="email-container">
          <label htmlFor="email">Email address</label>
          <input type="email" name="email" id="email" />
        </div>
        <div className="fullname-container">
          <label htmlFor="full-name">Full Name</label>
          <input type="text" name="full-name" id="full-name" />
        </div>
        <div className="username-container">
          <label htmlFor="username">Email address</label>
          <input type="text" name="username" id="username" />
        </div>
        <div className="password-container">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>
        <Button disabled={true} title="Sign Up" />
        <footer>
          Have an account? <Link to="/login">Log in</Link>
        </footer>
      </Form>
    </article>
  );
}

export default Signup;
