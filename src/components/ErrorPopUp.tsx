import MyError, {isMyError} from "../objects/MyError";
import SubError from "../objects/SubError";
import Popup from "reactjs-popup";
import {useState} from "react";
import "../css/Popup.sass"

interface ErrorPopUpProps {
    error: any
}

export default function ErrorPopUp(props: ErrorPopUpProps) {
    const [open, setOpen] = useState(true);
    let error = setUpError()

    function setUpError(): MyError {
        console.log(props.error)

        if ("data" in props.error && isMyError(props.error.data)) {
            return props.error.data as MyError
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
        <Popup open={open} closeOnDocumentClick position={"right top"}>
            <div>
                <p>Suggested Action: {error.suggestedAction}</p>
                <p>Error Message: {error.errorMessage}</p>
                <p>Http Status: {error.httpStatus}</p>
                <SubErrors subErrors={error.subErrors}/>
                <button onClick={() => setOpen(false)}>Close</button>
            </div>
        </Popup>
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
                    return <li key={it.errorMessage}>
                        Message: {it.errorMessage}
                        Action: {it.suggestedAction}
                    </li>
                })}
            </ul>
        </div>
    )
}