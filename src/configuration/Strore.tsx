import {configureStore} from "@reduxjs/toolkit";
import tokenReducer from "../slices/JwtTokenSlice";
import {authApi} from "../api/AuthApi";
import {recoveryPasswordApi} from "../api/RecoveryPasswordApi";

export const store = configureStore({
    reducer: {
        jwtToken: tokenReducer,
        [authApi.reducerPath]: authApi.reducer,
        [recoveryPasswordApi.reducerPath]: recoveryPasswordApi.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(authApi.middleware).concat(recoveryPasswordApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch