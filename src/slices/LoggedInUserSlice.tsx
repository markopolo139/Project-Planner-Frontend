import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../configuration/Strore";

interface LoggedInUserState {
    jwtToken: string
    username: string
}

const initialValue: LoggedInUserState = {
    jwtToken: "",
    username: ""
}

export const loggedInUserSlice = createSlice({
    name: "loggedInUser",
    initialState: initialValue,
    reducers: {
        setJwtToken: (state, action: PayloadAction<string>) => {
            state.jwtToken = action.payload
        },
        setLoggedInUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload
        },
        logout: (state) => {
            state.username = ""
            state.jwtToken = ""
        }
    }
})

export const { setJwtToken, setLoggedInUsername, logout } = loggedInUserSlice.actions
export const selectJwtToken = (state: RootState) => state.loggedInUser.jwtToken
export const selectUsername = (state: RootState) => state.loggedInUser.jwtToken
export const selectLoggedInUserData = (state: RootState) => state.loggedInUser
export default loggedInUserSlice.reducer