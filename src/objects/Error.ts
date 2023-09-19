import SubError from "./SubError";

export default class Error {
    private readonly _suggestedAction: string
    private readonly _errorMessage: string
    private readonly _subErrors: Array<SubError>
    private readonly _httpStatus: string

    constructor(suggestedAction: string, errorMessage: string, subErrors: Array<SubError>, httpStatus: string) {
        this._suggestedAction = suggestedAction;
        this._errorMessage = errorMessage;
        this._subErrors = subErrors;
        this._httpStatus = httpStatus;
    }

    get suggestedAction(): string {
        return this._suggestedAction;
    }

    get errorMessage(): string {
        return this._errorMessage;
    }

    get subErrors(): Array<SubError> {
        return this._subErrors;
    }

    get httpStatus(): string {
        return this._httpStatus;
    }
}