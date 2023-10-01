import ProjectStatus from "./ProjectStatus";

export interface ProjectFilterModel {
    language: string
    dateOfStartBeginning: Date
    dateOfStartEnding: Date
    isCurrentProject: boolean
    projectStatus: ProjectStatus
}