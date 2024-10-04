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

export default instance
