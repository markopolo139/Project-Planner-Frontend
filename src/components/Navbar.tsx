import {useAddNotificationTokenMutation} from "../api/NotificationApi";
import {getAppToken} from "../configuration/firebase";
import {Button} from "@mui/material";
import ErrorPopUp from "./ErrorPopUp";

export default function ProjectsPage() {
    const [
        addNotificationToken,
        { error, isError }
    ] = useAddNotificationTokenMutation()


    return (
        <div>
            { isError && <ErrorPopUp error={error} /> }
            <Button className="Button" variant="outlined" onClick= {(e) => {
                getAppToken(addNotificationToken)
            }}>Set Notifications</Button>
        </div>
    )
}