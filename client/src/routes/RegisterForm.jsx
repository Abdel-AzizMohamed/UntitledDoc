import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../comps/Header/Header";
import AuthInputField from "../comps/Form/AuthInputField";
import { Link } from "react-router-dom";
import "../style-core/forms.css";
import axios, { apis } from "../api/axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[*@#$%])[^\s]{8,24}$/;

function RegisterForm() {
  const [username, setUsername] = useState(""),
    [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [confirmPassword, setConfirmPassword] = useState("");
  const [fieldFocus, setFieldFocus] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [fieldValid, setFieldValid] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const navigate = useNavigate();

  async function register(e) {
    e.preventDefault();

    try {
      const response = await axios.post(apis.register, {
        username: username,
        email: email,
        password: password,
        confirm_password: confirmPassword,
      });
      navigate("/login", {
        state: { message: "Account created successfully!" },
      });
    } catch (err) {
      if (!err?.response) {
        throw new Error("No Server Response.");
      } else {
        throw new Error(err?.response?.data?.message);
      }
    }
  }

  useEffect(() => {
    const validation = USER_REGEX.test(username);
    setFieldValid((v) => ({ ...v, username: validation }));
  }, [username]);

  useEffect(() => {
    const validation = EMAIL_REGEX.test(email);
    setFieldValid((v) => ({ ...v, email: validation }));
  }, [email]);

  useEffect(() => {
    const pwdValidation = PWD_REGEX.test(password);
    const cfValidation = password == confirmPassword && pwdValidation;
    setFieldValid((v) => ({
      ...v,
      password: pwdValidation,
      confirmPassword: cfValidation,
    }));
  }, [password, confirmPassword]);

  return (
    <>
      <header>
        <Header />
      </header>
      <main className="form-wrapper">
        <Toaster />
        <form
          action=""
          onSubmit={(e) =>
            toast.promise(register(e), {
              loading: "Registering your account...",
              error: (err) => err.message || "Registration failed.",
            })
          }
        >
          <div className="form-header">
            <h2>sign up</h2>
            <span>sign up to continue</span>
          </div>
          <div className="field-group">
            <AuthInputField
              name="username"
              fieldType="text"
              fieldValue={username}
              setField={setUsername}
              fieldFocus={fieldFocus}
              setFocus={setFieldFocus}
              fieldValid={fieldValid}
            />
            {fieldFocus.username && (
              <p className="tool-tip">
                <FontAwesomeIcon icon="circle-info" />
                4 to 24 characters.
                <br />
                Must begin with a letter.
                <br />
                Letters, numbers, underscores, hyphens allowed.
              </p>
            )}
          </div>
          <div className="field-group">
            <AuthInputField
              name="email"
              fieldType="text"
              fieldValue={email}
              setField={setEmail}
              fieldFocus={fieldFocus}
              setFocus={setFieldFocus}
              fieldValid={fieldValid}
            />
            {fieldFocus.email && (
              <p className="tool-tip">
                <FontAwesomeIcon icon="circle-info" />
                Must provide a valid email.
              </p>
            )}
          </div>
          <div className="field-group">
            <AuthInputField
              name="password"
              fieldType="password"
              fieldValue={password}
              setField={setPassword}
              fieldFocus={fieldFocus}
              setFocus={setFieldFocus}
              fieldValid={fieldValid}
            />
            {fieldFocus.password && (
              <p className="tool-tip">
                <FontAwesomeIcon icon="circle-info" />
                8 to 24 characters.
                <br />
                Must include uppercase and lowercase letters, a number and a
                special character.
                <br />
                Allowed special characters: ! @ # $ %
                <br />
                Spaces are not allowed
              </p>
            )}
          </div>
          <div className="field-group">
            <AuthInputField
              name="confirmPassword"
              fieldType="password"
              fieldValue={confirmPassword}
              setField={setConfirmPassword}
              fieldFocus={fieldFocus}
              setFocus={setFieldFocus}
              fieldValid={fieldValid}
            />
            {fieldFocus.confirmPassword && (
              <p className="tool-tip">
                <FontAwesomeIcon icon="circle-info" />
                Must match the first password input field.
              </p>
            )}
          </div>
          <input
            type="submit"
            className="submit-button"
            value="sign up"
            disabled={
              !fieldValid.username ||
              !fieldValid.email ||
              !fieldValid.password ||
              !fieldValid.confirmPassword
                ? true
                : false
            }
          />
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
