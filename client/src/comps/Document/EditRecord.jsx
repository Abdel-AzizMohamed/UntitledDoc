import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast, { Toaster } from "react-hot-toast";
import InputField from "../Form/InputField";
import AreaField from "../Form/AreaField";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { apis } from "../../api/axios";
import "../../style-core/documentsEdit.css";

function EditRecord() {
  const [name, setName] = useState();
  const [content, setContent] = useState();
  const [slug, setSlug] = useState();
  const [draft, setDraft] = useState(false);

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  async function getRecordData() {
    try {
      const response = await axiosPrivate.get(
        `${apis.retrieveRecord}${location.state.id}/`,
      );
      const message = response?.data?.message;
      toast[message?.type](message?.text);
      const data = response.data.data;
      setName(data.name);
      setContent(data.content);
      setSlug(data.slug);
    } catch (err) {
      if (!err?.response) {
        throw new Error("No Server Response.");
      } else {
        throw new Error(err?.response?.data?.message.text);
      }
    }
  }

  async function editReocrd(e) {
    e.preventDefault();
    try {
      const response = await axiosPrivate.patch(
        `${apis.editRecord}${location.state.id}/`,
        { name, content, slug },
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

  useState(() => {
    getRecordData();
  }, []);

  return (
    <div className="add-menu">
      <Toaster />
      <div className="menu-title">
        <Link to="/records">
          <FontAwesomeIcon icon={"caret-left"} />
        </Link>
        <h2>edit record</h2>
      </div>
      <form
        className="add-form"
        action=""
        method="POST"
        onSubmit={(e) => {
          toast.promise(editReocrd(e), {
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
        <input type="submit" value="Update" />
      </form>
    </div>
  );
}

export default EditRecord;
