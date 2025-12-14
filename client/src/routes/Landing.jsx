import { Link } from "react-router-dom";
import Header from "../comps/Header/Header";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import "../style-core/landing.css";

function Landing() {
  const axiosPrivate = useAxiosPrivate();

  // async function getUser() {
  //   try {
  //     const response = await axiosPrivate.get(apis.me);
  //     console.log(response?.data);
  //     setUser(response?.data);
  //   } catch (err) {
  //     if (!err?.response) {
  //       throw new Error("No Server Response.");
  //     } else {
  //       throw new Error(err?.response?.data?.message);
  //     }
  //   }
  // }

  // useEffect(() => {
  //   getUser();
  // }, []);

  return (
    <>
      <header>
        <Header />
      </header>
      <main className="landing">
        <h1 className="landing-title">write your journey</h1>
        <p className="landing-info">
          The free and flexible app for your thoughts
        </p>
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
