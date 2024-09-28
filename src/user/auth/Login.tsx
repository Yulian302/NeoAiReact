import {
	Dispatch,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from "react"
import { useNavigate } from "react-router-dom"
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
	}, [])

	useEffect(() => {
		setMessage({
			content: "",
			success: false,
		})
	}, [username, password])
	const submitLogin = async (event: any) => {
		event.preventDefault()
		const response = await loginUser({
			username,
			password,
		})
		if (response.status == 200) {
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
					<form className="form-user" onSubmit={submitLogin}>
						<div className="mb-3">
							<label htmlFor="id_username" className="form-label">
								Username:
							</label>
							<input
								type="text"
								name="username"
								required
								autoFocus
								autoComplete="true"
								id="id_username"
								maxLength={50}
								minLength={3}
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
								required
								id="id_password"
								minLength={7}
								autoComplete="true"
								className="form-control"
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<div className="d-flex justify-content-center">
							<input type="submit" value="Login" className="btn btn-primary" />
						</div>
						<br />
						<span className="text-primary-text-color">
							Don't have an account?{" "}
						</span>
						<a href="/signup">Sign Up</a>
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
						<div className="mt-2.5">
							<div className="border-solid">
								<div
									className="relative inset-0 flex items-center"
									aria-hidden="true"
								>
									<div className="w-full border-t-2 border-secondary-text-color"></div>
								</div>
								<div className="relative  flex justify-center text-sm leading-6 font-medium">
									<span className="px-1.5 text-secondary-text-color">
										Or continue with
									</span>
								</div>
							</div>
							<div className="mt-2 grid grid-cols-2 gap-2">
								<a
									type="button"
									onClick={() => loginWith0Auth("github")}
									className="flex justify-center items-center gap-[0.75rem] no-underline bg-black px-[0.75rem] py-[0.75rem] text-white rounded hover:scale-105 border-1 border-primary-text-color"
								>
									<svg
										className="w-[1.25rem] h-[1.25rem]"
										aria-hidden="true"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path
											fillRule="evenodd"
											d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
											clipRule="evenodd"
										></path>
									</svg>
									<span className="font-medium leading-6 text-sm">Github</span>
								</a>
								<a
									type="button"
									onClick={() => loginWith0Auth("google")}
									className="flex justify-center items-center gap-[0.75rem] no-underline  bg-white px-[0.75rem] py-[0.75rem] text-gray-600 rounded border-2 shadow-md hover:scale-105"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										xmlnsXlink="http://www.w3.org/1999/xlink"
										className="w-[1.25rem] h-[1.25rem]"
										aria-hidden="true"
										fill="currentColor"
										viewBox="10 1 30 45"
									>
										<defs>
											<path
												id="a"
												d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
											></path>
										</defs>
										<clipPath id="b">
											<use xlinkHref="#a" overflow="visible"></use>
										</clipPath>
										<path
											clipPath="url(#b)"
											fill="#FBBC05"
											d="M0 37V11l17 13z"
										></path>
										<path
											clipPath="url(#b)"
											fill="#EA4335"
											d="M0 11l17 13 7-6.1L48 14V0H0z"
										></path>
										<path
											clipPath="url(#b)"
											fill="#34A853"
											d="M0 37l30-23 7.9 1L48 0v48H0z"
										></path>
										<path
											clipPath="url(#b)"
											fill="#4285F4"
											d="M48 48L17 24l-4-3 35-10z"
										></path>
									</svg>
									<span className="font-medium leading-6 text-sm">Google</span>
								</a>
							</div>
						</div>
					</form>
				</div>
			</div>
			<DarkLightButton isDark={isDark} setIsDark={setIsDark} />
		</>
	)
}
export default Login
