import { Children } from "react";

function Form(props) {
  return (
    <form>
      <div className="header">
        <h1>{props.header}</h1>
      </div>
      {Children}
      <footer>Don't have an account? Sign up</footer>
    </form>
  );
}
export default Form;
