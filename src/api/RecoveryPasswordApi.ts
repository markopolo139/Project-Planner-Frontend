import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const recoveryPasswordApi = createApi({
    reducerPath: "recoverPasswordApi",
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:4200/'}),
    tagTypes: ["Recovery"],
    endpoints: build => ({
        sendEmail: build.mutation<void, string>({
            query: (email) => ({
                url: "recoverPwd",
                method: "POST",
                params: { email: email }
            }),
            invalidatesTags: ['Recovery']
        }),
        changePassword: build.mutation<void, { newPassword: string, token: string }>({
            query: (request) => ({
                url: "change/password",
                method: "POST",
                params: { newPassword: request.newPassword },
                headers: {
                    Authorization: `Bearer ${request.token}`
                }
            }),
            invalidatesTags: ['Recovery']
        })
    })
})

export const { useSendEmailMutation, useChangePasswordMutation } = recoveryPasswordApi