import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../comps/Header/Header";
import AuthInputField from "../comps/Form/AuthInputField";
import { Link } from "react-router-dom";
import "../style-core/forms.css";
import axios from "../api/axios";
import { apis } from "../api/axios";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const [name, setName] = useState(""),
    [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [confirmPassword, setConfirmPassword] = useState(""),
    [serverError, setServerError] = useState(""),
    [fieldFocus, setFieldFocus] = useState({
      "username": false,
      "email": false,
      "password": false,
      "confirmPassword": false
    }),
    [fieldError, setFieldError] = useState({
      "username": true,
      "email": true,
      "password": true,
      "confirmPassword": true
    });

  const navigate = useNavigate();

  async function register(e) {
    e.preventDefault();

    try {
      const response = await axios.post(apis.register, {
        username: name,
        email: email,
        password: password,
        confirm_password: confirmPassword
      })

      console.log(JSON.stringify(response?.data));
      console.log(response?.data);
      navigate("/login")

    } catch(err) {
      if (!err?.response) {
        console.log("No Server Response.")
      } else {        
        console.log(err?.response?.status)
        setServerError(err?.response?.data?.message)
      }
    }
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
          {serverError && 
            <div className="error-container">
              <FontAwesomeIcon className="error-icon" icon="warning" />
              <span className="error-massage">{serverError}</span>
            </div>
          }
          <div className="field-group">
            <AuthInputField
              name="username"
              fieldType="text"
              fieldValue={name}
              setField={setName}
              setFocus={setFieldFocus}
              fieldError={fieldError}
            />
            <FontAwesomeIcon className={fieldError.username && name ? "error-icon" : "offscreen"} icon="circle-exclamation" />
            <FontAwesomeIcon className={!fieldError.username ? "success-icon" : "offscreen"} icon="circle-check" />
            {fieldFocus.username && 
              <p className="tool-tip">
                <FontAwesomeIcon icon="circle-info" />
                4 to 24 characters.<br />
                Must begin with a letter.<br />
                Letters, numbers, underscores, hyphens allowed.
              </p>
            }
          </div>
          <div className="field-group">
            <AuthInputField
              name="email"
              fieldType="email"
              fieldValue={email}
              setField={setEmail}
              setFocus={setFieldFocus}
              fieldError={fieldError}
            />
            {fieldFocus.email && 
              <p className="tool-tip">
                <FontAwesomeIcon icon="circle-info" />
                Must be a vaild email address.
              </p>
            }
          </div>
          <div className="field-group">
            <AuthInputField
              name="password"
              fieldType="password"
              fieldValue={password}
              setField={setPassword}
              setFocus={setFieldFocus}
              fieldError={fieldError}
            />
            {fieldFocus.password && 
              <p className="tool-tip">
                <FontAwesomeIcon icon="circle-info" />
                8 to 24 characters.<br />
                Must include uppercase and lowercase letters, a number and a special character.<br />
                Allowed special characters: ! @ # $ %
              </p>
            }
          </div>
          <div className="field-group">
            <AuthInputField
              name="confirmPassword"
              fieldType="password"
              fieldValue={confirmPassword}
              setField={setConfirmPassword}
              setFocus={setFieldFocus}
              fieldError={fieldError}
            />
            {fieldFocus.confirmPassword && 
              <p className="tool-tip">
                <FontAwesomeIcon icon="circle-info" />
                Must match the password field.
              </p>
            }
          </div>
          <input type="submit" className="submit-button" value="sign up" />
          <div className="remember-me">
            <input id="remember" type="checkbox" />
            <label htmlFor="remember">remember me</label>
          </div>
          <div className="quick-access">
            <span className="quick-title">quick access</span>
            <div className="social-container">
              <Link to="">
                <FontAwesomeIcon icon={["fab", "google"]} />
              </Link>
            </div>
          </div>
        </form>
        <span className="login-switch">
          Already have an account? <Link to="/login">Sign In</Link>
        </span>
      </main>
    </>
  );
}

export default RegisterForm;
