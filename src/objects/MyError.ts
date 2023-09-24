import SubError from "./SubError";
import {types} from "sass";
import Error = types.Error;
import {Simulate} from "react-dom/test-utils";

export default interface MyError {
    suggestedAction: string
    errorMessage: string
    subErrors: Array<SubError>
    httpStatus: string
}

export class MyErrorClass extends Error implements MyError {
    suggestedAction: string
    errorMessage: string
    subErrors: Array<SubError>
    httpStatus: string

    constructor(suggestedAction: string, errorMessage: string, subErrors: Array<SubError>, httpStatus: string) {
        super(errorMessage);
        this.suggestedAction = suggestedAction;
        this.errorMessage = errorMessage;
        this.subErrors = subErrors;
        this.httpStatus = httpStatus;
    }
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