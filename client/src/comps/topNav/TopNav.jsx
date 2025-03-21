import { Link } from "react-router-dom";

function TopNav() {
  return (
    <nav className="top-nav">
      <li>
        <Link to={"/categorizing"}>categorizing</Link>
      </li>
      <li>
        <Link to={"/articles"}>articles</Link>
      </li>
    </nav>
  );
}

export default TopNav;
