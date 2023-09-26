import {configureStore} from "@reduxjs/toolkit";
import {authApi} from "../api/AuthApi";
import {recoveryPasswordApi} from "../api/RecoveryPasswordApi";
import {createUserApi} from "../api/CreateUserApi";
import {notificationApi} from "../api/NotificationApi";
import loggedInUserReducer from "../slices/LoggedInUserSlice";
import {userApi} from "../api/UserApi";

export const store = configureStore({
    reducer: {
        loggedInUser: loggedInUserReducer,
        [authApi.reducerPath]: authApi.reducer,
        [recoveryPasswordApi.reducerPath]: recoveryPasswordApi.reducer,
        [createUserApi.reducerPath]: createUserApi.reducer,
        [notificationApi.reducerPath]: notificationApi.reducer,
        [userApi.reducerPath]: userApi.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(authApi.middleware).concat(recoveryPasswordApi.middleware)
            .concat(createUserApi.middleware).concat(notificationApi.middleware).concat(userApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch