import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher"


function AccountMenu() {
  return (
    <div className="account-menu flex justify-center items-center p-4 hid-xe">
      <ThemeSwitcher />
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
