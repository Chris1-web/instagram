function Button(props) {
  return (
    <button className={props.classname} disabled={props.disabled}>
      {props.title}
    </button>
  );
}

export default Button;
