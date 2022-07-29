import { Link } from "react-router-dom";

function ProfileImage(props) {
  return (
    <>
      <Link to={props.link}>
        <img
          src={props.picture}
          alt={props.altText}
          className="profile-image"
        />
      </Link>
    </>
  );
}

export default ProfileImage;
