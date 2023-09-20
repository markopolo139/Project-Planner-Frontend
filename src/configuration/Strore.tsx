import {configureStore} from "@reduxjs/toolkit";
import tokenReducer from "../slices/JwtTokenSlice";

export const store = configureStore({
    reducer: {
        jwtToken: tokenReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch