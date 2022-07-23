import instragramAuthImage from "../../image/phone-instagram-screen.png";
import checkmarkIcon from "../../image/checkmark-icon.png";
import cancelIcon from "../../image/cancel-icon.png";
import Form from "../../components/Form";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import "./Signup.css";
import { useEffect, useState } from "react";

const checkValidity = function (input, successIcon, failureIcon) {
  if (input.validity.valid) {
    successIcon.classList.remove("hide");
    failureIcon.classList.add("hide");
  } else {
    failureIcon.classList.remove("hide");
    successIcon.classList.add("hide");
  }
};

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

  useEffect(() => {
    // javascript validation API
    const emailInput = document.querySelector("#email");
    const fullNameInput = document.querySelector("#full-name");
    const usernameInput = document.querySelector("#username");
    const emailsuccessIcon = document.querySelector(".email-success-icon");
    const fullNamesuccessIcon = document.querySelector(
      ".fullName-success-icon"
    );
    const usernamesuccessIcon = document.querySelector(
      ".username-success-icon"
    );
    const emailfailureIcon = document.querySelector(".email-failure-icon");
    const fullNamefailureIcon = document.querySelector(
      ".fullName-failure-icon"
    );
    const usernamefailureIcon = document.querySelector(
      ".username-failure-icon"
    );
    emailInput.addEventListener("input", () =>
      checkValidity(emailInput, emailsuccessIcon, emailfailureIcon)
    );
    fullNameInput.addEventListener("input", () =>
      checkValidity(fullNameInput, fullNamesuccessIcon, fullNamefailureIcon)
    );
    usernameInput.addEventListener("input", () =>
      checkValidity(usernameInput, usernamesuccessIcon, usernamefailureIcon)
    );
    // unmounting
    return () => {
      emailInput.removeEventListener("input", () =>
        checkValidity(emailInput, emailsuccessIcon, emailfailureIcon)
      );
      fullNameInput.removeEventListener("input", () =>
        checkValidity(fullNameInput, fullNamesuccessIcon, fullNamefailureIcon)
      );
      usernameInput.removeEventListener("input", () =>
        checkValidity(usernameInput, usernamesuccessIcon, usernamefailureIcon)
      );
    };
  }, []);

  useEffect(() => {
    // if any input is empty disable button
    if (email === "" || fullName === "" || username === "" || password === "") {
      setButtonStatus(true);
    } else {
      setButtonStatus(false);
    }
  }, [email, fullName, username, password]);

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
    console.log({ email, username, password, fullName });
  }

  return (
    <article className="signup-article" onSubmit={createAccount}>
      <img src={instragramAuthImage} alt="instragram on a phone" />
      <Form header="Instagram">
        <legend>Sign up to see photos and videos from your friends.</legend>
        <div className="email-container">
          <label htmlFor="email" className={moveEmail ? "move" : ""}>
            <span>Email address</span>
            <span>
              <img
                className="email-success-icon hide"
                src={checkmarkIcon}
                alt="sucess"
              />
              <img
                className="email-failure-icon hide"
                src={cancelIcon}
                alt="failure"
              />
            </span>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={handleEmail}
            value={email}
            required
          />
        </div>
        <div className="fullname-container">
          <label htmlFor="full-name" className={moveFullName ? "move" : ""}>
            <span>Full Name</span>
            <span>
              <img
                className="fullName-success-icon hide"
                src={checkmarkIcon}
                alt="sucess"
              />
              <img
                className="fullName-failure-icon hide"
                src={cancelIcon}
                alt="failure"
              />
            </span>
          </label>
          <input
            maxLength={30}
            type="text"
            name="full-name"
            id="full-name"
            value={fullName}
            onChange={handleFullName}
            required
          />
        </div>
        <div className="username-container">
          <label htmlFor="username" className={moveUsername ? "move" : ""}>
            <span>Username</span>
            <span>
              <img
                className="username-success-icon hide"
                src={checkmarkIcon}
                alt="sucess"
              />
              <img
                className="username-failure-icon hide"
                src={cancelIcon}
                alt="failure"
              />
            </span>
          </label>
          <input
            maxLength={30}
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={handleUsername}
            required
          />
        </div>
        <div className="password-container">
          <label htmlFor="password" className={movePassword ? "move" : ""}>
            <span>Password</span>
            <span>
              <img
                className="password-success-icon hide"
                src={checkmarkIcon}
                alt="sucess"
              />
              <img
                className="password-failure-icon hide"
                src={cancelIcon}
                alt="failure"
              />
            </span>
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handlePassword}
            required
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
