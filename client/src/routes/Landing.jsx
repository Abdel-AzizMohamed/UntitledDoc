import { Link } from "react-router-dom";
import Header from "../comps/Header/Header";
import Dashboard from "../comps/dashboard/Dashboard";
import { useEffect, useState } from "react";
import axios, { apis } from "../api/axios";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import ReactPlayer from "react-player";

function Landing() {
  const [user, setUser] = useState("");
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  async function getUser() {
    try {
      const response = await axiosPrivate.get(apis.me);
      console.log(response?.data);
      setUser(response?.data);
    } catch (err) {
      if (!err?.response) {
        throw new Error("No Server Response.");
      } else {
        throw new Error(err?.response?.data?.message);
      }
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <header>
        <Dashboard />
        <Header />
      </header>
      <main className="landing">
        <h1 className="landing-title">write your journey</h1>
        <p className="landing-info">
          The free and flexible app for your thoughts
        </p>
        {user && <h1>YOU ARE LOGGED IN</h1>}
        <iframe
          width="1257"
          height="665"
          src="https://www.youtube.com/embed/QaMMWRpwOhE&autoplay=1"
          title="test"
          allowFullScreen
          referrerpolicy="strict-origin-when-cross-origin"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          frameborder="0"
        ></iframe>
        <div className="platforms-container">
          <button className="download-app"></button>
          <Link to="/more-platforms" className="more-platform">
            more platforms
          </Link>
        </div>
      </main>
    </>
  );
}

export default Landing;
