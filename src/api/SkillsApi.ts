import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {RootState} from "../configuration/Strore";

export const skillsApi = createApi({
    reducerPath: "skillsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.apilayer.com/skills',
        prepareHeaders: (headers) => {
           headers.set("apikey", "zXZOx18kIBxZOZA89r92jOdA7rqV7wKr")
        }
    }),
    tagTypes: ['Skills'],
    endpoints: (builder) => ({
        getSkills: builder.query<string[], string>({
            query: (value: string) => ({
                url: `?q=${value}&count=50`,
                method: "GET",
            })
        })
    })
})

export const { useLazyGetSkillsQuery } = skillsApi