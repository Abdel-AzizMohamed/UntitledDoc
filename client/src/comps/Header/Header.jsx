import { useEffect } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Navigation from "./Navigation";
import MobileNav from "./MobileNav";
import AccountMenu from "./AccountMenu";
import userAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import { apis } from "../../api/axios";

function Header() {
  const axiosPrivate = userAxiosPrivate();
  const { auth, setAuth } = useAuth();

  async function getUserInfo() {
    try {
      const response = await axiosPrivate.get(apis.me);
      const message = response?.data?.message;
      // toast.success("fetched");
      setAuth((a) => ({ ...a, user: response?.data }));
    } catch (err) {
      if (!err?.response) {
        throw new Error("No Server Response.");
      } else if (err?.response?.status === 401) {
        throw new Error("Unauthorized access");
      } else {
        throw new Error(err?.response?.data?.message.text);
      }
    }
  }

  async function checkUserToken() {
    try {
      const response = await axiosPrivate.get(apis.verify);
      const message = response?.data?.message;
    } catch (err) {
      if (!err?.response) {
        throw new Error("No Server Response.");
      } else if (err?.response?.status === 401) {
        setAuth({});
      } else {
        throw new Error(err?.response?.data?.message.text);
      }
    }
  }

  useEffect(() => {
    if (auth?.user) checkUserToken();
    else {
      getUserInfo();
      // toast.promise(getUserInfo(), {
      //   loading: "Fetching user info...",
      //   error: (err) => err.message || "Fetching faild.",
      // });
    }
  }, []);

  return (
    <div className="low-nav">
      <Toaster />
      <div className="left-nav">
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
