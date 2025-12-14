import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Document from "../comps/Document/Document";
import Pagination from "../comps/Pagination/Pagination";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { apis } from "../api/axios";
import AskPopup from "../comps/popups/AskPopup";
import useDoc from "../hooks/useDoc";

function Chapters() {
  const [chapters, setChapters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);

  const [accept, setAccept] = useState(false),
    [showPopup, setShowPopup] = useState(false),
    [activeDocument, setActiveDocument] = useState(-1);

  const { doc } = useDoc();
  const axiosPrivate = useAxiosPrivate();

  async function getChapters() {
    try {
      const response = await axiosPrivate.get(
        `${apis.chapters}${currentPage}/${doc.document.id}/`
      );
      setChapters(response.data.data);
      setTotalPages(response.data.totalPages);
      setHasNext(response.data.hasNext);
      setHasPrevious(response.data.hasPrevious);
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteChapter() {
    if (activeDocument === -1) return;
    try {
      const response = await axiosPrivate.delete(
        `${apis.deleteChapter}${activeDocument}/`
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
    deleteChapter();
    getChapters();
  }, [accept]);

  useEffect(() => {
    getChapters();
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
          <li>{doc.document.title}</li>;
        </ul>
        <Link to="/add/chapter" className="add-button" state={doc.document.id}>
          <FontAwesomeIcon icon="plus" />
        </Link>
      </div>
      <div className="documents">
        {chapters.map((item) => {
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
                keyName: "chapter",
                url: "/chapters",
              }}
              nav="/sections"
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
          title="deleting chapter"
          description="this action is permanent."
          type="warning"
          setAccept={setAccept}
          setShowPopup={setShowPopup}
        />
      )}
    </div>
  );
}

export default Chapters;
