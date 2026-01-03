import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useDoc from "../../hooks/useDoc";

function Document({ data, nav, onActiveDocument, onShowPopup }) {
  const navigate = useNavigate();
  const { setDoc } = useDoc();

  function documentNavigate() {
    setDoc((d) => ({
      ...d,
      [data.keyName]: { id: data.id, title: data.title, url: data.url },
    }));
    if (nav !== "none") navigate(nav);
  }
  return (
    <div className="document">
      <div className="document-details" onClick={() => documentNavigate()}>
        <span>{data.title}</span>
        <span>{data.datetime}</span>
      </div>
      <div className="document-tools">
        <FontAwesomeIcon
          icon="trash"
          onClick={() => {
            onActiveDocument(data.id);
            onShowPopup(true);
          }}
        />
        <Link to="/edit/record" state={{ id: data.id }}>
          <FontAwesomeIcon icon="pen" />
        </Link>
        <Link
          to="/Browse"
          state={{ docId: data.id, docName: data.title, recId: -1 }}
        >
          <FontAwesomeIcon icon="eye" />
        </Link>
      </div>
    </div>
  );
}

export default Document;
