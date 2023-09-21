import {configureStore} from "@reduxjs/toolkit";
import tokenReducer from "../slices/JwtTokenSlice";
import {authApi} from "../api/AuthApi";

export const store = configureStore({
    reducer: {
        jwtToken: tokenReducer,
        [authApi.reducerPath]: authApi.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(authApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch