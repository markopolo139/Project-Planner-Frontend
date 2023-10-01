import {configureStore} from "@reduxjs/toolkit";
import {authApi} from "../api/AuthApi";
import {recoveryPasswordApi} from "../api/RecoveryPasswordApi";
import {createUserApi} from "../api/CreateUserApi";
import {notificationApi} from "../api/NotificationApi";
import loggedInUserReducer from "../slices/LoggedInUserSlice";
import projectsReducer from "../slices/ProjectsSlice";
import {userApi} from "../api/UserApi";
import {projectApi} from "../api/ProjectApi";

export const store = configureStore({
    reducer: {
        loggedInUser: loggedInUserReducer,
        projects: projectsReducer,
        [authApi.reducerPath]: authApi.reducer,
        [recoveryPasswordApi.reducerPath]: recoveryPasswordApi.reducer,
        [createUserApi.reducerPath]: createUserApi.reducer,
        [notificationApi.reducerPath]: notificationApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [projectApi.reducerPath]: projectApi.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(authApi.middleware).concat(recoveryPasswordApi.middleware)
            .concat(createUserApi.middleware).concat(notificationApi.middleware).concat(userApi.middleware)
            .concat(projectApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch