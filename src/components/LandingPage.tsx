import {useSelector} from "react-redux";
import {selectLoggedInUserData} from "../slices/LoggedInUserSlice";
import styles from "../css/LandingPage.module.sass";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function LandingPage() {
    const loggedInUser = useSelector(selectLoggedInUserData)
    //TODO: add most recently project to show here or current project or with close deadline
    return (
        <div>
            <header className={styles.header}>Project Overview</header>
            <Navbar />
            <Outlet />
        </div>
    )
}