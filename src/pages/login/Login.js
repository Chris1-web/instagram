import Button from "../../components/Button";
import Form from "../../components/Form";

function Login() {
  return (
    <div>
      <Form>
        <div className="email-container">
          <label htmlFor="email">email address</label>
          <input type="email" name="email" />
        </div>
        <div className="password-container">
          <label htmlFor="password">password</label>
          <input type="password" name="password" />
        </div>
        <Button title="Log In" />
      </Form>
    </div>
  );
}

export default Login;
