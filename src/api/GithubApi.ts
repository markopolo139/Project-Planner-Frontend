import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {GithubResponse} from "../objects/GithubResponse";

export const githubApi = createApi({
    reducerPath: "githubApi",
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.github.com/',
        prepareHeaders: (headers) => {
            headers.set('Accept',"application/vnd.github+json")
        }
    }),
    tagTypes: ['Github'],
    endpoints: (builder) => ({
        getPublicRepos: builder.query<GithubResponse[], string>({
            query: (username: string) => ({
                url: `users/${username}/repos`,
                method: "GET"
            })
        }),
        getPrivateRepos: builder.query<GithubResponse[], string>({
            query: (token: string) => ({
                url: `user/repos`,
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        })
    })
})

export const {
    useLazyGetPublicReposQuery, useLazyGetPrivateReposQuery
} = githubApi