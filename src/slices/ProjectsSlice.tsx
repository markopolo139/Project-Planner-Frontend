import Project from "../objects/Project";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UpdateProjectModel} from "../objects/UpdateProjectModel";
import {RootState} from "../configuration/Strore";

interface ProjectsState {
    projects: Array<Project>
}

const initialState: ProjectsState = {
    projects: []
}

export const projectsSlice = createSlice({
    name: "projects",
    initialState: initialState,
    reducers: {
        addProjects: (state, action: PayloadAction<Array<Project>>) => {
           state.projects.push(...action.payload)
        },
        deleteAllProjects: (state) => {
            state.projects = []
        },
        addProject: (state, action: PayloadAction<Project>) => {
            state.projects.push(action.payload)
        },
        setNewProjects: (state, action: PayloadAction<Array<Project>>) => {
            state.projects = action.payload
        },
        updateProject: (state, action: PayloadAction<UpdateProjectModel>) => {
            state.projects.map(it =>
                it.projectId === action.payload.id ? {...action.payload.updatedProject } : { ...it }
            )
        }
    }
})

export const {
    addProjects, deleteAllProjects,
    addProject, setNewProjects,
    updateProject
} = projectsSlice.actions
export const selectProjects = (state: RootState) => state.projects.projects
export default projectsSlice.reducer