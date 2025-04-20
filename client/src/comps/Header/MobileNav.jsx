import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher.jsx"

function MobileNav() {
  const [dropDown, setDropDown] = useState(false);

  return (
    <nav className="mob-nav vis-xe">
      <li>
        <ThemeSwitcher />
      </li>
      <li><FontAwesomeIcon onClick={() => setDropDown((d) => !d)} className={dropDown ? "active": ""} icon="gear" /></li>
    </nav>
  );
}

export default MobileNav;
