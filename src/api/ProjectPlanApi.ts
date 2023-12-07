import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {RootState} from "../configuration/Strore";
import ProjectPlan from "../objects/ProjectPlan";
import {ProjectPlanFilterModel} from "../objects/ProjectPlanFilterModel";
import Project from "../objects/Project";

export const projectPlanApi = createApi({
    reducerPath: "projectPlanApi",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4200/api/v1/project/plan',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).loggedInUser.jwtToken

            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }

            return headers
        }
    }),
    tagTypes: ['Project Plans', 'Projects'],
    endpoints: (builder) => ({
        createProjectPlan: builder.mutation<ProjectPlan, ProjectPlan>({
            query: (model: ProjectPlan) => ({
                url: "create",
                method: "POST",
                body: model,
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ['Project Plans']
        }),
        updateProjectPlan: builder.mutation<ProjectPlan, ProjectPlan>({
            query: (model: ProjectPlan) => ({
                url: "update",
                method: "PUT",
                body: model,
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ['Project Plans']
        }),
        deleteProjectPlan: builder.mutation<void, number>({
            query: (id) => ({
                url: `delete?id=${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Project Plans']
        }),
        filterProjectsPlans: builder.query<Array<ProjectPlan>, Partial<ProjectPlanFilterModel>>({
            query: (model: Partial<ProjectPlanFilterModel>) => ({
                url: "filter",
                method: "GET",
                params: { ...model }
            })
        }),
        getProjectsPlans: builder.mutation<Array<ProjectPlan>, void>({
            query: () => ({
                url: "get",
                method: "GET",
            }),
            invalidatesTags: ['Project Plans']
        }),
        getProjectPlanByTitle: builder.mutation<ProjectPlan, string>({
            query: (title) => ({
                url: `get/title?title=${title}`,
                method: "GET",
            }),
            invalidatesTags: ['Project Plans']
        })
    })
})

export const {
    useCreateProjectPlanMutation, useUpdateProjectPlanMutation,
    useDeleteProjectPlanMutation, useFilterProjectsPlansQuery,
    useGetProjectsPlansMutation, useGetProjectPlanByTitleMutation
} = projectPlanApi