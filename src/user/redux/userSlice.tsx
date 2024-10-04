import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AxiosResponse } from "axios"
import {
	deleteAllUserNotifications,
	deleteUserNotification,
} from "user/api/deleteNotification"
import updateUserInfo from "user/api/updateUserInfo"
import { PartialUser, User, UserNotification } from "user/types"

const initialState: PartialUser = {}

export const updateUserAsync = createAsyncThunk(
	"user/updateUserAsync",
	async (updatedUserInfo: User) => {
		const response: AxiosResponse<PartialUser> = await updateUserInfo(
			updatedUserInfo
		)
		const messagePanel = document.getElementById("updateSuccess")
		setTimeout(() => {
			messagePanel?.classList.remove("alert-danger")
			messagePanel?.classList.remove("alert-success")
			messagePanel!.innerText = ""
		}, 5000)
		if (response.status === 200) {
			messagePanel!.innerText = "User profile updated successfully"
			messagePanel?.classList.remove("alert-danger")
			messagePanel?.classList.add("alert-success")
			return response.data
		} else {
			messagePanel!.innerText = response.data.username
				? response.data.username
				: "User profile can't be updated. Invalid input"
			messagePanel?.classList.remove("alert-success")
			messagePanel?.classList.add("alert-danger")
		}
	}
)
export const deleteNotificationAsync = createAsyncThunk(
	"user/deleteNotificationAsync",
	async (notificationId: number) => {
		await deleteUserNotification(notificationId)
	}
)
export const deleteAllNotificationsAsync = createAsyncThunk(
	"user/deleteAllNotificationsAsync",
	async () => {
		await deleteAllUserNotifications()
	}
)

const userSlice = createSlice({
	name: "user",
	initialState: initialState,
	reducers: {
		setUser: (state, action: PayloadAction<User>) => {
			return {
				...state,
				...action.payload,
			}
		},
		updateUser: (state, action: PayloadAction<PartialUser>) => {
			return {
				...state,
				...action.payload,
			}
		},
		deleteNotification: (state, action: PayloadAction<number>) => {
			const id = action.payload
			const updatedNotifications = state.notifications?.filter(
				(notification: UserNotification) => notification.id !== id
			)
			return {
				...state,
				notifications: updatedNotifications,
			}
		},
		deleteAllNotifications: (state) => {
			return {
				...state,
				notifications: [],
			}
		},
	},
	extraReducers: (builder) => {
		builder.addCase(updateUserAsync.fulfilled, (state, action) => {
			return {
				...state,
				...action.payload,
			}
		})
		builder.addCase(deleteNotificationAsync.fulfilled, (state) => {
			return {
				...state,
			}
		})
		builder.addCase(deleteAllNotificationsAsync.fulfilled, (state) => {
			return {
				...state,
			}
		})
	},
})

export const {
	setUser,
	updateUser,
	deleteAllNotifications,
	deleteNotification,
} = userSlice.actions

export default userSlice.reducer
