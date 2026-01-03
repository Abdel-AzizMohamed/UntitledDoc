import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Header from "../comps/Header/Header";
import { apis } from "../api/axios";
import BrowserSide from "../comps/Sidebar/BrowserSide";
import Markdown from "react-markdown";
function Browse() {
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();
  const { docId, docName, recId } = location.state;
  const [recordId, setRecordId] = useState(recId);
  const [data, setData] = useState([]);
  const [content, setContent] = useState("");

  async function retrieve_first_record() {
    try {
      const response = await axiosPrivate.get(
        `${apis.firstRecord}${docId}/first/`
      );
      setContent(response.data.data.content);
    } catch (err) {
      console.log(err);
    }
  }

  async function retrieve_record() {
    try {
      const response = await axiosPrivate.get(`${apis.record}${recordId}/`);
      setContent(response.data.data.content);
    } catch (err) {
      console.log(err);
    }
  }

  async function retrieve_records() {
    try {
      const response = await axiosPrivate.get(`${apis.records}${docId}/`);
      setData(response.data.data);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (recordId === -1) retrieve_first_record();
    else retrieve_record();
    retrieve_records();
  }, [recordId]);
  return (
    <>
      <header>
        <Header />
      </header>
      <main className="content-wrapper">
        <BrowserSide
          data={data}
          documentName={docName}
          setRecordId={setRecordId}
        />
        <div className="content">
          <Markdown>{content}</Markdown>
        </div>
      </main>
    </>
  );
}

export default Browse;
