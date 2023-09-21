export default interface ProjectPlanTransformModel {
    planId: number
    githubLink: string
    description: string
    deadline: Date
    startDate: Date
    technologies: Array<string>
}