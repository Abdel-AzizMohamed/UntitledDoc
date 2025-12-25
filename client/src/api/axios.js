import axios from "axios";

const BASE_URL = "http://localhost:8000";
const authsystem = "api/auth/";
const doc = "api/doc/";
const slash = "/";

export const apis = {
  login: authsystem + "login" + slash,
  register: authsystem + "register" + slash,
  me: authsystem + "me" + slash,
  refresh: authsystem + "token/refresh" + slash,
  verify: authsystem + "token/verify" + slash,
  logout: authsystem + "logout" + slash,
  documents: doc + "documents" + slash,
  addDocument: doc + "document" + slash,
  deleteDocument: doc + "document" + slash,
  chapters: doc + "chapters" + slash,
  addChapter: doc + "document" + slash,
  deleteChapter: doc + "chapter" + slash,
  sections: doc + "sections" + slash,
  addSection: doc + "chapter" + slash,
  deleteSection: doc + "section" + slash,
  records: doc + "records" + slash,
  retrieveRecord: doc + "record" + slash,
  addRecord: doc + "chapter" + slash,
  editRecord: doc + "record" + slash,
  deleteRecord: doc + "record" + slash,
  firstRecord: doc + "record" + slash,
  record: doc + "record" + slash,
};
export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
