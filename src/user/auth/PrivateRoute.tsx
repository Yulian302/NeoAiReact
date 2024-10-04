import { AxiosResponse } from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
import getUserData from "../../api/getUserData"
import { useAuth } from "../context/AuthContext"
import { setUser } from "../redux/userSlice"
import { PartialUser } from "../types"

const PrivateRoute = () => {
	const { isAuthenticated } = useAuth()
	const dispatch = useDispatch()
	useEffect(() => {
		const fetchUserData = async () => {
			const response: AxiosResponse<PartialUser> = await getUserData()
			const userData: PartialUser = response.data
			// @ts-ignore
			dispatch(setUser(userData))
		}
		if (isAuthenticated) {
			fetchUserData().then((r) => r)
		}
	}, [dispatch, isAuthenticated])
	return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}
export default PrivateRoute
