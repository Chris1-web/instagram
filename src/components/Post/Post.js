import { HeartOutline, ChatbubbleOutline } from "react-ionicons";
import ProfileImage from "../ProfileImage/ProfileImage";
import "./Post.css";

function Post(props) {
  return (
    <article className="post-box">
      <header>
        <div className="poster-profile">
          <ProfileImage
            link="/"
            picture={props.posterPicture}
            alText={props.altText}
          />
          <p className="poster-name">{props.posterUsername}</p>
        </div>
      </header>
      <img alt="post" src={props.postPicture} className="post-image" />
      <div className="icons">
        <HeartOutline color={"#00000"} height="30px" width="30px" />
        <ChatbubbleOutline color={"#00000"} height="30px" width="30px" />
      </div>
      <p className="picture-caption">
        <span className="poster-name">{props.posterUsername}</span>
        <span>{props.caption}</span>
      </p>
      {/* comment component */}
    </article>
  );
}

export default Post;
