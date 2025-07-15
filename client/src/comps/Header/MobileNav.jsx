import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher.jsx";

function MobileNav() {
  const [dropDown, setDropDown] = useState(false);

  return (
    <nav className="mob-nav vis-xe-fl">
      <li>
        <ThemeSwitcher />
      </li>
      <li className={dropDown ? "active" : ""}>
        <FontAwesomeIcon onClick={() => setDropDown((d) => !d)} icon="gear" />
        <div className="drop-down">
          <div className="account-menu">
            <Link to="/login" className="log-in">Log in</Link>
            <Link to="/register" className="sign-up">Sign Up for free</Link>
          </div>
          <ul className="navigation">
            <li>
              <Link to="/">tutorials</Link>
            </li>
            <li>
              <Link to="/">browes</Link>
            </li>
          </ul>
        </div>
      </li>
    </nav>
  );
}

export default MobileNav;
