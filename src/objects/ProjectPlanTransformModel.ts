export default class ProjectPlanTransformModel {
    private readonly _planId: number
    private readonly _githubLink: string
    private readonly _description: string
    private readonly _deadline: Date
    private readonly _startDate: Date
    private readonly _technologies: Array<string>

    constructor(
        planId: number, githubLink: string, description: string, deadline: Date, startDate: Date,
        technologies: Array<string>)
    {
        this._planId = planId;
        this._githubLink = githubLink;
        this._description = description;
        this._deadline = deadline;
        this._startDate = startDate;
        this._technologies = technologies;
    }

    get planId(): number {
        return this._planId;
    }

    get githubLink(): string {
        return this._githubLink;
    }

    get description(): string {
        return this._description;
    }

    get deadline(): Date {
        return this._deadline;
    }

    get startDate(): Date {
        return this._startDate;
    }

    get technologies(): Array<string> {
        return this._technologies;
    }
}