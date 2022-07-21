function Form(props) {
  return (
    <form>
      <div className="header">
        <h1>{props.header}</h1>
      </div>
      {props.children}
      <footer>Don't have an account? Sign up</footer>
    </form>
  );
}
export default Form;
