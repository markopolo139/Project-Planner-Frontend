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

    return (
        <div>
            { isError && <ErrorPopUp error={error} /> }
            { isTokenSet || <Button variant="outlined" onClick= {(e) => {
                getAppToken(addNotificationToken, setTokenCheck, setTokenMessage).catch()
            }}>Set Notifications</Button> }
            { isTokenSet && <h2>{tokenMessage}</h2> }
        </div>
    )
}