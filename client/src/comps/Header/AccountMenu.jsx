import { Link } from "react-router-dom";

function AccountMenu() {
  return (
  <div className="account-menu">
    <Link to="/login" className="log-in">Log in</Link>
    <Link to="/sign-up" className="sign-up">sign up for free</Link>
  </div>
  )
}

export default AccountMenu;
