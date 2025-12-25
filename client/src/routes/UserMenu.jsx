import { useLocation } from "react-router-dom";
import { DocumentProvider } from "../context/DocumentProvider.jsx";
import Header from "../comps/Header/Header";
import UserSidebar from "../comps/Sidebar/UserSidebar";
import Profile from "./Profile";
import Documents from "./Documents.jsx";
import AddDocument from "../comps/Document/AddDocument.jsx";
import Chapters from "./Chapters.jsx";
import AddChapter from "../comps/Document/AddChapter.jsx";
import "../style-core/usermenu.css";
import Sections from "./Sections.jsx";
import AddSection from "../comps/Document/AddSection.jsx";
import Records from "./Records.jsx";
import AddRecord from "../comps/Document/AddRecord.jsx";
import EditRecord from "../comps/Document/EditRecord.jsx";

function UserMenu() {
  const location = useLocation();
  const navSelection = location.pathname.slice(1);

  return (
    <>
      <header>
        <Header />
      </header>
      <main className="user-wrapper">
        <DocumentProvider>
          <UserSidebar activeNav={navSelection} />
          {navSelection === "profile" && <Profile />}
          {navSelection === "documents" && <Documents />}
          {navSelection === "add/document" && <AddDocument />}
          {navSelection === "chapters" && <Chapters />}
          {navSelection === "add/chapter" && <AddChapter />}
          {navSelection === "sections" && <Sections />}
          {navSelection === "add/section" && <AddSection />}
          {navSelection === "records" && <Records />}
          {navSelection === "add/record" && <AddRecord />}
          {navSelection === "edit/record" && <EditRecord />}
        </DocumentProvider>
      </main>
    </>
  );
}

export default UserMenu;
