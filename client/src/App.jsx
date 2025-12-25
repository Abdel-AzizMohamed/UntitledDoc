import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./routes/Landing.jsx";
import RegisterForm from "./routes/RegisterForm.jsx";
import LoginForm from "./routes/LoginForm.jsx";
import UserMenu from "./routes/UserMenu";
import "./style-core/style.css";
import "./style-core/header.css";
import "./style-core/forms.css";
import "./style-core/auth.css";
import "./style-core/media.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import Browse from "./routes/Browse.jsx";

library.add(fas, far, fab);
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/profile" element={<UserMenu />} />
        <Route path="/documents" element={<UserMenu />} />
        <Route path="/add/document" element={<UserMenu />} />
        <Route path="/chapters" element={<UserMenu />} />
        <Route path="/add/chapter" element={<UserMenu />} />
        <Route path="/sections" element={<UserMenu />} />
        <Route path="/add/section" element={<UserMenu />} />
        <Route path="/records" element={<UserMenu />} />
        <Route path="/add/record" element={<UserMenu />} />
        <Route path="/edit/record" element={<UserMenu />} />
        <Route path="/setting" element={<UserMenu />} />
        <Route path="/browse" element={<Browse />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
