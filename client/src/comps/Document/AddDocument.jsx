import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast, { Toaster } from "react-hot-toast";
import InputField from "../Form/InputField";
import AreaField from "../Form/AreaField";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { apis } from "../../api/axios";
import "../../style-core/documentsEdit.css";

function AddDocument() {
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [slug, setSlug] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  async function addDocument(e) {
    e.preventDefault();
    try {
      const response = await axiosPrivate.post(apis.addDocument, {
        name,
        description,
        slug,
      });
      const message = response?.data?.message;
      toast[message?.type](message?.text);
      setTimeout(() => navigate("/documents"), 800);
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
        <FontAwesomeIcon icon={"caret-left"} />
        <h2>add document</h2>
      </div>
      <form
        action=""
        method="POST"
        onSubmit={(e) => {
          toast.promise(addDocument(e), {
            loading: "Inserting the document...",
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
        <AreaField
          name="description"
          fieldType="text"
          fieldValue={description}
          setField={setDescription}
        />
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

export default AddDocument;
