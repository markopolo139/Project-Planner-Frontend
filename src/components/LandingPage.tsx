import {getAppToken} from "../configuration/firebase";
import {useAddNotificationTokenMutation} from "../api/NotificationApi";
import ErrorPopUp from "./ErrorPopUp";
import {Button} from "@mui/material";
import {useState} from "react";

export default function LandingPage() {
    const [
        addNotificationToken,
        { error, isError, isSuccess }
    ] = useAddNotificationTokenMutation()

    const [isTokenSet, setTokenCheck] = useState(false)

    return (
        <div>
            { isError && <ErrorPopUp error={error} /> }
            { isSuccess && <h2>Token sent</h2> }
            { isTokenSet || <Button variant="outlined" onClick= {(e) => {
                getAppToken(addNotificationToken, setTokenCheck).catch()
            }}>Set Notifications</Button> }
        </div>
    )
}