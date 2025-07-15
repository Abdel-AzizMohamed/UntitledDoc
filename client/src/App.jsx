import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./routes/Landing.jsx";
import RegisterForm from "./routes/RegisterForm.jsx";
import LoginForm from "./routes/LoginForm.jsx";
import "./style-core/style.css";
import "./style-core/media.css";
import "./style-core/tailwind.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fas, far, fab);
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
