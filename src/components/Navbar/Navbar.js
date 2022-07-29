import { Link } from "react-router-dom";
import {
  HomeOutline,
  ChatbubbleEllipsesOutline,
  AddCircleOutline,
  HeartOutline,
} from "react-ionicons";
import ProfileImage from "../ProfileImage.js/ProfileImage";
import "./Navbar.css";

function Navbar(props) {
  return (
    <nav>
      <h1 className="logo">
        <Link to="/">Instagram</Link>
      </h1>
      <div className="nav-links">
        <Link to="/">
          <HomeOutline
            color={"#00000"}
            height="30px"
            width="30px"
            class="icon"
          />
        </Link>
        <Link to="/">
          <ChatbubbleEllipsesOutline
            color={"#00000"}
            height="30px"
            width="30px"
            class="icon"
          />
        </Link>
        <Link to="/">
          <AddCircleOutline
            color={"#00000"}
            height="30px"
            width="30px"
            class="icon"
          />
        </Link>
        <Link to="/">
          <HeartOutline
            color={"#00000"}
            height="30px"
            width="30px"
            class="icon"
          />
        </Link>
        <ProfileImage
          link={props.link}
          picture={props.picture}
          altText={props.altText}
        />
      </div>
    </nav>
  );
}

export default Navbar;