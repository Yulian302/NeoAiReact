import { AxiosResponse } from "axios"
import { PartialUser } from "../user/types"
import axios from "../axiosConfig"

const getUserData = async (): Promise<AxiosResponse<PartialUser>> => {
	return await axios.get<PartialUser>("user/", { withCredentials: true })
}
export default getUserData
