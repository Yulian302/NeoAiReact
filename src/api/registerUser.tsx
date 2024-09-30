import axios from "../axiosConfig"

const registerUser = async (userRegisterData: any) => {
	return await axios.post(
		"auth/register/",
		JSON.stringify(userRegisterData),
		{}
	)
}
export default registerUser
