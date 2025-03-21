import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav className="navigation">
      <li className="drop-down">
        <div className="drop-menu">
          <div className="drop-header">
            <h3 className="drop-title">tutorials - 1</h3>
          </div>
          <div className="drop-content">
            <a href="#">
              learn <span className="bold upper">html</span>
            </a>
            <a href="#">
              learn <span className="bold upper">html</span>
            </a>
            <a href="#">
              learn <span className="bold upper">html</span>
            </a>
            <a href="#">
              learn <span className="bold upper">html</span>
            </a>
            <a href="#">
              learn <span className="bold upper">html</span>
            </a>
          </div>
        </div>
      </li>
      <li className="nav-item"><Link to="/browse">browse</Link></li>
    </nav>
  );
}

export default Navigation;
