import SubError from "./SubError";

export default interface MyError {
    suggestedAction: string
    errorMessage: string
    subErrors: Array<SubError>
    httpStatus: string
}

//Funtcion isMyError (my error is in error.data)