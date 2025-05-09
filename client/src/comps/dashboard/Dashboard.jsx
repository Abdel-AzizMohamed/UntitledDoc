import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <nav className="top-nav flex justify-start align-center">
      <li>
        <Link to={"/categorizing"}>categorizing</Link>
      </li>
      <li>
        <Link to={"/articles"}>articles</Link>
      </li>
    </nav>
  );
}

export default Dashboard;
