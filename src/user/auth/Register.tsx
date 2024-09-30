import {
	Dispatch,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from "react"
import { Link } from "react-router-dom"
import { DarkMode } from "../../../types"
import registerUser from "../../api/registerUser"
import DarkLightButton from "../../components/ui/DarkLightButton"
import Logo from "../../components/ui/Logo"
import DarkModeContext from "../context/DarkModeContext"
import validateUserInput from "user/validation/form_validation"
import { ValidationError, ValidationField } from "../validation/form_validation"

const Register = () => {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [repeatPassword, setRepeatPassword] = useState("")
	const [message, setMessage]: [
		AuthMessage,
		Dispatch<SetStateAction<AuthMessage>>
	] = useState({
		content: "",
		success: Boolean(false),
	})

	const [formErrors, setFormErrors] = useState<ValidationError[] | null>(null)
	const [isDark, setIsDark]: DarkMode = useContext(DarkModeContext)

	useEffect(() => {
		setMessage({
			content: "",
			success: false,
		})
	}, [username, password])

	const generateErrorMessage = (
		formErrors: ValidationError[],
		field: ValidationField
	): React.ReactNode => {
		if (formErrors!.find((err) => err.field === field)) {
			return (
				<span className="text-success_3 text-sm">
					{formErrors!.find((err) => err.field === field)?.error}
				</span>
			)
		}
	}

	const submitRegister = async (event: any) => {
		event.preventDefault()
		const errors = validateUserInput(username, password, repeatPassword)
		console.log(errors)

		if (errors) {
			setFormErrors(errors as any)
			return
		}
		const response = await registerUser({
			username,
			password,
			repeat_password: repeatPassword,
		})
		setMessage({
			content: response.data.message,
			success: response.data.success,
		})
	}
	return (
		<div
			className="flex min-h-full flex-col justify-center px-6 pb-32 pt-28 lg:px-8 bg-background-color"
			data-theme={isDark ? "dark" : "light"}
		>
			<Logo />
			<h2 className="mt-8 text-center text-2xl font-bold leading-9 tracking-tight text-primary-text-color">
				Register a new account
			</h2>
			<div className="p-4 flex justify-center">
				<form className="form-user" onSubmit={submitRegister}>
					<div className="mb-3">
						<label htmlFor="id_username" className="form-label">
							Username:
						</label>
						<input
							type="text"
							name="username"
							required
							autoFocus
							id="id_username"
							className="form-control"
							onChange={(e) => setUsername(e.target.value)}
						/>
						{formErrors && generateErrorMessage(formErrors!, "username")}
					</div>
					<div className="mb-3">
						<label htmlFor="id_password1" className="form-label">
							Password:
						</label>
						<input
							type="password"
							name="password1"
							required
							id="id_password1"
							className="form-control"
							autoComplete="true"
							onChange={(e) => setPassword(e.target.value)}
						/>
						{formErrors && generateErrorMessage(formErrors!, "password")}
					</div>
					<div className="mb-3">
						<label htmlFor="id_password2" className="form-label">
							Confirm password:
						</label>
						<input
							type="password"
							name="password2"
							id="id_password2"
							required
							className="form-control"
							autoComplete="true"
							onChange={(e) => setRepeatPassword(e.target.value)}
						/>
						{formErrors &&
							generateErrorMessage(formErrors!, "confirm_password")}
					</div>
					<div className="my-2 text-center">
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
					<div className="d-flex justify-content-center">
						<input type="submit" value="Sign Up" className="btn btn-primary" />
					</div>
					<br />
					<span className="text-primary-text-color">
						Already signed up? Go to <Link to="/login">Login</Link> page
					</span>
				</form>
			</div>
			<DarkLightButton isDark={isDark} setIsDark={setIsDark} />
		</div>
	)
}
export default Register
