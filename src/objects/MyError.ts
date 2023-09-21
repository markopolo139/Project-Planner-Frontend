import SubError from "./SubError";

export default interface MyError {
    suggestedAction: string
    errorMessage: string
    subErrors: Array<SubError>
    httpStatus: string
}

export function isMyError(error: any): error is MyError {
    return (
        error != null &&
        "suggestedAction" in error &&
        "errorMessage" in error &&
        "httpStatus" in error &&
        "subErrors" in error
    )
}