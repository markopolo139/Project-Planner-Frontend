import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {RootState} from "../configuration/Strore";
import Project from "../objects/Project";
import {ProjectFilterModel} from "../objects/ProjectFilterModel";

export const projectApi = createApi({
    reducerPath: "projectApi",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4200/api/v1/project/',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).loggedInUser.jwtToken

            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }

            return headers
        }
    }),
    tagTypes: ['Projects'],
    endpoints: (builder) => ({
        createProject: builder.mutation<Project, Project>({
            query: (model: Project) => ({
                url: "create",
                method: "POST",
                body: model,
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ['Projects']
        }),
        createProjects: builder.mutation<Array<Project>, Array<Project>>({
            query: (model: Array<Project>) => ({
                url: "create/list",
                method: "POST",
                body: model,
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ['Projects']
        }),
        updateProject: builder.mutation<Project, Project>({
            query: (model: Project) => ({
                url: "update",
                method: "PUT",
                body: model,
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ['Projects']
        }),
        deleteProject: builder.mutation<void, number>({
            query: (id) => ({
                url: `delete?id=${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Projects']
        }),
        filterProjects: builder.query<Array<Project>, Partial<ProjectFilterModel>>({
            query: (model: Partial<ProjectFilterModel>) => ({
                url: "filter",
                method: "GET",
                params: { ...model }
            })
        }),
        getProjects: builder.query<Array<Project>, void>({
            query: () => ({
                url: "get",
                method: "GET",
            })
        }),
        getProjectByTitle: builder.query<Project, string>({
            query: (title) => ({
                url: `get/title?title=${title}`,
                method: "GET",
            })
        }),
    })
})

export const {
    useCreateProjectMutation, useCreateProjectsMutation,
    useUpdateProjectMutation, useDeleteProjectMutation,
    useLazyFilterProjectsQuery, useGetProjectsQuery,
    useGetProjectByTitleQuery
} = projectApi