import { HeartOutline, ChatbubbleOutline } from "react-ionicons";
import { Link } from "react-router-dom";
import ProfileImage from "../ProfileImage/ProfileImage";
import likeOutline from "../../image/like.png";
import Love from "../../image/love.png";
import Comment from "../../image/comment.png";
import "./Post.css";

// firebase
import { auth } from "../../Firebase/Firebase-init";

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
        {!props.likes.includes(auth.currentUser.displayName) && (
          <img
            src={likeOutline}
            alt="love-outline"
            onClick={() => props.likePost(props.postId)}
          />
        )}
        {props.likes.includes(auth.currentUser.displayName) && (
          <img
            src={Love}
            alt="love-outline"
            onClick={() => props.unlikePost(props.postId)}
          />
        )}
        <img src={Comment} className="comment" alt="comment" />
      </div>
      <div className="number-of-likes">{props.likes.length} likes</div>
      <p className="picture-caption">
        <Link to={props.posterUsername} className="poster-name">
          {props.posterUsername}
        </Link>
        <span>{props.caption}</span>
      </p>
      <div className="date-of-creation">{props.date}</div>
      {/* comment component */}
    </article>
  );
}

export default Post;
