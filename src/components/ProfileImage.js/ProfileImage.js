import { Link } from "react-router-dom";

function ProfileImage(props) {
  return (
    <>
      <Link to={props.link}>
        <img src={props.picture} alt={props.username} />
      </Link>
    </>
  );
}

export default ProfileImage