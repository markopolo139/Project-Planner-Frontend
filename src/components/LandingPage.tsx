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

    const [tokenMessage, setTokenMessage] = useState("")

    //TODO: add sass to login, errorPopUp, password recovery, error page and create user
    return (
        <div>
            { isError && <ErrorPopUp error={error} /> }
            <Button variant="outlined" onClick= {(e) => {
                getAppToken(addNotificationToken, setTokenMessage)
            }}>Set Notifications</Button>
            <h2>{tokenMessage}</h2>

        </div>
    )
}