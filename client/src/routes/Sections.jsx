import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Document from "../comps/Document/Document";
import Pagination from "../comps/Pagination/Pagination";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { apis } from "../api/axios";
import AskPopup from "../comps/popups/AskPopup";
import useDoc from "../hooks/useDoc";

function Sections() {
  const [sections, setSections] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);

  const [accept, setAccept] = useState(false),
    [showPopup, setShowPopup] = useState(false),
    [activeDocument, setActiveDocument] = useState(-1);

  const { doc } = useDoc();
  const axiosPrivate = useAxiosPrivate();

  async function getSections() {
    try {
      const response = await axiosPrivate.get(
        `${apis.sections}${currentPage}/${doc.chapter.id}/`
      );
      setSections(response.data.data);
      setTotalPages(response.data.totalPages);
      setHasNext(response.data.hasNext);
      setHasPrevious(response.data.hasPrevious);
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteSection() {
    if (activeDocument === -1) return;
    try {
      const response = await axiosPrivate.delete(
        `${apis.deleteSection}${activeDocument}/`
      );
      console.log(response);
      setShowPopup(() => false);
      setAccept(() => false);
      setActiveDocument(() => -1);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    deleteSection();
    getSections();
  }, [accept]);

  useEffect(() => {
    getSections();
  }, [currentPage]);

  return (
    <div className="documents-menu">
      <div className="documents-navigation">
        <Link to="/documents">
          <FontAwesomeIcon icon="caret-left" className="return-bottom" />
        </Link>
        <ul className="nav-items">
          <Link to="/documents">
            <li>.</li>
          </Link>
          <Link to={doc.chapter.url}>
            <li>{doc.document.title}</li>
          </Link>
          <li>{doc.chapter.title}</li>
        </ul>
        <Link to="/add/section" className="add-button" state={doc.chapter.id}>
          <FontAwesomeIcon icon="plus" />
        </Link>
      </div>
      <div className="documents">
        {sections.map((item) => {
          const date = new Date(item.creationDate);

          const formatted = date.toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
          });
          return (
            <Document
              key={item.id}
              data={{
                id: item.id,
                title: item.name,
                datetime: formatted,
                keyName: "section",
                url: "/sections",
              }}
              nav="/records"
              onActiveDocument={setActiveDocument}
              onShowPopup={setShowPopup}
            />
          );
        })}
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        hasNext={hasNext}
        HasPrevious={hasPrevious}
        pagCount={3}
      />
      {showPopup && (
        <AskPopup
          title="deleting section"
          description="this action is permanent."
          type="warning"
          setAccept={setAccept}
          setShowPopup={setShowPopup}
        />
      )}
    </div>
  );
}

export default Sections;
