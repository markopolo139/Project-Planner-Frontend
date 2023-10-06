import Project from "./Project";
import ProjectStatus from "./ProjectStatus";

export interface GithubResponse {
    name: string,
    html_url: string,
    description: string,
    created_at: Date
}

export function mapToProject(response: GithubResponse): Project {
    return {
        dateOfStart: response.created_at,
        deadline: null,
        description: "",
        features: [],
        githubLink: response.html_url,
        goals: [],
        isCurrent: false,
        language: "",
        projectId: 0,
        projectStatus: "WORKING_ON",
        technologies: [],
        title: response.name
    }
}