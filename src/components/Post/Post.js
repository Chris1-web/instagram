import { useState } from "react";
import { Link } from "react-router-dom";
import ProfileImage from "../ProfileImage/ProfileImage";
import likeOutline from "../../Image/like.png";
import Love from "../../Image/love.png";
import Comment from "../../Image/comment.png";
import bookmarkOutline from "../../Image/bookmark-outline.png";
import bookmarkFill from "../../Image/bookmark-fill.png";
import Form from "../Form/Form";
import Button from "../Button/Button";
import "./Post.css";

// firebase
import { auth } from "../../Firebase/Firebase-init";

function Post(props) {
  const [comment, setComment] = useState("");

  function getComment(e) {
    setComment(e.target.value);
  }

  function submitPostComment(e) {
    e.preventDefault();
    props.submitComment(e, props.postId, comment);
    setComment("");
  }
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
        <div className="left">
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
          <Link to={"/post/" + props.postId}>
            <img src={Comment} className="comment" alt="comment" />
          </Link>
        </div>
        <div className="right">
          {!props.bookmark.includes(auth.currentUser.displayName) && (
            <img
              src={bookmarkOutline}
              alt="book-outline"
              onClick={() => props.bookmarkPost(props.postId)}
            />
          )}
          {props.bookmark.includes(auth.currentUser.displayName) && (
            <img
              src={bookmarkFill}
              alt="love-outline"
              onClick={() => props.unbookmarkPost(props.postId)}
            />
          )}
        </div>
      </div>
      <div className="number-of-likes">{props.likes.length} likes</div>
      <p className="picture-caption">
        <Link to={props.posterUsername} className="poster-name">
          {props.posterUsername}
        </Link>
        <span>{props.caption}</span>
      </p>
      <p className="view-comments">
        <Link to={"/post/" + props.postId}>View all comments</Link>
      </p>
      <div className="date-of-creation">{props.date}</div>
      {/* comment component */}
      <Form handleSubmit={submitPostComment}>
        <input
          className="comment"
          placeholder="Add a comment..."
          value={comment}
          onChange={getComment}
        />
        <Button
          classname="post-comment"
          title="Post"
          disabled={props.disablePost}
        />
      </Form>
    </article>
  );
}

export default Post;
