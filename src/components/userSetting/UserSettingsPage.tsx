import {Link, Outlet} from "react-router-dom";
import {useState} from "react";
import {Button} from "@mui/material";
import Popup from "reactjs-popup";
import CloseIcon from '@mui/icons-material/Close';
import {useDispatch} from "react-redux";
import {logout} from "../../slices/LoggedInUserSlice";
import {useDeleteUserMutation} from "../../api/UserApi";
import ErrorPopup from "../error/ErrorPopup";
import styles from "../../css/userSettings/UserSettings.module.sass"
import {buttonCss} from "../../utils/MuiButtonCss";

export default function UserSettingsPage() {
    const [deleteUser] = useDeleteUserMutation()
    const [isDelete, setDelete] = useState(false)
    const [open, setOpen] = useState(false);
    const [error, setError] = useState<any>(null);
    const [active, setActive] = useState(0);
    const dispatch = useDispatch()

    function handleDeleteConfirmClick(_: any) {
        setDelete(false)
        setOpen(false)
        deleteUser().unwrap().then( fulfilled => dispatch(logout())).catch(rejected => setError(rejected))
    }

    return (
        <div className={styles.mainDiv}>
            { error && <ErrorPopup error={error} /> }
            <div className={styles.navbar}>
                <h2>Settings</h2>
                <Link className={active === 1 ? styles.active : ''} onClick={(e) => {
                    setDelete(false)
                    setActive(1)
                }} to={"username"}>Change Username</Link>
                <Link className={active === 2 ? styles.active : ''} onClick={(e) => {
                    setDelete(false)
                    setActive(2)
                }} to={"password"}>Change Password</Link>
                <Link className={active === 3 ? styles.active : ''} onClick={(e) => {
                    setDelete(false)
                    setActive(3)
                }} to={"email"}>Change Email</Link>
                <span className={active === 4 ? styles.active : ''} onClick={(e) => {
                    setDelete(true)
                    setActive(4)
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
                            <Button className={styles.confirmButton} sx={buttonCss} onClick={handleDeleteConfirmClick}>Confirm</Button>
                        </div>
                        <CloseIcon className={styles.popup_close} onClick={() => setOpen(false)}></CloseIcon>
                    </div>
                </Popup>
            </div>
        </div>
    )
}