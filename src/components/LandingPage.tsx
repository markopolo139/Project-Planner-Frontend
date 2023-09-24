import {getAppToken} from "../configuration/firebase";
import {useAddNotificationTokenMutation} from "../api/NotificationApi";
import ErrorPopUp from "./ErrorPopUp";
import {Button} from "@mui/material";
import {useState} from "react";

export default function LandingPage() {
    const [
        addNotificationToken,
        { error, isError }
    ] = useAddNotificationTokenMutation()

    const [isTokenSet, setTokenCheck] = useState(false)
    const [tokenMessage, setTokenMessage] = useState("")

    //TODO: add sass to login, errorPopUp, password recovery, error page and create user
    return (
        <div>
            { isError && <ErrorPopUp error={error} /> }
            { isTokenSet || <Button variant="outlined" onClick= {(e) => {
                getAppToken(addNotificationToken, setTokenMessage).then( () =>
                    setTokenCheck(true)
                )
            }}>Set Notifications</Button> }
            { isTokenSet && <h2>{tokenMessage}</h2> }

        </div>
    )
}