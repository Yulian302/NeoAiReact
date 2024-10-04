import axios from "../axiosConfig"

const logoutUser = async () => {
	return await axios.post("auth/logout/", null, { withCredentials: true })
}

export default logoutUser
