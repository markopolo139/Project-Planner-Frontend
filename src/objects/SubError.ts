export default class SubError {
    private readonly _suggestedAction: string
    private readonly _errorMessage: string

    constructor(suggestedAction: string, errorMessage: string) {
        this._suggestedAction = suggestedAction;
        this._errorMessage = errorMessage;
    }

    get suggestedAction(): string {
        return this._suggestedAction;
    }

    get errorMessage(): string {
        return this._errorMessage;
    }
}