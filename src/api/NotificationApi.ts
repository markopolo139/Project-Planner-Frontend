import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import CreateUserModel from "../objects/CreateUserModel";
import {RootState} from "../configuration/Strore";

export const notificationApi = createApi({
    reducerPath: "notificationApi",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4200/api/v1/notification/',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).loggedInUser.jwtToken

            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }

            return headers
        }
    }),
    tagTypes: ['Notification'],
    endpoints: (builder) => ({
        addNotificationToken: builder.mutation<void, string>({
            query: (token: string) => ({
                url: `add?token=${token}`,
                method: "POST",
            }),
            invalidatesTags: ['Notification']
        }),
        removeNotificationToken: builder.mutation<void, string>({
            query: (token: string) => ({
                url: `remove?token=${token}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Notification']
        }),
        removeAllNotificationTokens: builder.mutation({
            query: () => ({
                url: `remove/all`,
                method: "DELETE",
            }),
            invalidatesTags: ['Notification']
        })
    })
})

export const {
    useAddNotificationTokenMutation, useRemoveNotificationTokenMutation, useRemoveAllNotificationTokensMutation
} = notificationApi