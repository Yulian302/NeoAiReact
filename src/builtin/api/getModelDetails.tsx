import { AxiosResponse } from "axios"
import { Model } from "../../templates/models/types"
import axios from "../../axiosConfig"

const getModelDetails = async (
	modelId: number
): Promise<AxiosResponse<Model>> => {
	return await axios.get<Model>(`models/${modelId}/`, { withCredentials: true })
}

export default getModelDetails
