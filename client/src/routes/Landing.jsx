import { Link } from "react-router-dom";
import Header from "../comps/Header/Header";
import Dashboard from "../comps/dashboard/Dashboard";

function Landing() {
  return (
    <>
      <header>
        <Dashboard />
        <Header />
      </header>
      <main className="landing">
        <h1 className="landing-title">write your journey</h1>
        <p className="landing-info">
          the free and flexible app for your thoughts
        </p>
        <div className="">
          <button className="download-app">get doc for linux</button>
          <Link to="/more-platforms" className="more-platform">
            more platforms
          </Link>
        </div>
      </main>
    </>
  );
}

export default Landing;
