import { AxiosResponse } from "axios"
import { Models } from "../../templates/models/types"
import axios from "../../axiosConfig"

const getModels = async (): Promise<AxiosResponse<Models>> => {
	return await axios.get<Models>("models/", { withCredentials: true })
}

export default getModels
