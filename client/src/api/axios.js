import axios from "axios";

const BASE_URL = "https://187c41ba0288.ngrok-free.app";

export const apis = {
  login: "api/auth/login/",
  register: "register/",
  me: "me/",
};
export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
