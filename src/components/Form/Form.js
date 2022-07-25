function Form(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className="header">
        <h1>{props.header}</h1>
      </div>
      {props.children}
    </form>
  );
}
export default Form;
