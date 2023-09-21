import MyError, {isMyError} from "../objects/MyError";
import SubError from "../objects/SubError";

interface ErrorPopUpProps {
    error: any
}

export default function ErrorPopUp(props: ErrorPopUpProps) {
    let error = setUpError()

    function setUpError(): MyError {
        console.log(props.error.data)
        if (isMyError(JSON.parse(props.error.data))) {
            return JSON.parse(props.error.data)
        }
        else {
            return {
                suggestedAction: "Ask admin for solution",
                errorMessage: "Error in frontEnd occurred",
                httpStatus: props.error.status || "Can't Find Status",
                subErrors: []
            }
        }
    }

    return (
        <div>
            <p>Suggested Action: {error.suggestedAction}</p>
            <p>Error Message: {error.errorMessage}</p>
            <p>Http Status: {error.httpStatus}</p>
            <SubErrors subErrors={error.subErrors} />
        </div>
    )
}

interface SubErrorsProps {
    subErrors: Array<SubError>
}

function SubErrors(props: SubErrorsProps) {
    const isMoreErrors = props.subErrors.length > 0

    if (!isMoreErrors) {
        return <p>No sub errors</p>
    }

    return (
        <div>
            <ul>
                {props.subErrors.map(it => {
                    return <li>
                        Message: {it.errorMessage}
                        Action: {it.suggestedAction}
                    </li>
                })}
            </ul>
        </div>
    )
}