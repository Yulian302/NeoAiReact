import { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateUserAsync } from "../../../../user/redux/userSlice"
import { UserState } from "../../../../user/types"

const EditableField = ({ label, value, fieldName }: any) => {
	const ref = useRef(null)
	const [isEditing, setIsEditing] = useState(false)
	const dispatch = useDispatch()
	const user = useSelector((state: UserState) => state.user)
	const startEditing = () => {
		setIsEditing(true)
	}
	const handleSave = () => {
		// @ts-ignore
		const newValue = ref.current!.value
		if (newValue !== undefined) {
			dispatch(
				// @ts-ignore
				updateUserAsync({
					...user,
					[fieldName]: newValue,
				})
			)
		}
		setIsEditing(false)
	}
	return (
		<div className="flex pt-6 border-primary-text-color">
			<dt className="w-[18rem] max-[620px]:w-[8rem] font-semibold pr-6">
				<label htmlFor={fieldName + "Id"}>{label}</label>
			</dt>
			<dd className="flex justify-between flex-auto">
				<div>
					{isEditing ? (
						<input
							type="text"
							defaultValue={value ? value : "Not specified"}
							name={fieldName}
							id={fieldName + "Id"}
							ref={ref}
						></input>
					) : (
						<span className="text-primary-text-color">
							{value ? (
								<span className="font-semibold">{value}</span>
							) : (
								<span className="opacity-50">Not specified</span>
							)}
						</span>
					)}
				</div>
				<div className="font-bold cursor-pointer [&>*]:no-underline">
					{isEditing ? (
						<button
							type="button"
							className="text-primary-text-color "
							onClick={() => handleSave()}
						>
							Save
						</button>
					) : (
						<button
							type="button"
							className="text-primary-text-color "
							onClick={startEditing}
						>
							Update
						</button>
					)}
				</div>
			</dd>
		</div>
	)
}

export default EditableField
