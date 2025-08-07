import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast, { Toaster } from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import Header from "../comps/Header/Header";
import AuthInputField from "../comps/Form/AuthInputField";
import "../style-core/forms.css";
import axios, { apis } from "../api/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function LoginForm() {
  const [email, setEmail] = useState(""),
    [password, setPassword] = useState("");
  const [serverError, setServerError] = useState("");
  const [fieldFocus, setFieldFocus] = useState({
    email: false,
    password: false,
  });
  const [fieldValid, setFieldValid] = useState({
    email: false,
    password: false,
  });

  const location = useLocation();
  const navigate = useNavigate();
  const successMessage = location.state?.message;
  const from = location.state?.from?.pathname || "/";

  const axiosPrivate = useAxiosPrivate();

  const { setAuth } = useAuth();

  async function login(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        apis.login,
        {
          email: email,
          password: password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response?.data);
      const accessToken = response?.data?.accessToken;
      setAuth({ accessToken });
      // navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        throw new Error("No Server Response.");
      } else {
        throw new Error(err?.response?.data?.message);
      }
    }
  }
  async function login() {
    try {
      const response = await axiosPrivate.post();
      console.log(response?.data);
    } catch (err) {
      if (!err?.response) {
        throw new Error("No Server Response.");
      } else {
        throw new Error(err?.response?.data?.message);
      }
    }
  }

  async function payment() {
    try {
      const response = await axiosPrivate.post(
        "api/payment/initiate-payment/",
        {
          academic_year_id: 2,
          mobile: "01010101010",
          payment_method: "wallet",
          payer_email: "example@ex.com",
          payer_first_name: "abdelaziz",
          payer_last_name: "mohamed",
        }
      );
      console.log(response);
      window.location.href = response.data.redirect_url;
    } catch (err) {
      if (!err?.response) {
        throw new Error("No Server Response.");
      } else {
        throw new Error(err?.response?.data?.message);
      }
    }
  }

  useEffect(() => {
    const validation = EMAIL_REGEX.test(email);
    setFieldValid((v) => ({ ...v, email: validation }));
  }, [email]);

  useEffect(() => {
    setFieldValid((v) => ({
      ...v,
      password: password.trim() !== "",
    }));
  }, [password]);

  useEffect(() => {
    if (successMessage) toast.success(successMessage);
  }, [successMessage]);

  return (
    <>
      <header>
        <Header />
      </header>
      <main className="form-wrapper">
        <Toaster />
        <form action="" onSubmit={login}>
          <div className="form-header">
            <h2>sign in</h2>
          </div>
          {serverError && (
            <div className="error-container">
              <FontAwesomeIcon className="error-icon" icon="warning" />
              <span className="error-massage">{serverError}</span>
            </div>
          )}
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
          </div>
          <input
            type="submit"
            className="submit-button"
            value="Login"
            //disabled={!fieldValid.email || !fieldValid.password ? true : false}
          />
          <button className="submit-button" onClick={payment}>
            pay
          </button>
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
          Need an account? <Link to="/register">Sign up</Link>
        </span>
      </main>
    </>
  );
}

export default LoginForm;
