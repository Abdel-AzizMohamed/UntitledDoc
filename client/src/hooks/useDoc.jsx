import { useContext } from "react";
import DocumentContext from "../context/DocumentProvider";

const useDoc = () => {
  return useContext(DocumentContext);
};

export default useDoc;
