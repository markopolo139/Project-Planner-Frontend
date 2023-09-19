import ProjectStatus from "./ProjectStatus";

export default class Project {
    private _projectId: number
    private _githubLink: string
    private _title: string
    private _description: string
    private _language: string
    private _deadline: Date
    private _dateOfStart: Date
    private _isCurrent: boolean
    private _projectStatus: ProjectStatus
    private _features: Array<string>
    private _goals: Array<string>
    private _technologies: Array<string>

    constructor(
        projectId: number, githubLink: string, title: string, description: string, language: string,
        deadline: Date, dateOfStart: Date, isCurrent: boolean, projectStatus: ProjectStatus, features: Array<string>,
        goals: Array<string>, technologies: Array<string>
    ) {
        this._projectId = projectId;
        this._githubLink = githubLink;
        this._title = title;
        this._description = description;
        this._language = language;
        this._deadline = deadline;
        this._dateOfStart = dateOfStart;
        this._isCurrent = isCurrent;
        this._projectStatus = projectStatus;
        this._features = features;
        this._goals = goals;
        this._technologies = technologies;
    }

    get projectId(): number {
        return this._projectId;
    }

    set projectId(value: number) {
        this._projectId = value;
    }

    get githubLink(): string {
        return this._githubLink;
    }

    set githubLink(value: string) {
        this._githubLink = value;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get language(): string {
        return this._language;
    }

    set language(value: string) {
        this._language = value;
    }

    get deadline(): Date {
        return this._deadline;
    }

    set deadline(value: Date) {
        this._deadline = value;
    }

    get dateOfStart(): Date {
        return this._dateOfStart;
    }

    set dateOfStart(value: Date) {
        this._dateOfStart = value;
    }

    get isCurrent(): boolean {
        return this._isCurrent;
    }

    set isCurrent(value: boolean) {
        this._isCurrent = value;
    }

    get projectStatus(): ProjectStatus {
        return this._projectStatus;
    }

    set projectStatus(value: ProjectStatus) {
        this._projectStatus = value;
    }

    get features(): Array<string> {
        return this._features;
    }

    set features(value: Array<string>) {
        this._features = value;
    }

    get goals(): Array<string> {
        return this._goals;
    }

    set goals(value: Array<string>) {
        this._goals = value;
    }

    get technologies(): Array<string> {
        return this._technologies;
    }

    set technologies(value: Array<string>) {
        this._technologies = value;
    }
}