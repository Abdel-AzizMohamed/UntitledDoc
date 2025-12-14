import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast, { Toaster } from "react-hot-toast";
import InputField from "../Form/InputField";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { apis } from "../../api/axios";
import useDoc from "../../hooks/useDoc";
import "../../style-core/documentsEdit.css";

function AddChapter() {
  const [name, setName] = useState();

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { doc } = useDoc();
  const documentId = doc.document.id;

  async function addChapter(e) {
    e.preventDefault();
    try {
      const response = await axiosPrivate.post(
        `${apis.addChapter}${documentId}/chapter/`,
        {
          name,
        }
      );
      const message = response?.data?.message;
      toast[message?.type](message?.text);
      setTimeout(() => navigate("/chapters"), 800);
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
        <Link to="/chapters">
          <FontAwesomeIcon icon={"caret-left"} />
        </Link>
        <h2>add chapter</h2>
      </div>
      <form
        action=""
        method="POST"
        onSubmit={(e) => {
          toast.promise(addChapter(e), {
            loading: "Inserting the chapter...",
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
        <input type="submit" value="Insert" />
      </form>
    </div>
  );
}

export default AddChapter;
