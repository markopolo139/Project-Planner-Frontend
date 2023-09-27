import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {RootState} from "../configuration/Strore";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4200/api/v1/user/',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).loggedInUser.jwtToken

            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }

            return headers
        }
    }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        deleteUser: builder.mutation<void, void>({
            query: () => ({
                url: "delete",
                method: "DELETE",
            }),
            invalidatesTags: ['User']
        }),
        changeUsername: builder.mutation<void, string>({
            query: (param: string) => ({
                url: `change/username?username=${param}`,
                method: "PUT",
            }),
            invalidatesTags: ['User']
        }),
        changePassword: builder.mutation<void, string>({
            query: (param: string) => ({
                url: `change/password?password=${param}`,
                method: "PUT",
            }),
            invalidatesTags: ['User']
        }),
        changeEmail: builder.mutation<void, string>({
            query: (param: string) => ({
                url: `change/email?email=${param}`,
                method: "PUT",
            }),
            invalidatesTags: ['User']
        }),
        getEmail: builder.query<string, void>({
            query: () => ({
                url: "email",
                method: "GET",
                responseHandler: (response) => response.ok ? response.text() : response.json()
            })
        }),
    })
})

export const {
    useDeleteUserMutation, useChangeUsernameMutation,
    useChangePasswordMutation, useChangeEmailMutation,
    useGetEmailQuery
} = userApi