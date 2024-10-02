import {
	Dispatch,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from "react"

import { Link, useNavigate } from "react-router-dom"
import { GOOGLE_AUTH_URL, params } from "../../api/google-0auth"
import loginUser from "../../api/loginUser"
import DarkLightButton from "../../components/ui/DarkLightButton"
import Logo from "../../components/ui/Logo"
import { useAuth } from "../context/AuthContext"
import DarkModeContext from "../context/DarkModeContext"

const Login = () => {
	const { isAuthenticated, setAuthStatus } = useAuth()
	const [isDark, setIsDark] = useContext(DarkModeContext)
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [message, setMessage]: [
		AuthMessage,
		Dispatch<SetStateAction<AuthMessage>>
	] = useState({
		content: "",
		success: Boolean(false),
	})
	const navigate = useNavigate()
	useEffect(() => {
		if (isAuthenticated) {
			navigate("/home")
		}
	}, [isAuthenticated, navigate])

	useEffect(() => {
		setMessage({
			content: "",
			success: false,
		})
	}, [username, password])

	const submitLogin = async () => {
		const response = await loginUser({
			username,
			password,
		})

		if (response.status === 200) {
			setAuthStatus(true)
			const responseData = await response.data
			navigate("/home")
			sessionStorage.setItem("access", responseData.access)
			sessionStorage.setItem("refresh", responseData.refresh)
		} else {
			setMessage({
				content: "User not found! Invalid username or password",
				success: false,
			})
		}
	}
	const loginWith0Auth = (provider: string) => {
		switch (provider) {
			case "google": {
				const urlParams = new URLSearchParams(params).toString()
				window.location = `${GOOGLE_AUTH_URL}?${urlParams}` as
					| Location
					| (string & Location)
				break
			}
			case "github": {
				const urlParams = new URLSearchParams(params).toString()
				window.location = `${GOOGLE_AUTH_URL}?${urlParams}` as
					| Location
					| (string & Location)
				break
			}
		}
	}
	return (
		<>
			<div
				className="flex min-h-full flex-col justify-center px-6 pb-32 pt-28 lg:px-8 bg-background-color"
				data-theme={isDark ? "dark" : "light"}
			>
				<Logo />
				<h2 className="mt-8 text-center text-2xl font-bold leading-9 tracking-tight text-primary-text-color">
					Login to your account
				</h2>
				<div className="p-4 flex justify-center">
					<form className="form-user">
						<div className="mb-3">
							<label htmlFor="id_username" className="form-label">
								Username:
							</label>
							<input
								type="text"
								name="username"
								autoFocus
								autoComplete="true"
								id="id_username"
								className="form-control"
								onChange={(e) => setUsername(e.target.value)}
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="id_password" className="form-label">
								Password:
							</label>
							<input
								type="password"
								name="password"
								id="id_password"
								autoComplete="true"
								className="form-control"
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<div className="d-flex justify-content-center">
							<input
								type="button"
								value="Login"
								className="btn btn-primary"
								onClick={(e) => {
									submitLogin()
								}}
							/>
						</div>
						<br />
						<span className="text-primary-text-color">
							Don't have an account?{" "}
						</span>
						<Link to="/signup">Sign Up</Link>
						<div className="my-2">
							{message.content && (
								<p
									className={`alert ${
										message.success ? "alert-success" : "alert-danger"
									}`}
								>
									{message.content}
								</p>
							)}
						</div>
					</form>
				</div>
			</div>
			<DarkLightButton isDark={isDark} setIsDark={setIsDark} />
		</>
	)
}
export default Login
