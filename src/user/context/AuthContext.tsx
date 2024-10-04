import axios from "../../axiosConfig"
import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext({
	isAuthenticated: false,
	setAuthStatus: (status: any) => {},
})

export const AuthProvider = ({ children }: any) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false)

	useEffect(() => {
		const checkAuthStatus = async () => {
			try {
				const response = await axios.get("/token/verify/", {
					withCredentials: true,
				})

				if (response.status === 200) {
					setIsAuthenticated(true)
				} else {
					setIsAuthenticated(false)
				}
			} catch (error) {
				console.error("Error verifying authentication:", error)
				setIsAuthenticated(false)
			}
		}

		checkAuthStatus()
	}, [])

	const setAuthStatus = (status: boolean) => {
		setIsAuthenticated(status)
	}

	return (
		<AuthContext.Provider value={{ isAuthenticated, setAuthStatus }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	return useContext(AuthContext)
}

export default AuthProvider
