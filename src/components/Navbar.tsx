import {useAddNotificationTokenMutation} from "../api/NotificationApi";
import {getAppToken} from "../configuration/firebase";
import {Button, ListItemIcon, Menu, MenuItem} from "@mui/material";
import ErrorPopUp from "./ErrorPopUp";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {Link, useNavigate} from "react-router-dom";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {logout, selectLoggedInUserData, selectUsername} from "../slices/LoggedInUserSlice";

export default function Navbar() {
    const [
        addNotificationToken,
        { error, isError }
    ] = useAddNotificationTokenMutation()

    const username = useSelector(selectUsername)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    function handleMenuClick(event: React.MouseEvent<HTMLElement>) {
        setAnchorEl(event.currentTarget)
    }

    function handleMenuClose() {
        setAnchorEl(null)
    }

    return (
        <div>
            { isError && <ErrorPopUp error={error} /> }
            <h2>Project Overview</h2>
            <Link to={"projects"}>Projects</Link>
            <Link to={"project/plans"}>Project Plans</Link>
            <div onClick={handleMenuClick}>
                <p>{username}</p>
                <AccountCircleIcon />
            </div>
            <Menu
                open={open}
                onClose={handleMenuClose}
                onClick={handleMenuClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick= {(e) => {
                    getAppToken(addNotificationToken)
                    handleMenuClose()
                }}>
                    <ListItemIcon><NotificationsIcon /></ListItemIcon> Set Notifications
                </MenuItem>
                <MenuItem onClick={(e) => {
                    navigate("user/settings")
                }}>
                    <ListItemIcon><Settings /></ListItemIcon> User Settings
                </MenuItem>
                <MenuItem onClick={(e) => {
                    dispatch(logout())
                    navigate("/")
                }}>
                    <ListItemIcon><Logout /></ListItemIcon> LogOut
                </MenuItem>
            </Menu>
        </div>
    )
}