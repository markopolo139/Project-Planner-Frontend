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
import styles from "../css/Navbar.module.sass"

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
        event.currentTarget.classList.add(styles.menuClicked)
    }

    function handleMenuClose() {
        anchorEl?.classList?.remove(styles.menuClicked)
        setAnchorEl(null)
    }

    return (
        <div className={styles.mainDiv}>
            { isError && <ErrorPopUp error={error} /> }
            <h2>Project Overview</h2>
            <Link to={"projects"}>Projects</Link>
            <Link to={"project/plans"}>Project Plans</Link>
            <div className={styles.menuDiv} onClick={handleMenuClick}>
                <p>{username}</p>
                <AccountCircleIcon />
            </div>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                onClick={handleMenuClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }
                }}
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
                    <ListItemIcon><Logout /></ListItemIcon> Logout
                </MenuItem>
            </Menu>
        </div>
    )
}