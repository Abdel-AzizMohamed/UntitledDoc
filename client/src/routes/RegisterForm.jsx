import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../comps/Header/Header";
import InputField from "../comps/Form/InputField";
import { Link } from "react-router-dom";
import "../style-core/forms.css";
import axios from 'axios';

function RegisterForm() {
  const [name, setName] = useState(""),
    [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [confirmPassword, setConfirmPassword] = useState("");

  async function register(e) {
    e.preventDefault();
    const response = await axios.post('https://7b979163062c.ngrok-free.app/register/', {
      username: name,
      email: email,
      password: password
    })

    console.log(response)
    console.log(response.data)
  }

  return (
    <>
      <header>
        <Header />
      </header>
      <main className="form-wrapper">
        <form action="" onSubmit={register} >
          <div className="form-header">
            <h2>sign up</h2>
            <span>sign up to continue</span>
          </div>
          <div className="field-group">
            <InputField
              name="name"
              fieldType="text"
              fieldValue={name}
              setField={setName}
            />
            <div className="error-container">
              <FontAwesomeIcon className="error-icon" icon="warning" />
              <span className="error-massage">This is an error</span>
            </div>
          </div>
          <div className="field-group">
            <InputField
              name="email"
              fieldType="email"
              fieldValue={email}
              setField={setEmail}
            />
            {/* <span className="error-massage">This is an error</span> */}
          </div>
          <div className="field-group">
            <InputField
              name="password"
              fieldType="password"
              fieldValue={password}
              setField={setPassword}
            />
            {/* <span className="error-massage">This is an error</span> */}
          </div>
          <div className="field-group">
            <InputField
              name="confirm password"
              fieldType="password"
              fieldValue={confirmPassword}
              setField={setConfirmPassword}
            />
            {/* <span className="error-massage">This is an error</span> */}
          </div>
          <input type="submit" className="submit-button" value="sign up" />
          <div className="remember-me">
            <input id="remember" type="checkbox" />
            <label htmlFor="remember">remember me</label>
          </div>
          <div className="quick-access">
            <span className="quick-title">quick access</span>
            <div className="social-container">
{/*              <Link to="">
                <FontAwesomeIcon icon={["fab", "facebook"]} />
              </Link>
*/}              <Link to="">
                <FontAwesomeIcon icon={["fab", "google"]} />
              </Link>
              {/* <Link to=""> */}
              {/*   <FontAwesomeIcon icon={["fab", "twitter"]} /> */}
              {/* </Link> */}
            </div>
          </div>
        </form>
        <span className="login-switch">
          Already have an account? <Link to="login">Sign In</Link>
        </span>
      </main>
    </>
  );
}

export default RegisterForm;
