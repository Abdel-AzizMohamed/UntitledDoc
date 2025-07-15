import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../comps/Header/Header";
import InputField from "../comps/Form/InputField";
import { Link } from "react-router-dom";
import "../style-core/forms.css";
import axios from 'axios';
import Cookies from "js-cookie";

function Loginform() {
  const [email, setEmail] = useState(""),
    [password, setPassword] = useState("");

  async function login(e) {
    e.preventDefault();
    try {

      const response = await axios.post('https://7b979163062c.ngrok-free.app/login/', {
        email: email,
        password: password
      })
      console.log(response)
      console.log(response.data)
      Cookies.set("AGXACCESS", response.data.access, { expires: 1 });
      Cookies.set("AGXREFRESH", response.data.refresh, { expires: 7 });
    } catch(err) {
      console.log(err)
      console.log(err.response)
    }

  }

  async function logout(e) {
    e.preventDefault();
    try {

      const response = await axios.post('https://7b979163062c.ngrok-free.app/logout/',
        {"refresh": Cookies.get("AGXREFRESH")}
      )
      console.log(response)
      console.log(response.data)
    } catch(err) {
      console.log(err)
      console.log(err.response)
    }

  }

  return (
    <>
      <header>
        <Header />
      </header>
      <main className="form-wrapper">
        <form action="" onSubmit={login} >
          <div className="form-header">
            <h2>sign up</h2>
            <span>sign up to continue</span>
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
          <input type="submit" className="submit-button" value="sign in" />
          <button className="submit-button" onClick={logout}>logout</button>
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

export default Loginform;
