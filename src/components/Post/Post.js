import { HeartOutline, ChatbubbleOutline } from "react-ionicons";
import { Link } from "react-router-dom";
import ProfileImage from "../ProfileImage/ProfileImage";
import "./Post.css";

function Post(props) {
  return (
    <article className="post-box">
      <header>
        <div className="poster-profile">
          <ProfileImage
            link={props.posterUsername}
            picture={props.posterPicture}
            alText={props.altText}
          />
          <Link to={props.posterUsername} className="poster-name">
            {props.posterUsername}
          </Link>
        </div>
      </header>
      <img alt="post" src={props.postPicture} className="post-image" />
      <div className="icons">
        <HeartOutline color={"#00000"} height="30px" width="30px" />
        <ChatbubbleOutline color={"#00000"} height="30px" width="30px" />
      </div>
      <p className="picture-caption">
        <Link to={props.posterUsername} className="poster-name">
          {props.posterUsername}
        </Link>
        <span>{props.caption}</span>
      </p>
      {/* comment component */}
    </article>
  );
}

export default Post;
