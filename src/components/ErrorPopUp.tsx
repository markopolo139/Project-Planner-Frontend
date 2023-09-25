import MyError, {isMyError} from "../objects/MyError";
import SubError from "../objects/SubError";
import Popup from "reactjs-popup";
import {useState} from "react";
import "../css/Popup.sass"
import CloseIcon from '@mui/icons-material/Close';
import {Button, Icon} from "@mui/material";

interface ErrorPopUpProps {
    error: any
}

export default function ErrorPopUp(props: ErrorPopUpProps) {
    const [open, setOpen] = useState(true);
    let error = setUpError()

    function setUpError(): MyError {
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
        <Popup open={open} closeOnDocumentClick>
            <div className="popup-header">
                <h2>Error occurred</h2>
                <CloseIcon className="popup-close" onClick={() => setOpen(false)}></CloseIcon>
            </div>
            <div className="popup-text">
                <p>Suggested Action: {error.suggestedAction}</p>
                <p>Error Message: {error.errorMessage}</p>
                <p>Http Status: {error.httpStatus}</p>
                <SubErrors subErrors={[{suggestedAction: "testAction", errorMessage: "testError"}, {suggestedAction: "testAction", errorMessage: "testError"}, {suggestedAction: "testAction", errorMessage: "testError"}]}/>
            </div>
        </Popup>
    )
}

interface SubErrorsProps {
    subErrors: Array<SubError>
}
function SubErrors(props: SubErrorsProps) {
    const isMoreErrors = props.subErrors.length > 0
    const [showErrors, setShowErrors] = useState(false)

    if (!isMoreErrors) {
        return <div></div>
    }

    return (
        <div className="popup-sub-errors">
            <div className="popup-sub-errors-header">
                <p>SubErrors:</p>
                <Button className="Button" onClick={e => setShowErrors(!showErrors)}>
                    {showErrors ? "Hide" : "Show"} errors
                </Button>
            </div>
            {showErrors && <ul>
                {props.subErrors.map(it => {
                    return <li key={it.errorMessage}>
                        <p>Error message: {it.errorMessage} </p>
                        <p>Suggested action: {it.suggestedAction}</p>
                    </li>
                })}
            </ul>}
        </div>
    )
}