import {
	PASSWORD_MAX_LENGTH,
	PASSWORD_MIN_LENGTH,
	USERNAME_MAX_LENGTH,
	USERNAME_MIN_LENGTH,
} from "./form_requirements"

export type ValidationField = "username" | "password" | "confirm_password"

export type ValidationError = {
	field: ValidationField
	error: String
}

export default function validateUserInput(
	username: string,
	password: string,
	confirm_password: string
): ValidationError[] | null {
	const errors: ValidationError[] = []

	if (password !== confirm_password) {
		errors.push({
			field: "confirm_password",
			error: "Passwords must match",
		})
	}

	if (password.length < PASSWORD_MIN_LENGTH) {
		errors.push({
			field: "password",
			error: `Password must be more than ${PASSWORD_MIN_LENGTH} chars long`,
		})
	}

	if (password.length > PASSWORD_MAX_LENGTH) {
		errors.push({
			field: "password",
			error: `Password must be not more than ${PASSWORD_MAX_LENGTH} chars long`,
		})
	}

	if (username.length < USERNAME_MIN_LENGTH) {
		errors.push({
			field: "username",
			error: `Username must be more than ${USERNAME_MIN_LENGTH} chars long`,
		})
	}
	if (username.length > USERNAME_MAX_LENGTH) {
		errors.push({
			field: "username",
			error: `Username must be not more than ${USERNAME_MAX_LENGTH} chars long`,
		})
	}

	return errors.length > 0 ? errors : null
}
