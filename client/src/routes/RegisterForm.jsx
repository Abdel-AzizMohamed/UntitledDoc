import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../comps/Header/Header";
import InputField from "../comps/Form/InputField";
import { Link } from "react-router-dom";

function RegisterForm() {
  const [name, setName] = useState(""),
    [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [confirmPassword, setConfirmPassword] = useState("");

  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <form action="">
          <div className="form-header">
            <h2>sign up</h2>
            <span>sign up to continue</span>
          </div>
          <div className="field-group">
            <InputField name="name" fieldType="text" fieldValue={name} setField={setName} />
            <span className="error-text">This is an error</span>
          </div>
          <div className="field-group">
            <InputField name="email" fieldType="email" fieldValue={email} setField={setEmail} />
            {/* <span className="error-text">This is an error</span> */}
          </div>
          <div className="field-group">
            <InputField name="password" fieldType="password" fieldValue={password} setField={setPassword} />
            {/* <span className="error-text">This is an error</span> */}
          </div>
          <div className="field-group">
            <InputField name="confirm password" fieldType="password" fieldValue={confirmPassword} setField={setConfirmPassword} />
            {/* <span className="error-text">This is an error</span> */}
          </div>
          <input type="submit" className="submit-button" value="sign up" />
          <div className="rememeber-me">
            <input type="checkbox" />
            <span>remember me</span>
          </div>
          <div className="quick-access">
            <span>quick access</span>
            {/* <FontAwesomeIcon icon="facebook" /> */}
            {/* <FontAwesomeIcon icon="google" /> */}
            {/* <FontAwesomeIcon icon="twitter" /> */}
          </div>
        </form>
        <span className="login-switch">
          already have an account? <Link to="">sign in</Link>
        </span>
      </main>
    </>
  );
}

export default RegisterForm;
