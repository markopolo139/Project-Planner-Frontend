import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import LoginModel from "../objects/LoginModel";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:4200/'}),
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        authenticate: builder.mutation<string, LoginModel>({
            query: (model: LoginModel) => ({
                url: "auth",
                method: "POST",
                body: model,
                headers: {
                    'Content-Type': 'application/json'
                },
                responseHandler: (response) => response.ok ? response.text() : response.json()
            }),
            invalidatesTags: ['Auth']
        })
    })
})

export const { useAuthenticateMutation } = authApi