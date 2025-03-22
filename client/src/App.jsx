import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./routes/Landing.jsx";
import "./style-core/tailwind.css";
import "./style-core/style.css"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
