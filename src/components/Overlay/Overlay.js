import { CloseOutline } from "react-ionicons";

function Overlay(props) {
  return (
    <div className="add-new-post">
      <div className="background-overlay" onClick={props.closeAddNewPost}>
        <button className="close-modal-btn" onClick={props.closeAddNewPost}>
          <CloseOutline color={"#fff"} height="30px" width="30px" />
        </button>
      </div>
      {props.children}
    </div>
  );
}

export default Overlay;
