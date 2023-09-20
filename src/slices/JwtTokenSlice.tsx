import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../configuration/Strore";

interface TokenState {
    value: string
}

const initialValue: TokenState = {
    value: ""
}

export const jwtTokenSlice = createSlice({
    name: "JwtToken",
    initialState: initialValue,
    reducers: {
        set: (state, action: PayloadAction<string>) => {
            state.value = action.payload
        }
    }
})

export const {set} = jwtTokenSlice.actions
export const selectJwtToken = (state: RootState) => state.jwtToken.value
export default jwtTokenSlice.reducer