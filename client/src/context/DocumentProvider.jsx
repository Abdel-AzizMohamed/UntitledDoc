import { createContext, useState } from "react";

const DocumentContext = createContext({});

export function DocumentProvider({ children }) {
  const [doc, setDoc] = useState({});

  return (
    <DocumentContext.Provider value={{ doc, setDoc }}>
      {children}
    </DocumentContext.Provider>
  );
}

export default DocumentContext;
