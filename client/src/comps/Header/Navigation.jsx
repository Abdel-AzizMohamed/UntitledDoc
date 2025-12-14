import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function Navigation() {
  const [dropDown, setDropDown] = useState(false);

  return (
    <nav className="navigation hid-xe">
{/*      <li className={`nav-item drop-down ${dropDown ? "active" : ""}`}>
        <div onClick={() => setDropDown((d) => !d)} className="drop-down-label">
          tutorials
          <FontAwesomeIcon icon="caret-down" />
        </div>
        <div className="drop-menu" style={dropDown ? {display: "block"} : {}}>
          <div className="drop-header flex items-center flex-start mb-12">
            <FontAwesomeIcon icon="caret-left" />
            <h3 className="drop-title">tutorials - 1</h3>
            <FontAwesomeIcon icon="caret-right" />
          </div>
          <div className="drop-content">
            <a href="#">
              learn <span className="uppercase font-bold">html</span>
            </a>
            <a href="#">
              learn <span className="uppercase font-bold">html</span>
            </a>
            <a href="#">
              learn <span className="uppercase font-bold">html</span>
            </a>
            <a href="#">
              learn <span className="uppercase font-bold">html</span>
            </a>
            <a href="#">
              learn <span className="uppercase font-bold">html</span>
            </a>
            <a href="#">
              learn <span className="uppercase font-bold">html</span>
            </a>
          </div>
        </div>
      </li>
*/}      <li className="nav-item">
        <Link to="/browse">browse</Link>
      </li>
    </nav>
  );
}

export default Navigation;
