import { Link } from "react-router-dom";

function UserSidebar({ activeNav }) {
  return (
    <ul className="user-navigation">
      <li className={activeNav === "profile" ? "active" : ""}>
        <div className="overlay"></div>
        <Link to="/profile">profile</Link>
      </li>
      <li className={activeNav === "documents" ? "active" : ""}>
        <div className="overlay"></div>
        <Link to="/documents">documents</Link>
      </li>
      <li className={activeNav === "setting" ? "active" : ""}>
        <div className="overlay"></div>
        <Link to="/setting">setting</Link>
      </li>
    </ul>
  );
}

export default UserSidebar;
