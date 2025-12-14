import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast, { Toaster } from "react-hot-toast";
import InputField from "../Form/InputField";
import AreaField from "../Form/AreaField";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { apis } from "../../api/axios";
import useDoc from "../../hooks/useDoc";
import "../../style-core/documentsEdit.css";

function AddRecord() {
  const [name, setName] = useState();
  const [content, setContent] = useState();
  const [slug, setSlug] = useState();
  const [draft, setDraft] = useState(false);

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { doc } = useDoc();
  const chapterId = doc.chapter.id;

  async function addRecord(e) {
    e.preventDefault();
    try {
      const response = await axiosPrivate.post(
        `${apis.addRecord}${chapterId}/record/`,
        {
          name,
          content,
          slug,
          draft,
          sectionId: doc.section.id,
        }
      );
      const message = response?.data?.message;
      toast[message?.type](message?.text);
      setTimeout(() => navigate("/records"), 800);
    } catch (err) {
      if (!err?.response) {
        throw new Error("No Server Response.");
      } else {
        throw new Error(err?.response?.data?.message.text);
      }
    }
  }

  return (
    <div className="add-menu">
      <Toaster />
      <div className="menu-title">
        <Link to="/records">
          <FontAwesomeIcon icon={"caret-left"} />
        </Link>
        <h2>add record</h2>
      </div>
      <form
        action=""
        method="POST"
        onSubmit={(e) => {
          toast.promise(addRecord(e), {
            loading: "Inserting the record...",
            error: (err) => err.message || "Inserting failed.",
          });
        }}
      >
        <InputField
          name="name"
          fieldType="text"
          fieldValue={name}
          setField={setName}
        />
        <AreaField name="content" fieldValue={content} setField={setContent} />
        <InputField
          name="slug"
          fieldType="text"
          fieldValue={slug}
          setField={setSlug}
        />
        <input type="submit" value="Insert" />
      </form>
    </div>
  );
}

export default AddRecord;
