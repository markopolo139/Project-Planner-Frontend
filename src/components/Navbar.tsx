import {useAddNotificationTokenMutation} from "../api/NotificationApi";
import {getAppToken} from "../configuration/firebase";
import {Button} from "@mui/material";
import ErrorPopUp from "./ErrorPopUp";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Navbar() {
    const [
        addNotificationToken,
        { error, isError }
    ] = useAddNotificationTokenMutation()
    //TODO: user dialog (where logout, username is)
    return (
        <div>
            { isError && <ErrorPopUp error={error} /> }
            <Button className="Button" variant="outlined" onClick= {(e) => {
                getAppToken(addNotificationToken)
            }}>Set Notifications</Button>
        </div>
    )
}