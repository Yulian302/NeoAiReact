import { useContext } from "react"
import { Link } from "react-router-dom"
import { DarkMode } from "../../../../types"
import logoutUser from "../../../api/logoutUser"
import { useAuth } from "../../../user/context/AuthContext"
import DarkModeContext from "../../../user/context/DarkModeContext"

const DropdownMenu = ({ isOpen }: any) => {
	const [isDark]: DarkMode = useContext(DarkModeContext)
	const { setAuthStatus } = useAuth()
	const handleLogout = async () => {
		const response = await logoutUser()
		if (response.status === 205) {
			setAuthStatus(false)
		}
	}
	return (
		<div
			className={`absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-background-color py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none [&>*]:no-underline [&>*]:text-foreground-color hover:[&>*]:bg-hover-button-bg ${
				isOpen ? "" : "hidden"
			}`}
			tabIndex={-1}
			data-theme={isDark ? "dark" : "light"}
		>
			<Link to="/home" className="block px-4 py-2 text-sm" tabIndex={-1}>
				Home
			</Link>
			<Link to="/settings" className="block px-4 py-2 text-sm" tabIndex={-1}>
				Settings
			</Link>
			<a
				type="button"
				onClick={handleLogout}
				className="block px-4 py-2 text-sm"
				tabIndex={-1}
			>
				Sign out
			</a>
		</div>
	)
}

export default DropdownMenu
