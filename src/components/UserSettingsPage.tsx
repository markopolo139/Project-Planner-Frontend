import {Link, Outlet} from "react-router-dom";
import {useState} from "react";
import {Button} from "@mui/material";
import Popup from "reactjs-popup";
import CloseIcon from '@mui/icons-material/Close';
import {useDispatch} from "react-redux";
import {logout} from "../slices/LoggedInUserSlice";
import {useDeleteUserMutation} from "../api/UserApi";
import ErrorPopUp from "./ErrorPopUp";
import styles from "../css/UserSettings.module.sass"

export default function UserSettingsPage() {
    const [deleteUser] = useDeleteUserMutation()
    const [isDelete, setDelete] = useState(false)
    const [open, setOpen] = useState(false);
    const [error, setError] = useState<any>(null);
    const dispatch = useDispatch()

    function handleDeleteConfirmClick(_: any) {
        setDelete(false)
        setOpen(false)
        deleteUser().unwrap().then( fulfilled => dispatch(logout())).catch(rejected => setError(rejected))
    }
    //TODO: group components, css into more folders
    return (
        <div className={styles.mainDiv}>
            { error && <ErrorPopUp error={error} /> }
            <div className={styles.navbar}>
                <h2>Settings</h2>
                <Link onClick={(e) => {
                    setDelete(false)
                }} to={"username"}>Change Username</Link>
                <Link onClick={(e) => {
                    setDelete(false)
                }} to={"password"}>Change Password</Link>
                <Link onClick={(e) => {
                    setDelete(false)
                }} to={"email"}>Change Email</Link>
                <span onClick={(e) => {
                    setDelete(true)
                }}>Delete Username</span>
            </div>
            <div className={styles.content}>
                { isDelete || <Outlet />}
                { isDelete && <Button className="DeleteButton" onClick={(e) => {
                    setOpen(true)
                }}>Delete User</Button>}
                <Popup open={open} closeOnDocumentClick={false} contentStyle={{ width: '17%' }}>
                    <div className={styles.delete_header_popup}>
                        <div>
                            <h2>Are you sure</h2>
                            <h3>All data will be lost</h3>
                            <Button className={styles.confirmButton} onClick={handleDeleteConfirmClick}>Confirm</Button>
                        </div>
                        <CloseIcon className="popup-close" onClick={() => setOpen(false)}></CloseIcon>
                    </div>
                </Popup>
            </div>
        </div>
    )
}