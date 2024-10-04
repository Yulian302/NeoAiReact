import axios from "axios"
import { ModelResultType } from "../types"
import { ML_SERVICE_BASE_URL } from "../../api/userApi"

const useModel = async (modelId: number, image: any) => {
	let base64data
	try {
		const response = await fetch(image.url)
		const blob = await response.blob()
		base64data = await new Promise((resolve) => {
			const reader = new FileReader()
			reader.readAsDataURL(blob)
			reader.onloadend = () => {
				resolve(reader.result)
			}
		})
	} catch (error) {
		console.error("Error fetching or converting the image:", error)
	}

	try {
		const result: any = await axios.post<ModelResultType>(
			`${ML_SERVICE_BASE_URL}api/models/${modelId}/use/`,
			{
				image: base64data,
			},
			{
				headers: {
					"Content-Type": "application/json",
				},
				withCredentials: true,
			}
		)
		return result
	} catch (error) {
		console.error("Error posting the image:", error)
	}
}

export default useModel
