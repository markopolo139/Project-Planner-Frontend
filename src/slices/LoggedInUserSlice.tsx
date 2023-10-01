import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../configuration/Strore";

interface LoggedInUserState {
    jwtToken: string
    username: string
    email: string
}

const initialState: LoggedInUserState = {
    jwtToken: "",
    username: "",
    email: ""
}

export const loggedInUserSlice = createSlice({
    name: "loggedInUser",
    initialState: initialState,
    reducers: {
        setJwtToken: (state, action: PayloadAction<string>) => {
            state.jwtToken = action.payload
        },
        setLoggedInUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload
        },
        setLoggedInEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload
        },
        logout: (state) => {
            state.username = ""
            state.jwtToken = ""
            state.email = ""
        }
    }
})

export const {
    setJwtToken, setLoggedInUsername,
    logout, setLoggedInEmail
} = loggedInUserSlice.actions
export const selectJwtToken = (state: RootState) => state.loggedInUser.jwtToken
export const selectUsername = (state: RootState) => state.loggedInUser.username
export const selectEmail = (state: RootState) => state.loggedInUser.email
export const selectLoggedInUserData = (state: RootState) => state.loggedInUser
export default loggedInUserSlice.reducer