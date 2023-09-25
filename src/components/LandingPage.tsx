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

    return (
        <div>
            { isError && <ErrorPopUp error={error} /> }
            <Button className="Button" variant="outlined" onClick= {(e) => {
                getAppToken(addNotificationToken, setTokenMessage)
            }}>Set Notifications</Button>
            <h2>{tokenMessage}</h2>

        </div>
    )
}