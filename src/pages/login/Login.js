import { Link } from "react-router-dom";
import Button from "../../components/Button";
import Form from "../../components/Form";
import instragramAuthImage from "../../image/phone-instagram-screen.png";
import "./Login.css";

function Login() {
  return (
    <article className="login-article">
      <img src={instragramAuthImage} alt="instragram on a phone" />
      <Form header="Instagram">
        <div className="email-container">
          <label htmlFor="email">email address</label>
          <input type="email" name="email" />
        </div>
        <div className="password-container">
          <label htmlFor="password">password</label>
          <input type="password" name="password" />
        </div>
        <Button title="Log In" />
        <footer>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </footer>
      </Form>
    </article>
  );
}

export default Login;
