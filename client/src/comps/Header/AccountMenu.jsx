import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";
import { apis } from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function AccountMenu() {
  const [showDrop, setShowDrop] = useState(false);
  const { auth, setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  async function logout() {
    try {
      const response = await axiosPrivate.post(apis.logout);
      const message = response?.data?.message;
      toast[message?.type](message?.text);
      setAuth({});
      setTimeout(() => navigate("/", { replace: true }), 800);
    } catch (err) {
      if (!err?.response) {
        throw new Error("No Server Response.");
      } else {
        throw new Error(err?.response?.data?.message.text);
      }
    }
  }

  return (
    <div className="account-menu hid-xe">
      <ThemeSwitcher />
      {auth?.user ? (
        <>
          <span className="username">{auth.user?.username}</span>
          <div className="user-menu">
            <img
              onClick={() => setShowDrop((s) => !s)}
              className={`profile-image ${showDrop ? "active" : ""}`}
              src={
                auth.user.profile_image
                  ? auth.user.profile_image
                  : "/default_profile2.png"
              }
              alt="profile-image"
            />
            <ul className={`menu-drop ${showDrop ? "active" : ""} `}>
              <Link className="profile" to="/profile">
                profile
              </Link>
              <button
                className="logout"
                onClick={() =>
                  toast.promise(logout(), {
                    loading: "Logging out...",
                    error: (err) => err.message || "Logging out failed.",
                  })
                }
              >
                logout
              </button>
            </ul>
          </div>
        </>
      ) : (
        <>
          <Link to="/login" className="log-in">
            Log in
          </Link>
          <Link to="/register" className="sign-up">
            sign up for free
          </Link>
        </>
      )}
    </div>
  );
}

export default AccountMenu;
