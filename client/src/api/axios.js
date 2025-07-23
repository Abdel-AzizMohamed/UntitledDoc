import axios from "axios";


export const apis = {"login": "login/", "register": "register/"}
export default axios.create({
	baseURL: "http://localhost:8000"
})