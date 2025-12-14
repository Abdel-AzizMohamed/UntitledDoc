import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast, { Toaster } from "react-hot-toast";
import InputField from "../Form/InputField";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { apis } from "../../api/axios";
import useDoc from "../../hooks/useDoc";
import "../../style-core/documentsEdit.css";

function AddSection() {
  const [name, setName] = useState();

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { doc } = useDoc();
  const chapterId = doc.chapter.id;

  async function addSection(e) {
    e.preventDefault();
    try {
      const response = await axiosPrivate.post(
        `${apis.addSection}${chapterId}/section/`,
        {
          name,
        }
      );
      const message = response?.data?.message;
      toast[message?.type](message?.text);
      setTimeout(() => navigate("/sections"), 800);
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
        <Link to="/sections">
          <FontAwesomeIcon icon={"caret-left"} />
        </Link>
        <h2>add section</h2>
      </div>
      <form
        action=""
        method="POST"
        onSubmit={(e) => {
          toast.promise(addSection(e), {
            loading: "Inserting the section...",
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

export default AddSection;
