import axios from "axios"
import { API_BASE_URL } from "./api/userApi"

const instance = axios.create({
	baseURL: API_BASE_URL,
})

instance.interceptors.request.use((config) => {
	const accessToken = sessionStorage.getItem("access")
	if (accessToken) {
		config.headers["Authorization"] = `Bearer ${accessToken}`
	}
	config.validateStatus = () => true
	config.headers["Content-Type"] = "application/json"
	return config
})

// instance.interceptors.response.use(function (response) {
//   if (response.status === 401) {
//     sessionStorage.removeItem("access");
//     sessionStorage.removeItem("refresh");
//     window.location = "/login";
//   }
//   return response;
// });
export default instance
