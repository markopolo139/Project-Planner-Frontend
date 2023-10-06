import ProjectStatus from "./ProjectStatus";

export default interface Project {
    projectId: number
    githubLink: string
    title: string
    description: string
    language: string
    deadline: Date | null
    dateOfStart: Date
    isCurrent: boolean
    projectStatus: ProjectStatus
    features: Array<string>
    goals: Array<string>
    technologies: Array<string>
}