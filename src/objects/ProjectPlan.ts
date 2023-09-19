export default class ProjectPlan {
    private _projectPlanId: number
    private _title: string
    private _language: string
    private _features: Array<string>
    private _goals: Array<string>
    private _points: Array<string>

    constructor(
        projectPlanId: number, title: string, language: string, features: Array<string>, goals: Array<string>, points: Array<string>
    ) {
        this._projectPlanId = projectPlanId;
        this._title = title;
        this._language = language;
        this._features = features;
        this._goals = goals;
        this._points = points;
    }

    get projectPlanId(): number {
        return this._projectPlanId;
    }

    set projectPlanId(value: number) {
        this._projectPlanId = value;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get language(): string {
        return this._language;
    }

    set language(value: string) {
        this._language = value;
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

    get points(): Array<string> {
        return this._points;
    }

    set points(value: Array<string>) {
        this._points = value;
    }
}