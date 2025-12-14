import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Document from "../comps/Document/Document";
import Pagination from "../comps/Pagination/Pagination";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { apis } from "../api/axios";
import AskPopup from "../comps/popups/AskPopup";

function Documents() {
  const [documents, setDocuments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);

  const [accept, setAccept] = useState(false),
    [showPopup, setShowPopup] = useState(false),
    [activeDocument, setActiveDocument] = useState(-1);

  const axiosPrivate = useAxiosPrivate();

  async function getDocuments() {
    try {
      const response = await axiosPrivate.get(
        `${apis.documents}${currentPage}/`
      );
      setDocuments(response.data.data);
      setTotalPages(response.data.totalPages);
      setHasNext(response.data.hasNext);
      setHasPrevious(response.data.hasPrevious);
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteDocument() {
    if (activeDocument === -1) return;
    try {
      const response = await axiosPrivate.delete(
        `${apis.deleteDocument}${activeDocument}/`
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
    deleteDocument();
    getDocuments();
  }, [accept]);

  useEffect(() => {
    getDocuments();
  }, [currentPage]);

  return (
    <div className="documents-menu">
      <div className="documents-navigation">
        <FontAwesomeIcon icon="caret-left" className="return-bottom" />
        <ul className="nav-items">
          <li>.</li>
        </ul>
        <Link to="/add/document" className="add-button">
          <FontAwesomeIcon icon="plus" />
        </Link>
      </div>
      <div className="documents">
        {documents.map((item) => {
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
                keyName: "document",
                url: "/documents",
              }}
              nav="/chapters"
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
          title="deleting document"
          description="this action is permanent."
          type="warning"
          setAccept={setAccept}
          setShowPopup={setShowPopup}
        />
      )}
    </div>
  );
}

export default Documents;
