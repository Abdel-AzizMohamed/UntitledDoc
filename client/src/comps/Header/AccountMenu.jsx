import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AccountMenu() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") ?? "light");

  function switchTheme() {
    const currentTheme = theme === "light" ? "dark" : "light";
    setTheme(() => currentTheme);
    localStorage.setItem("theme", currentTheme);
    document.body.setAttribute("theme", currentTheme)
  }

  useEffect(() => {
    document.body.setAttribute("theme", theme) 
  }, [])

  return (
    <div className="account-menu flex justify-center items-center p-4">
      <div onClick={switchTheme} className="theme-button">
        <FontAwesomeIcon icon={theme === "light" ? "sun": "moon"} />
      </div>
      <Link to="/login" className="log-in">
        Log in
      </Link>
      <Link to="/sign-up" className="sign-up">
        sign up for free
      </Link>
    </div>
  );
}

export default AccountMenu;
