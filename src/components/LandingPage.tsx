import {getAppToken} from "../configuration/firebase";
import {useAddNotificationTokenMutation} from "../api/NotificationApi";
import ErrorPopUp from "./ErrorPopUp";
import {Button} from "@mui/material";
import {useState} from "react";
import {useSelector} from "react-redux";
import {selectLoggedInUserData} from "../slices/LoggedInUserSlice";

export default function LandingPage() {
    const [
        addNotificationToken,
        { error, isError }
    ] = useAddNotificationTokenMutation()

    const [tokenMessage, setTokenMessage] = useState("")
    const loggedInUser = useSelector(selectLoggedInUserData)

    //TODO: move button to user dialog (where logout, username is)
    return (
        <div>
            { isError && <ErrorPopUp error={error} /> }
            <Button className="Button" variant="outlined" onClick= {(e) => {
                getAppToken(addNotificationToken, setTokenMessage)
            }}>Set Notifications</Button>
            <h2>{tokenMessage}</h2>
            <h2>{loggedInUser.jwtToken}</h2>
            <h2>{loggedInUser.username}</h2>
        </div>
    )
}