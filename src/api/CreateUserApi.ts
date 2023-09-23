import {createApi} from "@reduxjs/toolkit/query/react";
import {fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import CreateUserModel from "../objects/CreateUserModel";
import {authApi} from "./AuthApi";

export const createUserApi = createApi({
    reducerPath: "creatUserApi",
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:4200/api/v1/'}),
    tagTypes: ['User Creation'],
    endpoints: (builder) => ({
        userCreate: builder.mutation<void, CreateUserModel>({
            query: (model: CreateUserModel) => ({
                url: "user/create",
                method: "POST",
                body: model,
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ['User Creation']
        })
    })
})

export const { useUserCreateMutation } = createUserApi