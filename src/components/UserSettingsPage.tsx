import {Link, Outlet} from "react-router-dom";
import {useState} from "react";
import {Button} from "@mui/material";
import Popup from "reactjs-popup";
import CloseIcon from '@mui/icons-material/Close';
import {useDispatch} from "react-redux";
import {logout} from "../slices/LoggedInUserSlice";
import {useDeleteUserMutation} from "../api/UserApi";
import MyError from "../objects/MyError";
import ErrorPopUp from "./ErrorPopUp";

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

    return (
        <div>
            { error && <ErrorPopUp error={error} /> }
            <div>
                <Link onClick={(e) => {
                    setDelete(false)
                }} to={"username"}>Change Username</Link>
                <Link onClick={(e) => {
                    setDelete(false)
                }} to={"password"}>Change Password</Link>
                <Link onClick={(e) => {
                    setDelete(false)
                }} to={"email"}>Change Email</Link>
                <p onClick={(e) => {
                    setDelete(true)
                }}>Delete Username</p>
            </div>
            <div>
                { isDelete || <Outlet />}
                { isDelete && <Button onClick={(e) => {
                    setOpen(true)
                }}>Delete User</Button>}
                <Popup open={open}>
                    <div>
                        <h2>Are you sure</h2>
                        <h3>All data will be lost</h3>
                        <CloseIcon className="popup-close" onClick={() => setOpen(false)}></CloseIcon>
                    </div>
                    <div>
                        <Button onClick={handleDeleteConfirmClick}>Confirm</Button>
                    </div>
                </Popup>
            </div>
        </div>
    )
}