import axios from "../axiosConfig"

const loginUser = async (userData: any) => {
	return await axios.post("/auth/login/", JSON.stringify(userData), {
		withCredentials: true,
	})
}

export default loginUser
