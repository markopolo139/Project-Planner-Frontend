import {getAppToken} from "../configuration/firebase";
import {useAddNotificationTokenMutation} from "../api/NotificationApi";
import ErrorPopUp from "./ErrorPopUp";
import {Button} from "@mui/material";
import {useState} from "react";
import {useSelector} from "react-redux";
import {selectLoggedInUserData} from "../slices/LoggedInUserSlice";

export default function LandingPage() {
    const loggedInUser = useSelector(selectLoggedInUserData)

    //TODO: move button to user dialog (where logout, username is)
    //TODO: add most recently project to show here or current project or with close deadline
    return (
        <div>
            <h2>{loggedInUser.jwtToken}</h2>
            <h2>{loggedInUser.username}</h2>
        </div>
    )
}