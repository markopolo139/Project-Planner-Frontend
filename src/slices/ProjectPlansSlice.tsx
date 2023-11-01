import Project from "../objects/Project";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../configuration/Strore";
import ProjectPlan from "../objects/ProjectPlan";

interface ProjectsPlanState {
    projectsPlans: Array<ProjectPlan>
}

const initialState: ProjectsPlanState = {
    projectsPlans: []
}

export const projectsPlansSlice = createSlice({
    name: "projectsPlans",
    initialState: initialState,
    reducers: {
        deleteAllProjectsPlans: (state) => {
            state.projectsPlans = []
        },
        addProjectPlan: (state, action: PayloadAction<ProjectPlan>) => {
            state.projectsPlans.push(action.payload)
        },
        setNewProjectsPlans: (state, action: PayloadAction<Array<ProjectPlan>>) => {
            state.projectsPlans = action.payload
        },
        updateProjectPlan: (state, action: PayloadAction<ProjectPlan>) => {
            state.projectsPlans.map(it =>
                it.projectPlanId === action.payload.projectPlanId ? {...action.payload } : { ...it }
            )
        }
    }
})

export const {
    deleteAllProjectsPlans, addProjectPlan,
    setNewProjectsPlans, updateProjectPlan
} = projectsPlansSlice.actions
export const selectProjectsPlans = (state: RootState) => state.projectsPlans.projectsPlans
export default projectsPlansSlice.reducer