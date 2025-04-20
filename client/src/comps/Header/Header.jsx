import { Link } from "react-router-dom";
import Navigation from "./Navigation";
import MobileNav from "./MobileNav";
import AccountMenu from "./AccountMenu";

function Header() {
  return (
    <div className="low-nav flex justify-between items-center">
      <div className="flex justify-start content-center">
        <span className="logo">
          <Link to="/">doc</Link>
        </span>
        <Navigation />
      </div>
      <MobileNav />
      <AccountMenu />
    </div>
  );
}

export default Header;
